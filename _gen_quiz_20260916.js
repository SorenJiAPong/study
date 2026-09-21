const fs = require("fs");
const vm = require("vm");

const FILE = "politics_data.js";
const DATE = process.env.QDATE || "20260916"; // YYYYMMDD
const OUT = process.env.QOUT || "政治每日抽考/每日抽考_2026-09-16.md";

// 1) load source
const src = fs.readFileSync(FILE, "utf8");

// 2) provide a window global and run the file
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(src, sandbox);
const P = sandbox.window.POLITICS;

if (!P || !P.mcqPool) {
  console.error("NO_POLITICS");
  process.exit(2);
}

const pool = P.mcqPool;
console.error("mcqPool total:", pool.length);

// categorize
const singles = pool.filter(q => q.type !== "multi");
const multis = pool.filter(q => q.type === "multi");
console.error("single:", singles.length, "multi:", multis.length);

// fingerprint dedup
const seen = new Set();
const uniq = pool.filter(q => {
  const fp = (q.question + "|" + (q.options ? q.options.join("|") : ""));
  if (seen.has(fp)) return false;
  seen.add(fp);
  return true;
});
console.error("unique:", uniq.length);

// ---- deterministic sampler (mulberry32) ----
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const seed = parseInt(DATE, 10);
const rng = mulberry32(seed);

function draw(arr, n) {
  const copy = arr.slice();
  // Fisher-Yates with seeded rng
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}

const chosenSingle = draw(singles, 12);
const chosenMulti = draw(multis, 8);
const chosen = [...chosenSingle, ...chosenMulti];

// shuffle final order keeping rng state consistent enough
const final = chosen.slice();
for (let i = final.length - 1; i > 0; i--) {
  const j = Math.floor(rng() * (i + 1));
  [final[i], final[j]] = [final[j], final[i]];
}

function answerToArr(ans) {
  if (!ans) return [];
  if (Array.isArray(ans)) return ans;
  return String(ans).split("").filter(c => /[A-F]/.test(c));
}

function clean(s) {
  if (!s) return "";
  return String(s).replace(/^[\s:：]+/, "").trim();
}

function letterOf(i) { return String.fromCharCode(65 + i); }

// question text lives in q.q
function qtext(q) { return (q.q || q.question || q.stem || q.title || "").toString().trim(); }

// options may or may not carry a letter prefix; normalize to "A. xxx"
function normOpts(opts) {
  if (!opts) return [];
  return opts.map((o, i) => {
    const s = String(o).trim();
    if (/^[A-Fa-f][\.\、\s]/.test(s)) return s;
    return letterOf(i) + ". " + s;
  });
}

// ---- build markdown ----
let md = "";
const today = "2026-09-16";
md += `# 政治选择题每日抽考（第 20 题卷）\n\n`;
md += `> **卷首说明**：本卷共 20 题（单选 12 + 多选 8），题源为工作区 \`督学工作台/politics_data.js\` 的 \`window.POLITICS.mcqPool\`（共 ${pool.length} 题，去重后 ${uniq.length} 题）。\n`;
md += `> 覆盖：毛泽东思想、邓小平理论、"三个代表"重要思想、科学发展观、习近平新时代中国特色社会主义思想（含时政/中国式现代化/总体国家安全观等），保证每日新鲜感。\n`;
md += `> 多选题已用【多】标注，其余为单选。**先作答，再翻到文末看答案与解析。**\n\n`;

md += `## 一、选择题（先自测，再对答案）\n\n`;
final.forEach((q, i) => {
  const no = i + 1;
  const isMulti = q.type === "multi";
  md += `**${no}.** ${qtext(q)}${isMulti ? " 【多】" : ""}\n`;
  const opts = normOpts(q.options);
  opts.forEach(o => {
    md += `- ${o}\n`;
  });
  md += `\n`;
});

md += `## 二、答案与解析\n\n`;
final.forEach((q, i) => {
  const no = i + 1;
  const isMulti = q.type === "multi";
  const ansArr = answerToArr(q.answer);
  const ansStr = ansArr.join("");
  md += `**${no}.** 【答案】${isMulti ? "（多选）" : ""} **${ansStr}**\n`;
  md += `\n*题干*：${qtext(q)}\n`;

  // option-level explanation
  const opts = normOpts(q.options);
  const optExp = q.opt_exp || q.optExp;
  let hasOptExp = false;
  if (Array.isArray(optExp) && optExp.length) {
    opts.forEach((o, idx) => {
      const exp = optExp[idx];
      if (exp) {
        hasOptExp = true;
        const letter = letterOf(idx);
        const correct = ansArr.includes(letter);
        md += `- ${o} —— ${correct ? "✅ 正确项。" : "❌ 干扰项。"} ${clean(exp)}\n`;
      }
    });
  } else if (optExp && typeof optExp === "object") {
    opts.forEach((o) => {
      const letter = String(o).trim().charAt(0);
      const exp = optExp[letter];
      if (exp) {
        hasOptExp = true;
        const correct = ansArr.includes(letter);
        md += `- ${o} —— ${correct ? "✅ 正确项。" : "❌ 干扰项。"} ${clean(exp)}\n`;
      }
    });
  }

  if (!hasOptExp) {
    // fall back to explain
    const ex = q.explain || q.parse || "";
    if (ex) {
      md += `\n_解析_：${clean(ex)}\n`;
    } else {
      md += `\n_解析_：（源题库未提供逐选项解析，按答案选 ${ansStr}）\n`;
    }
  }

  // kp tip
  const kp = q.kp || q.kp_tip || q.tip;
  if (kp) {
    md += `\n💡 考点：${clean(kp)}\n`;
  }
  md += `\n---\n\n`;
});

fs.writeFileSync(OUT, md, "utf8");
console.error("WROTE", OUT, "bytes=", md.length);
console.error("chosen:", final.map((q,i)=>`${i+1}:${(q.type==="multi"?"多":"单")}:${(q.answer||"").toString()}`).join(" "));
