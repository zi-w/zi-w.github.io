import struct

def get_png_size(path):
    with open(path, 'rb') as f:
        data = f.read(30)
        if data[:8] == b'\x89PNG\r\n\x1a\n':
            w, h = struct.unpack('>ii', data[16:24])
            return w, h
    return None

for name in ["questbench.png", "q4a.png", "default.png"]:
    size = get_png_size(f"/Users/wangzi/code/zi-w.github.io/images/pub/{name}")
    print(f"{name}: {size}")
