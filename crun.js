/* crun.js — 纯前端 C 语言子集解释器（离线，无外部依赖）
 * 支持：int/float/double/char 变量与数组、算数/关系/逻辑/位运算、
 *       if/else、while/for/do-while、break/continue、函数(含递归)、
 *       printf(%d %f %c %s %%)、scanf(%d %f %c %s)、#define 常量。
 * 暂不支持：指针、结构体、文件。页面会明确标注。
 * 暴露：window.CRun.run(src, input) -> {output, error}
 */
(function (global) {
  "use strict";

  // ---------------- 词法分析 ----------------
  function tokenize(src) {
    var tokens = [];
    var i = 0, n = src.length;
    var isDigit = function (c) { return c >= '0' && c <= '9'; };
    var isAlpha = function (c) { return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || c === '_'; };
    while (i < n) {
      var c = src[i];
      if (c === ' ' || c === '\t' || c === '\n' || c === '\r') { i++; continue; }
      // 注释
      if (c === '/' && src[i + 1] === '/') { while (i < n && src[i] !== '\n') i++; continue; }
      if (c === '/' && src[i + 1] === '*') { i += 2; while (i < n && !(src[i] === '*' && src[i + 1] === '/')) i++; i += 2; continue; }
      // 字符串
      if (c === '"') {
        i++; var s = '';
        while (i < n && src[i] !== '"') {
          if (src[i] === '\\') { var nx = src[i + 1]; i += 2;
            s += nx === 'n' ? '\n' : nx === 't' ? '\t' : nx === 'r' ? '\r' : nx === '\\' ? '\\' : nx === '"' ? '"' : nx === '0' ? '\0' : nx; }
          else { s += src[i]; i++; }
        }
        i++; tokens.push({ t: 'str', v: s }); continue;
      }
      // 字符
      if (c === "'") {
        i++; var ch = src[i];
        if (ch === '\\') { var cx = src[i + 1]; i += 2;
          ch = cx === 'n' ? '\n' : cx === 't' ? '\t' : cx === '0' ? '\0' : cx; }
        else i++;
        if (src[i] === "'") i++;
        tokens.push({ t: 'char', v: ch.charCodeAt(0) }); continue;
      }
      // 数字
      if (isDigit(c) || (c === '.' && isDigit(src[i + 1]))) {
        var num = ''; var isFloat = false;
        while (i < n && (isDigit(src[i]) || src[i] === '.')) { if (src[i] === '.') isFloat = true; num += src[i]; i++; }
        // 指数
        if (src[i] === 'e' || src[i] === 'E') { isFloat = true; num += src[i]; i++; if (src[i] === '+' || src[i] === '-') { num += src[i]; i++; } while (i < n && isDigit(src[i])) { num += src[i]; i++; } }
        tokens.push({ t: 'num', v: parseFloat(num), f: isFloat || num.indexOf('.') >= 0 || num.indexOf('e') >= 0 }); continue;
      }
      // 标识符
      if (isAlpha(c)) {
        var id = ''; while (i < n && (isAlpha(src[i]) || isDigit(src[i]))) { id += src[i]; i++; }
        tokens.push({ t: 'id', v: id }); continue;
      }
      // 多字符运算符（先判3字符，再2字符）
      var three = src.substr(i, 3);
      if (['<<=', '>>='].indexOf(three) >= 0) { tokens.push({ t: 'op', v: three }); i += 3; continue; }
      var two = src.substr(i, 2);
      if (['==', '!=', '<=', '>=', '&&', '||', '<<', '>>', '++', '--', '->', '+=', '-=', '*=', '/=', '%=', '&=', '|=', '^='].indexOf(two) >= 0) {
        tokens.push({ t: 'op', v: two }); i += 2; continue;
      }
      // 单字符
      if ('+-*/%<>=!&|^~?:;,.(){}[]'.indexOf(c) >= 0) { tokens.push({ t: 'op', v: c }); i++; continue; }
      // 预处理指令 #
      if (c === '#') { var line = ''; while (i < n && src[i] !== '\n') { line += src[i]; i++; } tokens.push({ t: 'pp', v: line.trim() }); continue; }
      i++; // 跳过未知字符
    }
    tokens.push({ t: 'eof', v: '' });
    return tokens;
  }

  // ---------------- 语法分析 ----------------
  function Parser(tokens) {
    this.toks = tokens; this.pos = 0;
  }
  Parser.prototype.peek = function () { return this.toks[this.pos]; };
  Parser.prototype.next = function () { return this.toks[this.pos++]; };
  Parser.prototype.expect = function (v) {
    var t = this.next();
    if (t.v !== v) throw new Error('语法错误：期望「' + v + '」但遇到「' + t.v + '」');
    return t;
  };
  Parser.prototype.isType = function () {
    var v = this.peek().v;
    return v === 'int' || v === 'float' || v === 'double' || v === 'char' || v === 'void' || v === 'unsigned';
  };

  // 解析类型说明符，返回 {base, unsigned}
  Parser.prototype.parseType = function () {
    var unsigned = false;
    if (this.peek().v === 'unsigned') { unsigned = true; this.next(); }
    var base = this.next().v;
    if (base !== 'int' && base !== 'float' && base !== 'double' && base !== 'char' && base !== 'void')
      throw new Error('不支持的类型：' + base);
    return { base: base, unsigned: unsigned };
  };

  // 外部声明：函数定义 或 全局变量
  Parser.prototype.parseProgram = function () {
    var decls = [];
    while (this.peek().t !== 'eof') {
      if (this.isType()) {
        var tp = this.parseType();
        // 可能 unsigned int 合并；也可能 unsigned 单独
        var name = this.peek().v;
        // 看是否为函数：ident ( ...
        var save = this.pos;
        this.next(); // ident
        if (this.peek().v === '(') {
          // 函数定义
          var params = this.parseParams();
          this.expect('{');
          var body = this.parseCompound(true);
          decls.push({ kind: 'func', ret: tp, name: name, params: params, body: body });
        } else {
          // 全局变量声明
          this.pos = save; // 回退 ident
          var gvars = this.parseDeclaratorList(tp, true);
          this.expect(';');
          decls.push({ kind: 'gvar', vars: gvars });
        }
      } else if (this.peek().t === 'id' && this.toks[this.pos + 1] && this.toks[this.pos + 1].v === '(') {
        // 隐式 int 函数（如 K&R 风格 main()）
        var impName = this.next().v;
        var impParams = this.parseParams();
        this.expect('{');
        var impBody = this.parseCompound(true);
        decls.push({ kind: 'func', ret: { base: 'int', unsigned: false }, name: impName, params: impParams, body: impBody });
      } else if (this.peek().t === 'pp') {
        // #define 等预处理
        var pp = this.next().v;
        this.handlePP(pp);
      } else {
        throw new Error('无法解析的顶层语句：' + this.peek().v);
      }
    }
    return decls;
  };

  Parser.prototype.ppDefines = {};
  Parser.prototype.handlePP = function (line) {
    // #define NAME value   （仅对象式宏，简单文本替换由 tokenizer 无法做，这里在运行前做字符串替换）
    var m = /^#\s*define\s+([A-Za-z_]\w*)\s+(.+)$/.exec(line);
    if (m) this.ppDefines[m[1]] = m[2];
  };

  Parser.prototype.parseParams = function () {
    this.expect('(');
    var params = [];
    if (this.peek().v === ')') { this.next(); return params; }
    while (true) {
      var tp = this.parseType();
      var nm = this.next().v;
      // 数组形参 int a[]
      var arr = false;
      if (this.peek().v === '[') { arr = true; while (this.peek().v !== ']') this.next(); this.next(); }
      params.push({ type: tp, name: nm, arr: arr });
      if (this.peek().v === ',') { this.next(); continue; }
      break;
    }
    this.expect(')');
    return params;
  };

  // 声明符列表：int a=1, b[3]={...}, c;
  Parser.prototype.parseDeclaratorList = function (tp, isGlobal) {
    var list = [];
    while (true) {
      var name = this.next().v;
      var arrDims = [];
      while (this.peek().v === '[') {
        this.next();
        var dim = this.peek().v === ']' ? null : parseInt(this.next().v, 10);
        if (this.peek().v === ']') this.next();
        arrDims.push(dim);
      }
      var init = null;
      if (this.peek().v === '=') {
        this.next();
        init = this.parseInit();
      }
      list.push({ type: tp, name: name, dims: arrDims, init: init });
      if (this.peek().v === ',') { this.next(); continue; }
      break;
    }
    return list;
  };

  Parser.prototype.parseInit = function () {
    // 支持 {..} 或 表达式
    if (this.peek().v === '{') {
      this.next(); var arr = [];
      while (this.peek().v !== '}') {
        if (this.peek().v === '{') { this.next(); var inner = []; while (this.peek().v !== '}') { inner.push(this.parseAssign()); if (this.peek().v === ',') this.next(); } this.next(); arr.push(inner); if (this.peek().v === ',') this.next(); }
        else { arr.push(this.parseAssign()); if (this.peek().v === ',') this.next(); }
      }
      this.next(); return arr;
    }
    return this.parseAssign();
  };

  // 复合语句
  Parser.prototype.parseCompound = function (isFuncBody) {
    var stmts = [];
    while (this.peek().v !== '}' && this.peek().t !== 'eof') {
      stmts.push(this.parseStatement());
    }
    this.expect('}');
    return stmts;
  };

  Parser.prototype.parseStatement = function () {
    var p = this.peek();
    if (p.t === 'pp') { var pp = this.next().v; this.handlePP(pp); return { kind: 'pp' }; }
    if (this.isType()) {
      var tp = this.parseType();
      var list = this.parseDeclaratorList(tp, false);
      this.expect(';');
      return { kind: 'decl', vars: list };
    }
    if (p.v === 'if') { this.next(); this.expect('('); var cond = this.parseExpr(); this.expect(')'); var thenS = this.parseStatement(); var elseS = null; if (this.peek().v === 'else') { this.next(); elseS = this.parseStatement(); } return { kind: 'if', cond: cond, then: thenS, else: elseS }; }
    if (p.v === 'while') { this.next(); this.expect('('); var c = this.parseExpr(); this.expect(')'); var w = this.parseStatement(); return { kind: 'while', cond: c, body: w }; }
    if (p.v === 'do') { this.next(); var db = this.parseStatement(); this.expect('while'); this.expect('('); var dc = this.parseExpr(); this.expect(')'); this.expect(';'); return { kind: 'dowhile', body: db, cond: dc }; }
    if (p.v === 'for') {
      this.next(); this.expect('(');
      var init = null, test = null, inc = null;
      if (this.peek().v !== ';') { if (this.isType()) { var ftp = this.parseType(); init = { kind: 'decl', vars: this.parseDeclaratorList(ftp, false) }; } else init = this.parseExpr(); }
      this.expect(';');
      if (this.peek().v !== ';') test = this.parseExpr();
      this.expect(';');
      if (this.peek().v !== ')') inc = this.parseExpr();
      this.expect(')');
      var fb = this.parseStatement();
      return { kind: 'for', init: init, test: test, inc: inc, body: fb };
    }
    if (p.v === 'return') { this.next(); var rv = null; if (this.peek().v !== ';') rv = this.parseExpr(); this.expect(';'); return { kind: 'return', val: rv }; }
    if (p.v === 'break') { this.next(); this.expect(';'); return { kind: 'break' }; }
    if (p.v === 'continue') { this.next(); this.expect(';'); return { kind: 'continue' }; }
    if (p.v === '{') { this.next(); var cs = this.parseCompound(false); return { kind: 'block', stmts: cs }; }
    if (p.v === ';') { this.next(); return { kind: 'empty' }; }
    // 表达式语句
    var e = this.parseExpr();
    this.expect(';');
    return { kind: 'expr', expr: e };
  };

  // 表达式（赋值，右结合）
  Parser.prototype.parseExpr = function () { return this.parseAssign(); };
  Parser.prototype.parseAssign = function () {
    var left = this.parseTernary();
    if (this.peek().v === '=' || ['+=', '-=', '*=', '/=', '%=', '&=', '|=', '^=', '<<=', '>>='].indexOf(this.peek().v) >= 0) {
      var op = this.next().v;
      var right = this.parseAssign();
      return { kind: 'assign', op: op, left: left, right: right };
    }
    return left;
  };
  Parser.prototype.parseTernary = function () {
    var cond = this.parseLogicOr();
    if (this.peek().v === '?') {
      this.next(); var t = this.parseExpr(); this.expect(':'); var f = this.parseTernary();
      return { kind: 'ternary', cond: cond, t: t, f: f };
    }
    return cond;
  };
  var binOps = [
    ['||'], ['&&'], ['|'], ['^'], ['&'],
    ['==', '!='], ['<', '<=', '>', '>='], ['<<', '>>'],
    ['+', '-'], ['*', '/', '%']
  ];
  Parser.prototype.parseLogicOr = function () { return this.buildBin(0); };
  Parser.prototype.buildBin = function (level) {
    var self = this;
    if (level >= binOps.length) return this.parseUnary();
    var left = this.buildBin(level + 1);
    while (binOps[level].indexOf(this.peek().v) >= 0) {
      var op = this.next().v;
      var right = this.buildBin(level + 1);
      left = { kind: 'binary', op: op, left: left, right: right };
    }
    return left;
  };
  Parser.prototype.parseUnary = function () {
    var v = this.peek().v;
    if (v === '!' || v === '~' || v === '-' || v === '+' || v === '&') {
      this.next(); return { kind: 'unary', op: v, e: this.parseUnary() };
    }
    if (v === '++' || v === '--') {
      this.next(); return { kind: 'unary', op: v, e: this.parseUnary(), prefix: true };
    }
    return this.parsePostfix();
  };
  Parser.prototype.parsePostfix = function () {
    var e = this.parsePrimary();
    while (true) {
      var v = this.peek().v;
      if (v === '[') {
        this.next(); var idx = this.parseExpr(); this.expect(']');
        e = { kind: 'index', e: e, idx: idx };
      } else if (v === '(') {
        this.next(); var args = [];
        if (this.peek().v !== ')') { while (true) { args.push(this.parseAssign()); if (this.peek().v === ',') { this.next(); continue; } break; } }
        this.expect(')');
        e = { kind: 'call', e: e, args: args };
      } else if (v === '.' || v === '->') {
        this.next(); var mem = this.next().v; e = { kind: 'member', e: e, name: mem };
      } else if (v === '++' || v === '--') {
        this.next(); e = { kind: 'unary', op: v, e: e, prefix: false };
      } else break;
    }
    return e;
  };
  Parser.prototype.parsePrimary = function () {
    var t = this.peek();
    if (t.t === 'num') { this.next(); return { kind: 'num', v: t.v, f: t.f }; }
    if (t.t === 'str') { this.next(); return { kind: 'str', v: t.v }; }
    if (t.t === 'char') { this.next(); return { kind: 'num', v: t.v, f: false }; }
    if (t.t === 'id') {
      this.next();
      // 宏替换（对象式 #define）
      if (this.ppDefines && this.ppDefines[t.v] !== undefined) {
        var dv = this.ppDefines[t.v];
        if (/^-?\d+(\.\d+)?$/.test(dv)) return { kind: 'num', v: parseFloat(dv), f: dv.indexOf('.') >= 0 };
        return { kind: 'id', v: dv };
      }
      return { kind: 'id', v: t.v };
    }
    if (t.v === '(') { this.next(); var e = this.parseExpr(); this.expect(')'); return e; }
    throw new Error('无法解析的表达式：' + t.v);
  };

  // ---------------- 求值 ----------------
  function CRunError(msg) { this.msg = msg; }
  function ReturnSignal(v) { this.v = v; }
  function BreakSignal() {}
  function ContinueSignal() {}

  function Interp(src, input) {
    this.defs = {};        // 函数定义
    this.globals = new Scope(null);
    this.inputTokens = (input || '').toString().replace(/\r/g, '').split(/\s+/).filter(function (x) { return x.length; });
    this.inputPos = 0;
    this.output = '';
    this.ppDefines = {};
    this.funcOrder = [];
  }
  function Scope(parent) { this.vars = {}; this.types = {}; this.parent = parent; }
  Scope.prototype.get = function (n) { var s = this; while (s) { if (s.vars.hasOwnProperty(n)) return s.vars[n]; s = s.parent; } return undefined; };
  Scope.prototype.getType = function (n) { var s = this; while (s) { if (s.types.hasOwnProperty(n)) return s.types[n]; s = s.parent; } return undefined; };
  Scope.prototype.set = function (n, v) { var s = this; while (s) { if (s.vars.hasOwnProperty(n)) { s.vars[n] = v; return; } s = s.parent; } this.vars[n] = v; };
  Scope.prototype.setType = function (n, t) { var s = this; while (s) { if (s.types.hasOwnProperty(n)) { s.types[n] = t; return; } s = s.parent; } this.types[n] = t; };
  Scope.prototype.declare = function (n, v) { this.vars[n] = v; };

  Interp.prototype.builtin = function (name) {
    var self = this;
    if (name === 'printf') return function () { return self.b_printf.apply(self, arguments); };
    if (name === 'scanf') return function () { return self.b_scanf.apply(self, arguments); };
    if (name === 'putchar') return function (c) { self.output += String.fromCharCode(toInt(c)); return c; };
    if (name === 'getchar') return function () { var t = self.inputTokens[self.inputPos++]; return t ? t.charCodeAt(0) : -1; };
    if (name === 'sqrt') return function (x) { return Math.sqrt(x); };
    if (name === 'abs') return function (x) { return Math.abs(x); };
    if (name === 'strlen') return function (s) { return (s || '').length; };
    if (name === 'pow') return function (a, b) { return Math.pow(a, b); };
    return null;
  };

  function toInt(v) { return v < 0 ? Math.ceil(v) : Math.floor(v); }
  function isFloatVal(v) { return typeof v === 'number' && !Number.isInteger(v); }

  Interp.prototype.b_printf = function (fmt) {
    var out = '';
    var ai = 0; // 参数下标
    var args = Array.prototype.slice.call(arguments, 1);
    var i = 0;
    while (i < fmt.length) {
      if (fmt[i] !== '%') { out += fmt[i]; i++; continue; }
      i++;
      // 解析宽度/精度/标志
      var width = 0, prec = -1, left = false, zero = false;
      while (i < fmt.length && '+- 0#'.indexOf(fmt[i]) >= 0) {
        if (fmt[i] === '-') left = true; else if (fmt[i] === '0') zero = true; else if (fmt[i] === ' ') width = width; else if (fmt[i] === '+') width = width; else if (fmt[i] === '#') width = width;
        i++;
      }
      var wstr = '';
      while (i < fmt.length && fmt[i] >= '0' && fmt[i] <= '9') { wstr += fmt[i]; i++; }
      if (wstr) width = parseInt(wstr, 10);
      if (fmt[i] === '.') { i++; var pstr = ''; while (i < fmt.length && fmt[i] >= '0' && fmt[i] <= '9') { pstr += fmt[i]; i++; } prec = parseInt(pstr, 10); }
      var spec = fmt[i]; i++;
      if (spec === '%') { out += '%'; continue; }
      var val = args[ai++];
      var s;
      if (spec === 'd' || spec === 'i' || spec === 'u' || spec === 'ld' || spec === 'li') {
        var iv = toInt(val); if (spec === 'u') iv = iv >>> 0;
        s = String(iv);
        if (width > 0 && s.length < width) { s = (zero ? pad0(s, width) : pad(s, width, left)); }
      } else if (spec === 'c') {
        s = String.fromCharCode(toInt(val));
      } else if (spec === 's') {
        s = String(val == null ? '' : val);
        if (width > 0 && s.length < width) s = pad(s, width, left);
      } else if (spec === 'f' || spec === 'lf' || spec === 'e' || spec === 'g') {
        var fv = Number(val);
        var fstr;
        if (prec >= 0) fstr = fv.toFixed(prec); else fstr = String(fv);
        s = fstr;
        if (width > 0 && s.length < width) s = (zero ? pad0(s, width) : pad(s, width, left));
      } else if (spec === 'x') {
        s = (toInt(val) >>> 0).toString(16);
      } else if (spec === 'o') {
        s = (toInt(val) >>> 0).toString(8);
      } else { s = '%' + spec; }
      out += s;
    }
    this.output += out;
    return out.length;
  };
  function pad(s, w, left) { while (s.length < w) s = left ? s + ' ' : ' ' + s; return s; }
  function pad0(s, w) { var neg = s[0] === '-'; if (neg) s = s.slice(1); while (s.length < w) s = '0' + s; return (neg ? '-' + s : s); }

  Interp.prototype.b_scanf = function (fmt) {
    var args = Array.prototype.slice.call(arguments, 1);
    var ai = 0; var count = 0;
    for (var i = 0; i < fmt.length; i++) {
      if (fmt[i] !== '%') continue;
      i++;
      var spec = fmt[i];
      var tok = this.inputTokens[this.inputPos++];
      if (tok === undefined) return count;
      if (spec === 'd' || spec === 'i' || spec === 'ld') { this.storeRef(args[ai++], parseInt(tok, 10)); count++; }
      else if (spec === 'f' || spec === 'lf') { this.storeRef(args[ai++], parseFloat(tok)); count++; }
      else if (spec === 'c') { this.storeRef(args[ai++], tok.charCodeAt(0)); count++; }
      else if (spec === 's') { this.storeRef(args[ai++], tok); count++; }
    }
    return count;
  };
  // 向引用(由 & 产生)存储值
  Interp.prototype.storeRef = function (ref, val) {
    if (ref && ref.__ref) { ref.scope.set(ref.name, this.coerce(val, ref.type)); }
    else { throw new CRunError('scanf 参数须为 &变量'); }
  };
  Interp.prototype.coerce = function (val, type) {
    if (!type) return val;
    if (type.base === 'char') return toInt(val) & 0xff;
    if (type.base === 'int' || type.base === 'unsigned') return toInt(val);
    return Number(val);
  };

  // 求值表达式，返回 {value, type}
  Interp.prototype.evalExpr = function (node, scope) {
    switch (node.kind) {
      case 'num': return { value: node.v, type: { base: node.f ? 'float' : 'int' } };
      case 'str': return { value: node.v, type: { base: 'char', str: true } };
      case 'id': {
        var ent = scope.get(node.v);
        if (ent === undefined) {
          // 尝试内建函数名
          if (this.builtin(node.v)) return { value: node.v, type: { base: 'func' } };
          throw new CRunError('未定义的标识符：' + node.v);
        }
        return { value: ent, type: scope.getType(node.v) || { base: 'int' } };
      }
      case 'binary': return this.evalBinary(node, scope);
      case 'unary': return this.evalUnary(node, scope);
      case 'assign': return this.evalAssign(node, scope);
      case 'ternary': {
        var c = this.evalExpr(node.cond, scope).value;
        return this.evalExpr(c ? node.t : node.f, scope);
      }
      case 'index': {
        var arr = this.evalExpr(node.e, scope).value;
        var idx = toInt(this.evalExpr(node.idx, scope).value);
        if (!Array.isArray(arr)) throw new CRunError('对非数组使用了下标');
        return { value: arr[idx], type: { base: 'int' } };
      }
      case 'call': return this.evalCall(node, scope);
      case 'member': return { value: 0, type: { base: 'int' } }; // 简化
      default: throw new CRunError('未知表达式节点');
    }
  };

  Interp.prototype.evalBinary = function (node, scope) {
    var l = this.evalExpr(node.left, scope);
    // 短路
    if (node.op === '&&') return { value: (l.value && this.evalExpr(node.right, scope).value) ? 1 : 0, type: { base: 'int' } };
    if (node.op === '||') return { value: (l.value || this.evalExpr(node.right, scope).value) ? 1 : 0, type: { base: 'int' } };
    var r = this.evalExpr(node.right, scope);
    var a = l.value, b = r.value;
    var lf = isFloatVal(a) || (l.type && l.type.base !== 'int' && l.type.base !== 'char') || isFloatVal(b) || (r.type && r.type.base !== 'int' && r.type.base !== 'char');
    var res;
    switch (node.op) {
      case '+': res = a + b; break;
      case '-': res = a - b; break;
      case '*': res = a * b; break;
      case '/': if (b === 0) throw new CRunError('除零错误'); res = (lf ? a / b : toInt(a) / toInt(b)); if (!lf) res = toInt(res); break;
      case '%': if (b === 0) throw new CRunError('模零错误'); res = toInt(a) % toInt(b); break;
      case '<': res = a < b ? 1 : 0; break;
      case '>': res = a > b ? 1 : 0; break;
      case '<=': res = a <= b ? 1 : 0; break;
      case '>=': res = a >= b ? 1 : 0; break;
      case '==': res = a === b ? 1 : 0; break;
      case '!=': res = a !== b ? 1 : 0; break;
      case '&': res = toInt(a) & toInt(b); break;
      case '|': res = toInt(a) | toInt(b); break;
      case '^': res = toInt(a) ^ toInt(b); break;
      case '<<': res = toInt(a) << toInt(b); break;
      case '>>': res = toInt(a) >> toInt(b); break;
      default: throw new CRunError('未知运算符 ' + node.op);
    }
    return { value: res, type: lf ? { base: 'float' } : { base: 'int' } };
  };

  Interp.prototype.evalUnary = function (node, scope) {
    if (node.op === '!') { var v = this.evalExpr(node.e, scope).value; return { value: v ? 0 : 1, type: { base: 'int' } }; }
    if (node.op === '~') { return { value: ~toInt(this.evalExpr(node.e, scope).value), type: { base: 'int' } }; }
    if (node.op === '-') { var x = this.evalExpr(node.e, scope).value; return { value: -x, type: { base: isFloatVal(x) ? 'float' : 'int' } }; }
    if (node.op === '+') { return this.evalExpr(node.e, scope); }
    if (node.op === '&') {
      // 取地址：要求 node.e 是 id
      if (node.e.kind !== 'id') throw new CRunError('& 仅支持作用于变量');
      var s = scope, found = null;
      while (s) { if (s.vars.hasOwnProperty(node.e.v)) { found = s; break; } s = s.parent; }
      return { value: { __ref: true, name: node.e.v, scope: found }, type: { base: 'int', ref: true } };
    }
    if (node.op === '++' || node.op === '--') {
      var tgt = node.e;
      var cur = this.evalExpr(tgt, scope).value;
      var nv = node.op === '++' ? cur + 1 : cur - 1;
      this.assignTo(tgt, nv, scope);
      return { value: node.prefix ? nv : cur, type: { base: 'int' } };
    }
    throw new CRunError('未知一元运算');
  };

  Interp.prototype.evalAssign = function (node, scope) {
    var rhs = this.evalExpr(node.right, scope);
    var val = rhs.value;
    var op = node.op;
    if (op !== '=') {
      var lcur = this.evalExpr(node.left, scope).value;
      switch (op) {
        case '+=': val = lcur + rhs.value; break;
        case '-=': val = lcur - rhs.value; break;
        case '*=': val = lcur * rhs.value; break;
        case '/=': val = (isFloatVal(lcur) || isFloatVal(rhs.value)) ? lcur / rhs.value : toInt(lcur) / toInt(rhs.value); if (!isFloatVal(lcur) && !isFloatVal(rhs.value)) val = toInt(val); break;
        case '%=': val = toInt(lcur) % toInt(rhs.value); break;
        case '&=': val = toInt(lcur) & toInt(rhs.value); break;
        case '|=': val = toInt(lcur) | toInt(rhs.value); break;
        case '^=': val = toInt(lcur) ^ toInt(rhs.value); break;
        case '<<=': val = toInt(lcur) << toInt(rhs.value); break;
        case '>>=': val = toInt(lcur) >> toInt(rhs.value); break;
      }
    }
    this.assignTo(node.left, val, scope);
    return { value: val, type: { base: 'int' } };
  };

  // 把值赋给 lvalue（id / index）
  Interp.prototype.assignTo = function (lval, val, scope) {
    if (lval.kind === 'id') { scope.set(lval.v, val); }
    else if (lval.kind === 'index') {
      var arr = this.evalExpr(lval.e, scope).value;
      var idx = toInt(this.evalExpr(lval.idx, scope).value);
      if (!Array.isArray(arr)) throw new CRunError('下标赋值目标非数组');
      arr[idx] = val;
    } else throw new CRunError('非法赋值目标');
  };

  Interp.prototype.evalCall = function (node, scope) {
    var fname = (node.e.kind === 'id') ? node.e.v : null;
    if (!fname) throw new CRunError('仅支持直接函数调用');
    // 内建函数
    var builtin = this.builtin(fname);
    if (builtin) {
      var bargs = node.args.map(function (a) { return this.evalExpr(a, scope).value; }, this);
      return { value: builtin.apply(this, bargs), type: { base: 'int' } };
    }
    var fn = this.defs[fname];
    if (!fn) throw new CRunError('未定义的函数：' + fname);
    var realParams = fn.params;
    var fs = new Scope(this.globals);
    node.args.forEach(function (a, idx) {
      var pv = this.evalExpr(a, scope);
      var pdef = realParams[idx];
      fs.declare(pdef.name, pv.value);
      fs.setType(pdef.name, pdef.type);
    }, this);
    try {
      this.execStmts(fn.body, fs);
    } catch (e) {
      if (e instanceof ReturnSignal) return { value: e.v, type: { base: 'int' } };
      throw e;
    }
    return { value: 0, type: { base: 'int' } };
  };

  // 执行语句列表
  Interp.prototype.execStmts = function (stmts, scope) {
    for (var i = 0; i < stmts.length; i++) {
      this.execStmt(stmts[i], scope);
    }
  };
  Interp.prototype.execStmt = function (st, scope) {
    if (!st || st.kind === 'empty' || st.kind === 'pp') return;
    switch (st.kind) {
      case 'decl': this.execDecl(st.vars, scope); break;
      case 'expr': this.evalExpr(st.expr, scope); break;
      case 'block': var bs = new Scope(scope); this.execStmts(st.stmts, bs); break;
      case 'if': {
        var c = this.evalExpr(st.cond, scope).value;
        if (c) this.execStmt(st.then, scope); else if (st.else) this.execStmt(st.else, scope);
        break;
      }
      case 'while': {
        while (this.evalExpr(st.cond, scope).value) {
          try { this.execStmt(st.body, new Scope(scope)); }
          catch (e) { if (e instanceof BreakSignal) break; if (e instanceof ContinueSignal) continue; throw e; }
        }
        break;
      }
      case 'dowhile': {
        do {
          try { this.execStmt(st.body, new Scope(scope)); }
          catch (e) { if (e instanceof BreakSignal) break; if (e instanceof ContinueSignal) continue; throw e; }
        } while (this.evalExpr(st.cond, scope).value);
        break;
      }
      case 'for': {
        var fs = new Scope(scope);
        if (st.init) { if (st.init.kind === 'decl') this.execStmt(st.init, fs); else this.evalExpr(st.init, fs); }
        while (true) {
          if (st.test && !this.evalExpr(st.test, fs).value) break;
          try { this.execStmt(st.body, new Scope(fs)); }
          catch (e) { if (e instanceof BreakSignal) break; if (e instanceof ContinueSignal) { if (st.inc) this.evalExpr(st.inc, fs); continue; } throw e; }
          if (st.inc) this.evalExpr(st.inc, fs);
        }
        break;
      }
      case 'return': {
        var rv = st.val ? this.evalExpr(st.val, scope).value : 0;
        throw new ReturnSignal(rv);
      }
      case 'break': throw new BreakSignal();
      case 'continue': throw new ContinueSignal();
      default: throw new CRunError('未知语句');
    }
  };

  Interp.prototype.execDecl = function (vars, scope) {
    var self = this;
    vars.forEach(function (vd) {
      var val;
      if (vd.dims && vd.dims.length) {
        val = self.makeArray(vd.dims, vd.init, scope);
      } else if (vd.init !== null && vd.init !== undefined) {
        val = self.evalExprOrVal(vd.init, scope);
      } else {
        val = (vd.type.base === 'float' || vd.type.base === 'double') ? 0.0 : 0;
      }
      scope.declare(vd.name, val);
      scope.setType(vd.name, vd.type);
    });
  };
  Interp.prototype.evalExprOrVal = function (init, scope) {
    if (Array.isArray(init)) return init; // 数组初始值已是数组
    return this.evalExpr(init, scope).value;
  };

  Interp.prototype.makeArray = function (dims, init, scope, di) {
    di = di || 0;
    var size = dims[di];
    if (size === null || size === undefined) size = (init && init.length) ? init.length : 0;
    var arr = new Array(size);
    for (var i = 0; i < size; i++) {
      if (di + 1 < dims.length) arr[i] = this.makeArray(dims, init && init[i], scope, di + 1);
      else arr[i] = (init && init[i] !== undefined) ? this.evalExpr(init[i], scope).value : 0;
    }
    return arr;
  };

  // ---------------- 运行入口 ----------------
  Interp.prototype.run = function (decls) {
    // 先注册函数定义与全局变量
    var self = this;
    decls.forEach(function (d) {
      if (d.kind === 'func') { self.defs[d.name] = d; }
      else if (d.kind === 'gvar') {
        d.vars.forEach(function (vd) {
          var val;
          if (vd.dims && vd.dims.length) val = self.makeArray(vd.dims, vd.init, self.globals);
          else if (vd.init !== null && vd.init !== undefined) val = self.evalExpr(vd.init, self.globals).value;
          else val = (vd.type.base === 'float' || vd.type.base === 'double') ? 0.0 : 0;
          self.globals.declare(vd.name, val);
          self.globals.setType(vd.name, vd.type);
        });
      }
    });
    // 必须有 main
    if (!this.defs['main']) throw new CRunError('找不到 main 函数');
    var mainFn = this.defs['main'];
    var ms = new Scope(this.globals);
    try {
      this.execStmts(mainFn.body, ms);
    } catch (e) {
      if (e instanceof ReturnSignal) return;
      throw e;
    }
  };

  // ---------------- 对外接口 ----------------
  function run(src, input) {
    // 先做 #define 文本替换（仅对象式，且值是数字/标识符）
    src = preprocessDefines(src);
    var toks;
    try { toks = tokenize(src); }
    catch (e) { return { error: '词法错误：' + e.message }; }
    var parser = new Parser(toks);
    var decls;
    try { decls = parser.parseProgram(); }
    catch (e) { return { error: '语法错误：' + e.message }; }
    var interp = new Interp(src, input);
    interp.ppDefines = parser.ppDefines;
    try { interp.run(decls); }
    catch (e) {
      if (e instanceof CRunError) return { error: e.msg, output: interp.output };
      if (e instanceof ReturnSignal) return { output: interp.output };
      return { error: '运行错误：' + (e && e.message ? e.message : e), output: interp.output };
    }
    return { output: interp.output };
  }

  function preprocessDefines(src) {
    // 简单处理 #define 名称 值（数字或单词）
    var defines = {};
    src.split('\n').forEach(function (line) {
      var m = /^#\s*define\s+([A-Za-z_]\w*)\s+([0-9A-Za-z_]+)\s*$/.exec(line);
      if (m) defines[m[1]] = m[2];
    });
    Object.keys(defines).forEach(function (name) {
      var re = new RegExp('\\b' + name + '\\b', 'g');
      src = src.replace(re, defines[name]);
    });
    return src;
  }

  global.CRun = { run: run };
})(typeof window !== 'undefined' ? window : globalThis);
