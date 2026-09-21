// 政治选择题每日抽考生成器 - 2026-09-10
// 确定性：以 DATE 数字为 mulberry32 种子，跨天新鲜、当天稳定。
const fs = require("fs");
const path = require("path");

const DATE = "20260910";
const OUT = "F:/wokebuddy创造/2026-07-29-19-58-13/政治每日抽考/每日抽考_2026-09-10.md";
const N_SINGLE = 12, N_MULTI = 8;

// --- 读取题库 ---
const SRC = "F:/wokebuddy创造/2026-07-29-19-58-13/督学工作台/politics_data.js";
let s = fs.readFileSync(SRC, "utf8");
const a = s.indexOf("{"); const b = s.lastIndexOf("}");
const P = JSON.parse(s.slice(a, b + 1));
const pool = P.mcqPool || [];
console.log("mcqPool 原始条数:", pool.length);

// --- 按"题干+选项"指纹去重 ---
const seen = new Set();
const uniq = [];
for (const q of pool) {
  const fp = q.q + "||" + (q.options || []).join("|");
  if (seen.has(fp)) continue;
  seen.add(fp); uniq.push(q);
}
console.log("去重后:", uniq.length);

const multis = uniq.filter(q => q.type === "multi");
const singlePool = uniq.filter(q => q.type !== "multi");
console.log("single 池:", singlePool.length, " multi 池:", multis.length);

// --- 确定性随机 ---
function mulberry32(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const seedNum = parseInt(DATE, 10);
const rnd = mulberry32(seedNum);

function sample(arr, n) {
  const availIdx = arr.map((_, i) => i);
  const picked = [];
  while (picked.length < n && availIdx.length) {
    const r = Math.floor(rnd() * availIdx.length);
    picked.push(arr[availIdx[r]]);
    availIdx.splice(r, 1);
  }
  return picked;
}

const chosenMulti = sample(multis, N_MULTI);
const chosenSingle = sample(singlePool, N_SINGLE);

// answer 解析
function answerToArr(ans) {
  if (Array.isArray(ans)) return ans.map(x => String(x).trim().toUpperCase()).filter(x => /^[A-F]$/.test(x));
  return String(ans).split("").filter(c => /[A-F]/.test(c)).map(c => c.toUpperCase());
}

// 校验
let allValid = true;
for (const q of [...chosenSingle, ...chosenMulti]) {
  const arr = answerToArr(q.answer);
  if (arr.length === 0) { allValid = false; console.log("⚠️ 非法 answer:", q.q.slice(0, 20), q.answer); }
}

// 合并并编号（单选在前 1-12，多选 13-20）
const order = [...chosenSingle, ...chosenMulti];

function optLetter(i) { return String.fromCharCode(65 + i); }

// --- Markdown 生成 ---
let out = [];
out.push(`# 政治选择题每日抽考 · ${DATE.slice(0,4)}-${DATE.slice(4,6)}-${DATE.slice(6,8)}`);
out.push("");
out.push("## 一、卷首说明");
out.push("");
out.push(`今日 20 道选择题自测，覆盖 **毛泽东思想 / 邓小平理论 /"三个代表"重要思想 / 科学发展观 / 习近平新时代中国特色社会主义思想 / 时政** 等模块。`);
out.push("- 题型：**单选 12 题 + 多选 8 题**。多选题需选出全部正确项，少选、多选、错选均不得分。");
out.push("- 建议限时 **25 分钟**，先作答再对答案。");
out.push("- 评分：单选每题 5 分，多选每题 5 分，满分 100 分。");
out.push("");
out.push("> 📌 先做题，答案与解析见文末「三、答案与解析」。");
out.push("");
out.push("## 二、试题");
out.push("");

order.forEach((q, idx) => {
  const no = idx + 1;
  const isMulti = q.type === "multi";
  const tag = isMulti ? "【多选】" : "【单选】";
  out.push(`**第 ${no} 题 ${tag}** ${q.q}`);
  out.push("");
  (q.options || []).forEach((opt, i) => {
    out.push(`${optLetter(i)}. ${opt}`);
  });
  out.push("");
});

out.push("---");
out.push("");
out.push("## 三、答案与解析");
out.push("");

order.forEach((q, idx) => {
  const no = idx + 1;
  const arr = answerToArr(q.answer);
  const ansStr = arr.join("");
  const isMulti = q.type === "multi";
  const tag = isMulti ? "【多选】" : "【单选】";
  out.push(`### 第 ${no} 题 ${tag} 答案：**${ansStr}**`);
  out.push("");
  if (Array.isArray(q.opt_exp) && q.opt_exp.length === (q.options || []).length) {
    (q.options || []).forEach((opt, i) => {
      const letter = optLetter(i);
      const correct = arr.includes(letter);
      const mark = correct ? "✅ 正确" : "❌ 错误";
      let exp = q.opt_exp[i] || "";
      exp = exp.replace(/^(正确|错误)[。\.：:]*/, "");
      exp = exp.replace(/^[\s：:]+/, "");
      if (!exp) exp = "（源题库未提供该选项详细解析，请回归教材对应考点确认）";
      out.push(`- **${letter}. ${opt}** — ${mark}：${exp.trim()}`);
    });
  } else {
    let exp = (q.explain || "").trim();
    exp = exp.replace(/^【答案】.*?$/m, "").trim();
    out.push(`**解析：** ${exp}`);
  }
  if (q.kp) out.push("");
  if (q.kp) out.push(`> 📎 考点：${q.kp}`);
  out.push("");
});

out.push("---");
out.push("");
out.push("## 四、自测小结");
out.push("");
out.push(`- 本卷由题库 \`politics_data.js\` 的 \`mcqPool\`（${(pool.length)} 题，去重后 ${uniq.length} 题）确定抽取，随机种子 = ${DATE}（当天稳定、跨天新鲜）。`);
out.push(`- 程序已自动校验 20 题 \`answer\` 字段均合法：${allValid ? "**无转录笔误预警**" : "**存在非法答案，请人工复核**"}。`);
out.push(`- 备考提示：多选题是拿分关键也是失分重灾区，务必对照「为什么错」逐条消化易混项；建议错题回归纸质教材对应章节二刷。`);

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, out.join("\n"), "utf8");
console.log("✅ 已写出:", OUT);
console.log("单选:", chosenSingle.length, " 多选:", chosenMulti.length, " 校验通过:", allValid);
const sets = {};
[...chosenSingle, ...chosenMulti].forEach(q => {
  const k = q.kp ? q.kp.replace(/【(.*?)】.*/, "$1") : "未分类";
  sets[k] = (sets[k] || 0) + 1;
});
console.log("考点大类分布:", JSON.stringify(sets, null, 0));
