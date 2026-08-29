Page({
  build() {
    const W = 480;
    const WHITE = 0xFFFFFF;
    const BLUE = 0x2F80ED;
    const GREEN = 0x00D084;
    const ORANGE = 0xFF9800;

    function addText(text, y, size, color) {
      hmUI.createWidget(hmUI.widget.TEXT, {
        x: 40,
        y,
        w: 400,
        h: 90,
        text,
        text_size: size,
        color,
        align_h: hmUI.align.CENTER_H,
        text_style: hmUI.text_style.WRAP,
      });
    }

    addText('FlowDiag for Balance 3', 45, 30, BLUE);

    let names = [];
    let err = -999;
    try {
      const r = hmFS.readdir('/storage/js_apps/data');
      if (Array.isArray(r)) {
        if (Array.isArray(r[0])) {
          names = r[0] || [];
          err = r[1];
        } else {
          names = r;
          err = 0;
        }
      }
    } catch (e) {
      addText('readdir error: ' + e, 120, 22, ORANGE);
      return;
    }

    const hits = [];
    for (let i = 0; i < names.length; i++) {
      const id = String(names[i]);
      try {
        const path = '/storage/js_apps/data/' + id + '/flex_set.txt';
        const st = hmFS.stat(path);
        let ok = false;
        if (Array.isArray(st)) {
          ok = st[1] === 0;
        } else {
          ok = !!st;
        }
        if (ok) hits.push(id);
      } catch (e) {}
    }

    if (hits.length) {
      addText('FOUND flex_set.txt', 120, 26, GREEN);
      addText(hits.join('\n'), 185, 30, WHITE);
    } else {
      addText('No flex_set.txt found', 120, 26, ORANGE);
      addText('folders=' + names.length + ' err=' + err, 190, 22, WHITE);
      addText(names.slice(0, 8).join('\n'), 245, 20, WHITE);
    }
  }
})
