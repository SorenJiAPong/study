/* doc_intake.js — 文档摄入共享模块
 * 能力：读取 PDF / Word(.docx) / .txt / .json；启发式拆分为知识点/题目；可编辑预览后写入。
 * 用法（由各科目页在「选择文件」时调用）：
 *   DocIntake.readFile(file).then(res => { var items = DocIntake.split(res.text, '政治'); DocIntake.render(prevEl, items, {subject, typeOptions, onCommit, onRaw}); })
 */
(function () {
  'use strict';
  var _pdfReady = null, _mammothReady = null, _workerSrc = null;

  function loadScript(src) {
    return new Promise(function (res, rej) {
      var exist = document.querySelector('script[src="' + src + '"]');
      if (exist) { res(); return; }
      var s = document.createElement('script');
      s.src = src;
      s.onload = function () { res(); };
      s.onerror = function () { rej(new Error('加载失败: ' + src)); };
      document.head.appendChild(s);
    });
  }
  function ensurePdf() {
    if (_pdfReady) return _pdfReady;
    _pdfReady = loadScript('libs/pdf.min.js').then(function () {
      if (!window.pdfjsLib) throw new Error('pdfjsLib 未定义');
      return setWorker();
    });
    return _pdfReady;
  }
  function setWorker() {
    if (_workerSrc) { window.pdfjsLib.GlobalWorkerOptions.workerSrc = _workerSrc; return Promise.resolve(); }
    function useRel() { window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'libs/pdf.worker.min.js'; }
    function fetchBlob() {
      return fetch('libs/pdf.worker.min.js').then(function (r) {
        if (!r.ok) throw 0;
        return r.text();
      }).then(function (txt) {
        _workerSrc = URL.createObjectURL(new Blob([txt], { type: 'application/javascript' }));
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = _workerSrc;
      });
    }
    // file:// 下 fetch 常被 CORS 拦，退回 XMLHttpRequest（Firefox 本地可成功）
    function xhrBlob() {
      return new Promise(function (res, rej) {
        try {
          var x = new XMLHttpRequest();
          x.open('GET', 'libs/pdf.worker.min.js', true);
          x.overrideMimeType('application/javascript');
          x.onload = function () {
            if (x.status === 200 || x.status === 0) {
              _workerSrc = URL.createObjectURL(new Blob([x.responseText], { type: 'application/javascript' }));
              window.pdfjsLib.GlobalWorkerOptions.workerSrc = _workerSrc; res();
            } else rej();
          };
          x.onerror = rej; x.send();
        } catch (e) { rej(e); }
      });
    }
    return fetchBlob().catch(xhrBlob).catch(function () { useRel(); });
  }
  function ensureMammoth() {
    if (_mammothReady) return _mammothReady;
    _mammothReady = loadScript('libs/mammoth.browser.min.js');
    return _mammothReady;
  }
  function extOf(name) { var i = name.lastIndexOf('.'); return i < 0 ? '' : name.slice(i + 1).toLowerCase(); }
  // HTML 转义：导入文字若含标签，渲染前先转义，防 XSS / 防破坏排版（审计报告 #2-①）
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function readTextFile(file) { return new Promise(function (res, rej) { var r = new FileReader(); r.onload = function () { res(r.result); }; r.onerror = function () { rej(r.error || new Error('读取失败')); }; r.readAsText(file); }); }
  function readArrayBuffer(file) { return new Promise(function (res, rej) { var r = new FileReader(); r.onload = function () { res(r.result); }; r.onerror = function () { rej(r.error || new Error('读取失败')); }; r.readAsArrayBuffer(file); }); }

  function parsePdf(file) {
    return ensurePdf().then(function () { return readArrayBuffer(file); }).then(function (buf) {
      return window.pdfjsLib.getDocument({ data: new Uint8Array(buf) }).promise;
    }).then(function (pdf) {
      var out = [], chain = Promise.resolve();
      for (var i = 1; i <= pdf.numPages; i++) {
        (function (n) {
          chain = chain.then(function () { return pdf.getPage(n); }).then(function (page) {
            return page.getTextContent();
          }).then(function (tc) {
            out.push(tc.items.map(function (it) { return it.str; }).join(' '));
          });
        })(i);
      }
      return chain.then(function () { return out.join('\n\n'); });
    });
  }
  function parseDocx(file) {
    return ensureMammoth().then(function () { return readArrayBuffer(file); }).then(function (buf) {
      return window.mammoth.extractRawText({ arrayBuffer: buf });
    }).then(function (res) { return res.value; });
  }

  function readFile(file) {
    var ext = extOf(file.name);
    // 审计报告 #2-②：file:// 下浏览器禁止加载 PDF/Word 解析引擎(worker)，提前给出明确引导，避免静默失败/卡死
    if ((ext === 'pdf' || ext === 'docx' || ext === 'doc') && location.protocol === 'file:') {
      return Promise.reject(new Error('PDF / Word 在「本地双击(file://)」下无法加载解析引擎（浏览器安全限制）。请改用「联网打开网页版」再导入，或把内容复制粘贴进来；txt / json 在本地可正常导入。'));
    }
    if (ext === 'txt') return readTextFile(file).then(function (t) { return { text: t, name: file.name, ext: ext }; });
    if (ext === 'json') return readTextFile(file).then(function (t) { return { text: t, name: file.name, ext: 'json' }; });
    if (ext === 'pdf') return parsePdf(file).then(function (t) { return { text: t, name: file.name, ext: ext }; });
    if (ext === 'docx') return parseDocx(file).then(function (t) { return { text: t, name: file.name, ext: ext }; });
    if (ext === 'doc') return Promise.reject(new Error('.doc 老格式浏览器无法直接解析，请另存为 .docx 或把文档发给我整理'));
    return readTextFile(file).then(function (t) { return { text: t, name: file.name, ext: ext }; });
  }

  // ===================== 启发式拆分 =====================
  function classify(b) {
    var optM = /(^|\n)\s*[A-D][\.\、\)]\s/.test(b) || /（[A-D]）/.test(b);
    var judge = /(^|\n)\s*(正确|错误|对|错|true|false)\s*[．.：:）)]/i.test(b);
    var qmark = /[？?]\s*$/.test(b) || b.indexOf('？') >= 0 || b.indexOf('?') >= 0;
    var heading = /^\s*(\d+[\.\、]|[一二三四五六七八九十]+[、．.\s])/.test(b);
    if (optM) {
      var lines = b.split('\n').map(function (s) { return s.trim(); }).filter(Boolean);
      var qLines = [], opts = [], inOpt = false;
      lines.forEach(function (ln) {
        var m = ln.match(/^\s*([A-D])[\.\、\)]\s*(.*)$/);
        var m2 = ln.match(/^（([A-D])）\s*(.*)$/);
        if (m || m2) { inOpt = true; opts.push((m ? m[1] : m2[1]) + '. ' + (m ? m[2] : m2[2])); }
        else { if (!inOpt) qLines.push(ln); else opts[opts.length - 1] += ' ' + ln; }
      });
      return { type: judge ? 'judge' : 'choice', title: '', q: qLines.join(' ').trim(), options: opts, answer: '', explain: '', chapter: '' };
    }
    if (heading) {
      var hm = b.match(/^\s*(\d+[\.\、]|[一二三四五六七八九十]+[、．.\s])\s*(.*)$/);
      var title = hm ? hm[2].trim() : b.slice(0, 30);
      var content = b.replace(/^\s*(\d+[\.\、]|[一二三四五六七八九十]+[、．.\s])\s*/, '').trim();
      return { type: qmark ? 'essay' : 'kp', title: title, content: content, chapter: '' };
    }
    if (qmark) { return { type: 'essay', title: '', q: b, content: '', chapter: '' }; }
    var first = b.split('\n')[0].trim();
    return { type: 'kp', title: first.slice(0, 40), content: b, chapter: '' };
  }
  function split(text) {
    var items = [];
    var blocks = (text || '').replace(/\r\n/g, '\n').split(/\n{2,}/).map(function (s) { return s.trim(); }).filter(function (s) { return s.length > 0; });
    blocks.forEach(function (b) { var it = classify(b); if (it) items.push(it); });
    if (items.length === 0 && (text || '').trim()) {
      items.push({ type: 'raw', title: '(整篇)', content: text.trim(), chapter: '' });
    }
    // 仅合并「无标题的碎片」kp 到上一条；带编号/标题的条目保持独立（避免误并知识点）
    var merged = [];
    items.forEach(function (it) {
      var prev = merged[merged.length - 1];
      if (prev && prev.type === 'kp' && it.type === 'kp' && !prev.title && (prev.content.length + it.content.length) < 120) {
        prev.content = (prev.content + '\n' + it.content).trim();
        if (!prev.title) prev.title = it.title;
      } else merged.push(it);
    });
    return merged;
  }

  // ===================== 预览 / 编辑 UI =====================
  function render(container, items, opts) {
    opts = opts || {};
    container.innerHTML = '';
    var typeOptions = opts.typeOptions || [
      ['kp', '知识点'], ['choice', '选择题'], ['judge', '判断题'], ['blank', '填空题'],
      ['essay', '简答题'], ['calc', '计算题'], ['apply', '应用题'], ['wrong', '错题'], ['raw', '整体原文']
    ];
    var head = document.createElement('div');
    head.style.cssText = 'margin:8px 0;font-size:13px';
    head.innerHTML = '<b>共识别 ' + esc(items.length) + ' 条</b> <span style="color:#888">（勾选并调整类型/章节后导入；类型下拉可改；「整体作为原文」可整篇存入）</span>';
    var bar = document.createElement('div'); bar.style.cssText = 'margin:6px 0;display:flex;gap:8px;flex-wrap:wrap';
    var selAll = btn('全选', '#2e7d32'), selNone = btn('全不选', '#888'), rawAll = btn('整体作为原文导入', '#1565c0'), commit = btn('确认导入选中', '#2e7d32');
    bar.appendChild(selAll); bar.appendChild(selNone); bar.appendChild(rawAll); bar.appendChild(commit);
    head.appendChild(bar); container.appendChild(head);
    var list = document.createElement('div'); list.style.cssText = 'max-height:48vh;overflow:auto;border:1px solid #ddd;border-radius:8px;padding:8px';
    container.appendChild(list);
    var cards = [];
    items.forEach(function (it, idx) {
      var card = document.createElement('div'); card.style.cssText = 'border:1px solid #eee;border-radius:8px;padding:8px;margin-bottom:8px;background:#fafafa';
      var top = document.createElement('div'); top.style.cssText = 'display:flex;gap:8px;align-items:center;flex-wrap:wrap';
      var cb = document.createElement('input'); cb.type = 'checkbox'; cb.checked = true;
      var sel = document.createElement('select');
      typeOptions.forEach(function (t) { var o = document.createElement('option'); o.value = t[0]; o.textContent = t[1]; if (t[0] === it.type) o.selected = true; sel.appendChild(o); });
      var chap = inp(it.chapter || '', '章节/标签', 'flex:1;min-width:110px');
      top.appendChild(cb); top.appendChild(sel); top.appendChild(chap); card.appendChild(top);
      var title = inp(it.title || '', '标题', 'width:100%;margin-top:6px');
      var content = document.createElement('textarea'); content.style.cssText = 'width:100%;height:58px;margin-top:6px;box-sizing:border-box;font-size:12px'; content.placeholder = '内容 / 题目 / 答案'; content.value = it.content || it.q || '';
      card.appendChild(title); card.appendChild(content);
      list.appendChild(card);
      cards.push({ cb: cb, sel: sel, chap: chap, title: title, content: content, idx: idx });
    });
    selAll.onclick = function () { cards.forEach(function (c) { c.cb.checked = true; }); };
    selNone.onclick = function () { cards.forEach(function (c) { c.cb.checked = false; }); };
    rawAll.onclick = function () { if (opts.onRaw) opts.onRaw(); };
    commit.onclick = function () {
      var chosen = [];
      cards.forEach(function (c) {
        if (!c.cb.checked) return;
        var t = c.sel.value;
        var obj = { type: t, chapter: c.chap.value.trim(), title: c.title.value.trim(), content: c.content.value, options: items[c.idx].options || [], answer: items[c.idx].answer || '', explain: items[c.idx].explain || '' };
        if (t === 'choice' || t === 'judge' || t === 'blank' || t === 'essay' || t === 'calc' || t === 'apply') { obj.q = c.content.value; if (!obj.title) obj.title = ''; }
        if (t === 'wrong') { obj.q = c.content.value; }
        chosen.push(obj);
      });
      if (opts.onCommit) opts.onCommit(chosen);
    };
    function btn(label, color) { var b = document.createElement('button'); b.textContent = label; b.style.cssText = 'padding:6px 10px;border-radius:6px;border:1px solid ' + color + ';background:' + color + ';color:#fff;cursor:pointer;font-size:12px'; return b; }
    function inp(val, ph, css) { var i = document.createElement('input'); i.value = val; i.placeholder = ph; i.style.cssText = 'padding:5px 8px;border:1px solid #ccc;border-radius:6px;font-size:12px;' + css; return i; }
  }

  window.DocIntake = { readFile: readFile, split: split, render: render, esc: esc };
})();
