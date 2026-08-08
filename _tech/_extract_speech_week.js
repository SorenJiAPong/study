const fs = require('fs');
const vm = require('vm');
const src = fs.readFileSync('politics_data.js', 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(src + '\n;window.__P=window.POLITICS;', sandbox);
const POL = sandbox.window.__P;

// ---- build fwById (idx -> point) ----
const fwById = {};
POL.framework.chapters.forEach(ch => (ch.groups || []).forEach(g => (g.points || []).forEach(p => { fwById[p.idx] = p; })));

// ---- replicate genSmartPlan (与 politics.html 一致) ----
function genSmartPlan(POL) {
  const FW = POL.framework;
  const pts = [];
  FW.chapters.forEach(ch => (ch.groups || []).forEach(g => (g.points || []).forEach(p => pts.push({ idx: p.idx, pri: p.priority || '基础', ch: ch.name }))));
  const keyPts = pts.filter(p => p.pri === '必考' || p.pri === '高频');
  const keyIds = keyPts.map(p => p.idx);
  const MAX_KEY = 3, MAX_TOTAL = 7, MAX_REV = 4;
  const days = [];
  function newDay(ph) { return { ph, l: [], r: [], datiCh: '', jiantiCh: '' }; }
  function chOf(id) { const p = pts.find(x => x.idx === id); return p ? p.ch : ''; }
  function setCh(d, di) { const all = d.l.concat(d.r); let chap = ''; for (let i = 0; i < all.length; i++) { chap = chOf(all[i]); if (chap) break; } d.datiCh = chap; d.jiantiCh = ((di % 3) === 2) ? chap : ''; }
  let cur = newDay('首遍'), keyInDay = 0, totInDay = 0, learnedKey = [];
  function flushCur() { if (cur.l.length || cur.r.length) days.push(cur); cur = newDay('首遍'); keyInDay = 0; totInDay = 0; }
  pts.forEach(pt => {
    const isKey = (pt.pri === '必考' || pt.pri === '高频');
    if (isKey) { if (keyInDay >= MAX_KEY || totInDay >= MAX_TOTAL) flushCur(); cur.l.push(pt.idx); keyInDay++; totInDay++; learnedKey.push(pt.idx); }
    else { if (totInDay >= MAX_TOTAL) flushCur(); cur.l.push(pt.idx); totInDay++; }
  });
  flushCur();
  const acc = [];
  days.forEach(d => {
    const rev = [];
    [1, 2, 4, 7, 14].forEach(off => { const k = acc.length - off; if (k >= 0 && rev.indexOf(acc[k]) < 0 && rev.length < MAX_REV) rev.push(acc[k]); });
    for (let k = acc.length - 1; k >= 0 && rev.length < MAX_REV; k--) { if (rev.indexOf(acc[k]) < 0) rev.push(acc[k]); }
    d.r = rev;
    d.l.forEach(x => { if (learnedKey.indexOf(x) >= 0) acc.push(x); });
  });
  function reviewRound(ph, idList, perDay) {
    if (!idList.length) return;
    let acc2 = [];
    for (let i = 0; i < idList.length; i += perDay) {
      const chunk = idList.slice(i, i + perDay), d = newDay(ph);
      d.r = chunk.slice();
      const extra = [];
      [1, 2, 3, 5].forEach(off => { const k = acc2.length - off; if (k >= 0 && extra.indexOf(acc2[k]) < 0 && extra.length < 2) extra.push(acc2[k]); });
      d.r = d.r.concat(extra);
      acc2 = acc2.concat(chunk);
      days.push(d);
    }
  }
  reviewRound('二刷', pts.map(p => p.idx), 5);
  reviewRound('三刷', pts.map(p => p.idx), 5);
  const TARGET = 210, allIds = pts.map(p => p.idx); let si = 0;
  while (days.length < TARGET) {
    const d = newDay('冲刺'), chunk = [];
    for (let k = 0; k < 4 && si < allIds.length; k++) { chunk.push(allIds[si]); si++; }
    if (si >= allIds.length) si = 0;
    d.r = chunk; days.push(d);
  }
  days.forEach((d, di) => setCh(d, di));
  POL.startDate = '2026-08-07';
  POL.studyPlan = days;
  POL.totalDays = days.length;
}
genSmartPlan(POL);

// ---- 计算“今天”对应的计划天 curDay（与政治页一致：今天日期 - startDate + 1） ----
const startStr = POL.startDate || '2026-08-07';
const start = new Date(startStr + 'T00:00:00');
const today = new Date();
const dayMs = 86400000;
let curDay = Math.floor((today - start) / dayMs) + 1;
if (!isFinite(curDay) || curDay < 1) curDay = 1;

const total = POL.totalDays || POL.studyPlan.length;
const W = 7; // 滚动窗口大小：只保留约一周
let endD = Math.min(total, curDay + 5);
let startD = Math.max(1, endD - W + 1);
const windowDays = [];
for (let d = startD; d <= endD; d++) windowDays.push(d);

// ---- 提取窗口内每天朗诵文本（格式与 collectDaySpeech 一致） ----
const outDir = '_tech/speech_src';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
windowDays.forEach(dn => {
  const day = POL.studyPlan[dn - 1];
  if (!day) { console.log('day' + dn + ': NO DAY'); return; }
  const idxs = (day.l || []).concat(day.r || []);
  const items = [];
  idxs.forEach(idx => {
    const p = fwById[idx];
    if (!p) return;
    const text = '【' + (p.level || '') + '】' + (p.title || '');
    const body = (p.content || '').replace(/<[^>]*>/g, '').trim();
    const txt = text + (body ? ('。' + body) : '');
    if (txt.trim()) items.push(txt.trim());
  });
  const text = items.join('\n\n');
  const fn = outDir + '/day' + String(dn).padStart(2, '0') + '.txt';
  fs.writeFileSync(fn, text, 'utf8');
  console.log('day' + dn + ': points=' + items.length + ' chars=' + text.length + ' -> ' + fn);
});

fs.writeFileSync('_tech/speech_window.json', JSON.stringify({ curDay, windowDays, start: startStr, generatedAt: new Date().toISOString() }, null, 2));
console.log('WINDOW curDay=' + curDay + ' days=[' + windowDays.join(',') + ']');
