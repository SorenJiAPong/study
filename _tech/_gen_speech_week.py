import asyncio, os, edge_tts, json, subprocess, sys

SRC = '_tech/speech_src'
OUT = 'speech'
os.makedirs(OUT, exist_ok=True)
VOICE = 'zh-CN-XiaoxiaoNeural'
RATE = '-12%'   # 放慢，近似温柔
PITCH = '-5Hz'  # 略低音调（edge-tts 要求 Hz 格式）

cfg = json.load(open('_tech/speech_window.json', encoding='utf-8'))
window = set(cfg.get('windowDays', []))

def recycle(path):
    """送回收站（软删除，可还原），失败则回退 PowerShell COM。"""
    try:
        import send2trash
        send2trash.send2trash(path)
        return True
    except Exception as e1:
        try:
            d = os.path.dirname(path)
            f = os.path.basename(path)
            ps = "$sh=New-Object -ComObject Shell.Application; $fo=$sh.NameSpace(%r); $it=$fo.ParseName(%r); $it.InvokeVerb('delete')" % (d, f)
            subprocess.run(['powershell', '-NoProfile', '-Command', ps], check=True, capture_output=True, timeout=30)
            return True
        except Exception as e2:
            print('recycle FAILED', path, '| send2trash:', e1, '| ps:', e2)
            return False

async def gen(dn):
    fn = os.path.join(SRC, f'day{dn:02d}.txt')
    out = os.path.join(OUT, f'day{dn:02d}.mp3')
    if not os.path.exists(fn):
        print('skip missing', fn)
        return
    text = open(fn, encoding='utf-8').read().strip()
    if not text:
        print('skip empty', fn)
        return
    comm = edge_tts.Communicate(text, VOICE, rate=RATE, pitch=PITCH)
    with open(out, 'wb') as f:
        async for c in comm.stream():
            if c['type'] == 'audio':
                f.write(c['data'])
    print('OK', out, os.path.getsize(out), 'bytes')

async def main():
    for dn in sorted(window):
        await gen(dn)
    # 删除窗口外的旧 MP3（送回收站，不永久销毁）
    deleted = []
    for f in os.listdir(OUT):
        if f.startswith('day') and f.endswith('.mp3'):
            try:
                dn = int(f[3:5])
            except Exception:
                continue
            if dn not in window:
                path = os.path.abspath(os.path.join(OUT, f))
                if recycle(path):
                    deleted.append(f)
    print('DELETED_OLD', deleted)

asyncio.run(main())
