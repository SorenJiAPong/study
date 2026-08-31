const fs = require('fs');
const path = require('path');
const DIR = __dirname;

// ---------- load ----------
const raw = fs.readFileSync(path.join(DIR,'politics_data.js'),'utf8');
const start = raw.indexOf('{', raw.indexOf('window.POLITICS'));
const end = raw.lastIndexOf('}');
const POL = JSON.parse(raw.slice(start, end+1));
const pool = POL.mcqPool;

// ---------- helpers ----------
function fingerprint(it){
  return (it.q||'') + '||' + (it.options||[]).join('|');
}
// dedup by (q+options)
const seen = new Set();
const dedup = [];
for(const it of pool){
  const f = fingerprint(it);
  if(seen.has(f)) continue;
  seen.add(f);
  dedup.push(it);
}
const singles = dedup.filter(x=>x.type!=='multi');
const multis  = dedup.filter(x=>x.type==='multi');

// mulberry32 seeded PRNG
function mulberry32(a){
  return function(){
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
function seededShuffle(arr, seed){
  const a = arr.slice();
  const rnd = mulberry32(seed);
  for(let i=a.length-1;i>0;i--){
    const j = Math.floor(rnd()*(i+1));
    [a[i],a[j]] = [a[j],a[i]];
  }
  return a;
}
const DATE = '20260827';
const seed = parseInt(DATE,10);
const pickedS = seededShuffle(singles, seed).slice(0,12);
const pickedM = seededShuffle(multis, seed ^ 0x5bd1e995).slice(0,8);
const picked = pickedS.concat(pickedM);

// ---------- answer-array helper ----------
function answerToArr(ans){
  return String(ans).split('').filter(c=>/[A-F]/.test(c)).map(c=>c.toUpperCase());
}

// ---------- verify answers are valid ----------
const warnings = [];
picked.forEach((it,idx)=>{
  const arr = answerToArr(it.answer);
  const set = new Set(arr);
  let ok = arr.length>0;
  arr.forEach(l=>{ if(l.charCodeAt(0)-65 >= it.options.length) ok=false; });
  if(!ok) warnings.push('Q'+(idx+1)+' 答案解析异常: answer='+it.answer+' options='+it.options.length);
});

const LETTERS = ['A','B','C','D','E','F'];

// ---------- render questions (no answers) ----------
let qMd = '';
picked.forEach((it,idx)=>{
  const isMulti = it.type==='multi';
  const tag = isMulti ? '【多选】' : '【单选】';
  qMd += `\n### 第 ${idx+1} 题 ${tag}\n\n${it.q}\n\n`;
  it.options.forEach((o,k)=>{
    qMd += `${LETTERS[k]}. ${o}\n`;
  });
  qMd += '\n';
});

// ---------- render answers & analysis ----------
let aMd = '';
picked.forEach((it,idx)=>{
  const arr = answerToArr(it.answer);
  const correctLetters = arr.join('、');
  const isMulti = it.type==='multi';
  aMd += `\n### 第 ${idx+1} 题（${it.type==='multi'?'多选':'单选'}）\n\n`;
  aMd += `**正确答案：${correctLetters}**\n\n`;
  // per-option
  if(Array.isArray(it.opt_exp) && it.opt_exp.length===it.options.length){
    it.options.forEach((o,k)=>{
      const L = LETTERS[k];
      const isCorr = arr.includes(L);
      const mark = isCorr ? '✅ 正确' : '❌ 错误';
      aMd += `- **${L}. ${o}** — ${mark}\n  ${it.opt_exp[k]}\n`;
    });
  } else {
    aMd += `_解析：${it.explain||''}_\n`;
  }
  if(it.kp) aMd += `\n> 📌 考点提示：${it.kp}\n`;
});

// ---------- coverage summary ----------
function coverage(picked){
  const catCount = {};
  picked.forEach(it=>{
    let c = '其他';
    const k = (it.kp||'') + ' ' + (it.set||'') + ' ' + (it.q||'');
    if(/习|新时代|习近平|中国式|人类命运|总体国家|十个明确|六个必须|四个全面|五位一体/.test(k)) c='习思想/新时代';
    else if(/毛泽东|新民主主义|革命|《|萌芽|星星之火|工农武装|三大法宝|活的灵魂|群众路线|实事求是/.test(k)) c='毛泽东思想';
    else if(/邓小平|初级阶段|基本路线|一国两制|社会主义本质|三步走|发展才是|改革开放/.test(k)) c='邓小平理论';
    else if(/三个代表/.test(k)) c='三个代表';
    else if(/科学发展观|以人为本|全面协调|统筹兼顾/.test(k)) c='科学发展观';
    else if(/时政|202[0-9]|报告|全会|会议|小康|脱贫|二十大|十九/.test(k)) c='时政/综合';
    catCount[c] = (catCount[c]||0)+1;
  });
  return catCount;
}
const cov = coverage(picked);
const covLine = Object.entries(cov).map(([k,v])=>`${k}(${v})`).join('、');

// ---------- assemble ----------
const header = `# 广东专插本政治 · 每日选择题抽考（2026-08-27）

> 今日 20 题（单选 12 + 多选 8），题源取自督学工作台 \`politics_data.js\` 的 \`window.POLITICS.mcqPool\`（共 347 题，按"题干+选项"指纹去重后无重复）。
> 覆盖板块：${covLine}。
> 建议：先闭卷作答，再对照文末【答案与解析】打分。每题 5 分，满分 100 分。

---

## 一、卷首说明
- 本卷为**每日自测卷**，随机抽取、当天稳定、跨天新鲜。
- 单选 12 题、多选 8 题；多选题须全部选对方得分。
- 先做下面 20 道题，答案与解析统一放在最后，避免边做边看。

---

## 二、测验题（先作答，后看答案）

${qMd.trim()}
---

## 三、答案与解析

${aMd.trim()}
---

## 四、易错预警与勘误
`;
let warningBlock = '';
if(warnings.length){
  warningBlock += '⚠️ 自动校验发现以下题目答案字段异常，请谨慎核对：\n' + warnings.map(w=>'- '+w).join('\n') + '\n';
} else {
  warningBlock += '✅ 本卷 20 题答案字段经程序校验均合法（正确选项字母均在选项范围内），以源题库 \`answer\` 字段为准。\n';
}
warningBlock += '\n> 说明：源题库个别 \`explain\` 文本或 \`kp\` 标签存在转录笔误/错位（仅影响解析文字，不影响 \`answer\` 正确选项）。如某题解析与答案看似矛盾，请以【正确答案】为准，并在二刷时回归教材确认。\n';

const full = header + warningBlock;

// write
const outDir = path.join(DIR, '..', '政治每日抽考');
if(!fs.existsSync(outDir)) fs.mkdirSync(outDir, {recursive:true});
const outPath = path.join(outDir, '每日抽考_2026-08-27.md');
fs.writeFileSync(outPath, full, 'utf8');
console.log('WROTE', outPath);
console.log('singles picked:', pickedS.length, 'multis picked:', pickedM.length);
console.log('coverage:', covLine);
console.log('warnings:', warnings.length);
// also print a compact preview of questions
console.log('\n--- QUESTION PREVIEW (no answers) ---');
picked.forEach((it,i)=>{
  console.log((i+1)+'. ['+it.type+'] '+it.q.slice(0,40)+'...');
});
