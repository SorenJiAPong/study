# 每周重生成政治晓晓温柔语音 — 执行记录

## 任务概要
每周一滚动重生成政治「必背记忆」晓晓·温柔版 MP3，只保留当前一周窗口（约 7 天），窗口外旧 MP3 送回收站。

固定三步：
1. `node _tech/_extract_speech_week.js` → 算 curDay + 7 天窗口，写 `_tech/speech_src/dayNN.txt` 与 `_tech/speech_window.json`
2. `(edge venv) python _tech/_gen_speech_week.py` → 生成 `speech/dayNN.mp3`（zh-CN-XiaoxiaoNeural, rate -12%, pitch -5Hz），回收窗口外旧文件
3. `git add -A && commit && push origin main`

## 执行历史

### 2026-08-23（首次自动化执行）
- 状态：✅ 全部成功
- curDay=17，窗口 [16–22]（计划起始日 2026-08-07）
- 生成 7 个 MP3：day16–day22（约 2.5–4.6 MB / 个，合计 ~23 MB）
- 回收旧文件：day01–day07.mp3（上一轮 8/8 生成的窗口，已送回收站，可还原）
- 推送：`a03a84a..cfe0670 main -> main`（SorenJiAPong/study）
- 耗时：TTS 生成约 5 分钟（7 篇，每篇约 1700–3200 字）

## 注意事项 / 经验
- TTS 步骤耗时约 5 分钟，应放后台执行并等待完成，不要用短超时前台跑。
- 窗口算法：`endD = min(total, curDay+5)`，`startD = endD-6`，即包含今天及后 5 天、前 1 天。
- 删除走 `send2trash`，失败回退 PowerShell Shell.Application COM 送回收站；**不得**永久删除。
- 若 edge-tts 报网络错误（连不上微软 TTS 服务器），必须立即停止，不提交不推送。
