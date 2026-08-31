// 政治选择题每日抽考生成器（确定性，按日期种子）
const fs = require('fs');
const path = require('path');

const DATE = '20260826';
const DISP = '2026-08-26';
const OUT = path.join(__dirname, '..', '政治每日抽考', `每日抽考_${DISP}.md`);

// ---- 读取 POLITICS ----
const s = fs.readFileSync(path.join(__dirname, 'politics_data.js'), 'utf8');
const m = s.match(/window\.POLITICS\s*=\s*(\{[\s\S]*\})\s*;?\s*$/);
let POL;
try { POL = eval('(' + m[1] + ')'); } catch (e) { console.error('EVAL_ERR', e); process.exit(1); }

let pool = POL.mcqPool || [];
// 按"题干+选项"指纹去重
const seen = new Set();
pool = pool.filter(it => {
  const fp = (it.q || '') + '|' + (it.options || []).join('|');
  if (seen.has(fp)) return false;
  seen.add(fp);
  return true;
});

// ---- 题型分离 ----
const singles = pool.filter(it => it.type !== 'multi');
const multis = pool.filter(it => it.type === 'multi');

// ---- 确定性随机（mulberry32）----
function seedFrom(str) { let h = 1779033703 ^ str.length; for (let i = 0; i < str.length; i++) { h = Math.imul(h ^ str.charCodeAt(i), 3432918353); h = (h << 13) | (h >>> 19); } return h >>> 0; }
function mulberry32(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const rnd = mulberry32(seedFrom(DATE));
function shuffle(arr) { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

const pickSingle = shuffle(singles).slice(0, 12);
const pickMulti = shuffle(multis).slice(0, 8);
const chosen = pickSingle.concat(pickMulti);

// ---- 工具 ----
function answerToArr(ans) { return String(ans).split('').filter(c => /[A-F]/.test(c)); }
function optLabel(i) { return 'ABCD'[i]; }

function buildQuestion(idx, it) {
  const isMulti = it.type === 'multi';
  let txt = `**${idx}.** [${isMulti ? '多选' : '单选'}] ${it.q}\n\n`;
  (it.options || []).forEach((o, i) => { txt += `${optLabel(i)}. ${o}\n`; });
  return txt.trim();
}

function buildAnswer(idx, it) {
  const isMulti = it.type === 'multi';
  const correct = answerToArr(it.answer);
  let txt = `**${idx}.** [${isMulti ? '多选' : '单选'}] ${it.q}\n`;
  txt += `✅ **正确答案：${correct.join('、')}**\n\n`;
  // 逐选项分析
  const oe = it.opt_exp;
  if (oe && typeof oe === 'object') {
    (it.options || []).forEach((o, i) => {
      const L = optLabel(i);
      const exp = oe['ABCD'[i]] || oe[i] || oe[String(i)] || '';
      const mark = correct.includes(L) ? '✓ 正确项' : '✗ 干扰项';
      txt += `- **${L}. ${o}** —— ${mark}${exp ? '：' + exp : ''}\n`;
    });
  } else {
    txt += `【解析】${it.explain || ''}\n`;
  }
  if (it.kp) txt += `\n💡 **考点**：${it.kp}\n`;
  return txt.trim();
}

// ---- 组装 markdown ----
let md = '';
md += `# 广东专插本政治 · 每日选择题抽考（${DISP}）\n\n`;
md += `> **卷首说明**：本卷共 20 题（单选 12 + 多选 8），覆盖毛泽东思想、邓小平理论、"三个代表"重要思想、科学发展观、习近平新时代中国特色社会主义思想及时政等核心模块。请先闭卷作答，再对照文末【答案与解析】自行打分。建议目标：单选正确率 ≥ 90%，多选 ≥ 75%。\n\n`;
md += `---\n\n`;
md += `## 一、测验卷（先作答，后看答案）\n\n`;
chosen.forEach((it, i) => { md += buildQuestion(i + 1, it) + '\n\n'; });
md += `---\n\n`;
md += `## 二、答案与解析\n\n`;
chosen.forEach((it, i) => { md += buildAnswer(i + 1, it) + '\n\n'; });

// 统计题型分布
const dist = {};
chosen.forEach(it => {
  const k = it.mod || (it.type === 'multi' ? '多选' : '单选');
  dist[k] = (dist[k] || 0) + 1;
});
md += `---\n\n`;
md += `## 三、本卷题型分布\n\n`;
md += `- 单选 ${pickSingle.length} 题，多选 ${pickMulti.length} 题\n`;
Object.entries(dist).forEach(([k, v]) => { md += `- ${k}：${v} 题\n`; });

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, md, 'utf8');
console.log('DONE ->', OUT);
console.log('picked single/multi:', pickSingle.length, pickMulti.length);
console.log('coverage mods:', Object.keys(dist).join(', '));
