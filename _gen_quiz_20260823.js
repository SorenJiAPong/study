const fs = require("fs");
const path = require("path");

const DATE = "20260823";
const OUT = "政治每日抽考/每日抽考_2026-08-23.md";
const WS = "F:/wokebuddy创造/2026-07-29-19-58-13";

const code = fs.readFileSync(path.join(WS, "督学工作台/politics_data.js"), "utf8");
const window = {};
const sandbox = { window };
const vm = require("vm");
vm.createContext(sandbox);
vm.runInContext(code, sandbox);
const P = window.POLITICS;

const pool = (P.mcqPool || []).slice();

// 去重：以"题干+选项"指纹
const seen = new Map();
for (const it of pool) {
  const finger = (it.q || "") + "|" + (it.options || []).join("");
  if (!seen.has(finger)) seen.set(finger, it);
}
const items = [...seen.values()];

// 题型分布
const singles = items.filter(i => i.type !== "multi");
const multis = items.filter(i => i.type === "multi");

// mulberry32 确定性随机
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 15)) >>> 0) / 4294967296;
  };
}
const rnd = mulberry32(parseInt(DATE, 10));

function sample(arr, n) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, n);
}

const pickSingle = sample(singles, 12);
const pickMulti = sample(multis, 8);

const quiz = [...pickSingle, ...pickMulti];

// 打乱整卷顺序（但保留题型标注）
for (let i = quiz.length - 1; i > 0; i--) {
  const j = Math.floor(rnd() * (i + 1));
  [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
}

function answerToArr(ans) {
  if (Array.isArray(ans)) return ans;
  return String(ans).split("").filter(c => /[A-F]/i.test(c)).map(c => c.toUpperCase());
}
const ABCD = ["A", "B", "C", "D", "E", "F"];

// ===== 卷首说明 =====
let md = "";
md += `# 政治选择题每日抽考（2026-08-22）\n\n`;
md += `> **卷首说明**：本卷为广东专插本政治自动抽考，共 **20 题**（单选 12 + 多选 8），题源来自督学工作台题库（mcqPool）。\n`;
md += `> 覆盖：毛泽东思想、邓小平理论、"三个代表"重要思想、科学发展观、习近平新时代中国特色社会主义思想（含时政/综合）。\n`;
md += `> 建议限时 25 分钟自测，先作答再看【答案与解析】，按题号自行打分。多选少选均不得分。\n\n`;
md += `---\n\n`;

// ===== 题目（不揭晓答案）=====
md += `## 一、自测题（先作答，后看答案）\n\n`;
quiz.forEach((it, idx) => {
  const no = idx + 1;
  const tag = it.type === "multi" ? "【多】" : "【单】";
  md += `**${no}. ${tag}** ${it.q}\n\n`;
  (it.options || []).forEach((opt, oi) => {
    md += `${ABCD[oi]}. ${opt}  \n`;
  });
  md += `\n`;
});

// ===== 答案与解析 =====
md += `---\n\n`;
md += `## 二、答案与解析\n\n`;
const letterMap = { "A": 0, "B": 1, "C": 2, "D": 3, "E": 4, "F": 5 };

quiz.forEach((it, idx) => {
  const no = idx + 1;
  const tag = it.type === "multi" ? "【多】" : "【单】";
  const correct = answerToArr(it.answer);
  const correctStr = correct.join("");
  md += `**${no}. ${tag}** ${it.q}\n\n`;
  md += `**✅ 正确答案：${correctStr}**\n\n`;

  // 逐选项解析
  const oe = it.opt_exp;
  if (Array.isArray(oe) && oe.length >= (it.options || []).length) {
    (it.options || []).forEach((opt, oi) => {
      const L = ABCD[oi];
      const mark = correct.includes(L) ? "✔（正确项）" : "✘（干扰项）";
      md += `- **${L}.** ${opt} — *${mark}* ${oe[oi] || ""}\n`;
    });
  } else if (it.explain) {
    md += `_解析：_ ${it.explain}\n\n`;
  } else {
    md += `_（本题源库暂无详细解析，请对照教材强化记忆。）_\n\n`;
  }
  if (it.kp) md += `\n> 📌 考点：${it.kp}\n`;
  md += `\n`;
});

// 易错预警小结
md += `---\n\n`;
md += `## 三、易错预警 & 自测建议\n\n`;
md += `- 本卷含多选 ${pickMulti.length} 道、单选 ${pickSingle.length} 道，覆盖上述各理论体系，请做完后对照【答案与解析】逐题核分。\n`;
md += `- 多选题注意：少选、错选均不得分，务必审清"符合题意""正确的有"等限定词。\n`;
md += `- 建议将错题对应的「考点」摘入错题本，结合 framework 知识框架二刷三刷。\n`;

fs.mkdirSync(path.join(WS, "政治每日抽考"), { recursive: true });
fs.writeFileSync(path.join(WS, OUT), md, "utf8");

console.log("题库去重后:", items.length, "| 单选池:", singles.length, "多选池:", multis.length);
console.log("已抽取: 单", pickSingle.length, "+ 多", pickMulti.length, "= 20");
console.log("输出:", OUT);
// 打印答案（供核对）
quiz.forEach((it, i) => {
  process.stdout.write(`Q${i + 1}(${it.type === "multi" ? "多" : "单"})=${answerToArr(it.answer).join("")}  `);
});
console.log("\n");

// 打印每题 kp 标签，便于做覆盖统计
const kpCount = {};
quiz.forEach(it => {
  const t = it.kp || "未标注";
  kpCount[t] = (kpCount[t] || 0) + 1;
});
console.log("kp 分布:", JSON.stringify(kpCount, null, 0));
