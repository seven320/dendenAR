// マーカーの周りを回るリンク一覧。url が空のものは表示しない
const LINKS = [
  { id: 'twitter', url: 'https://twitter.com/yosyuaomenww', color: '#00aced' },
  { id: 'github', url: 'https://github.com/seven320', color: '#171515' },
  { id: 'blog', url: 'https://denden-seven.hatenablog.com/', color: 'blue' },
  { id: 'instagram', url: 'https://www.instagram.com/ken_4y4', color: '#3f729b' },
  { id: 'profile', url: 'https://denden.app/', color: 'white' },
];

const SPIN = 'property: rotation; to: 0 -360 0; loop: true; dur: 30000; easing: linear';
const TAP = 'property: scale; from: 1.3 1.3 1.3; to: 1 1 1; dur: 300; easing: easeOutQuad; startEvents: tapped';

function createEl(tag, attrs = {}) {
  const el = document.createElement(tag);
  for (const [name, value] of Object.entries(attrs)) {
    el.setAttribute(name, value);
  }
  return el;
}

// クリック（タップ）されたら url を新しいタブで開く。連打で何枚も開かないよう間隔をあける
AFRAME.registerComponent('open-link', {
  schema: { type: 'string' },
  init() {
    let lastOpened = 0;
    // 見失ったマーカーも当たり判定は残るので、表示中のときだけ反応する
    const marker = this.el.closest('a-marker');
    this.el.addEventListener('click', () => {
      if (marker && !marker.object3D.visible) return;
      const now = Date.now();
      if (now - lastOpened < 1000) return;
      lastOpened = now;
      this.el.emit('tapped', null, false);
      window.open(this.data, '_blank', 'noopener');
    });
  },
});

// マーカーの検出状態に合わせて、カードの出現アニメーションと画面下の案内を切り替える
AFRAME.registerComponent('ar-feedback', {
  schema: {
    content: { type: 'selector' },
    status: { type: 'selector' },
    // 一瞬見失っただけで案内や演出がチラつかないよう、この時間（ms）は待つ
    lostDelay: { type: 'number', default: 800 },
  },
  init() {
    let lostTimer = null;
    let lost = true;

    const showStatus = (text) => {
      this.data.status.textContent = text;
      this.data.status.classList.remove('hidden');
    };

    window.addEventListener('arjs-video-loaded', () => {
      showStatus('カードをカメラにかざしてください');
    });
    window.addEventListener('camera-error', () => {
      showStatus('カメラを使えません。ブラウザのカメラ許可を確認してください');
    });

    this.el.addEventListener('markerFound', () => {
      clearTimeout(lostTimer);
      this.data.status.classList.add('hidden');
      if (lost) {
        lost = false;
        this.data.content.emit('reveal', null, false);
      }
    });
    this.el.addEventListener('markerLost', () => {
      lostTimer = setTimeout(() => {
        lost = true;
        showStatus('カードをカメラにかざしてください');
      }, this.data.lostDelay);
    });
  },
});

// LINKS を円周上に等間隔で並べる
AFRAME.registerComponent('link-ring', {
  schema: { radius: { type: 'number', default: 1.6 } },
  init() {
    const links = LINKS.filter((link) => link.url);
    const r = this.data.radius;
    const step = (2 * Math.PI) / links.length;

    links.forEach((link, i) => {
      const angle = step * i;
      const x = r * Math.cos(angle);
      const z = r * Math.sin(angle);
      // 中心から隣との中間までの扇形をタップ判定にする（透明な三角形）
      const vertex = (a) => `${10 * r * Math.cos(a)} 0.1 ${10 * r * Math.sin(a)}`;

      const item = createEl('a-entity', {
        position: `${x} 0.05 ${z}`,
        'open-link': link.url,
        animation__tap: TAP,
      });

      const spinner = createEl('a-entity', { animation: SPIN });
      spinner.appendChild(createEl('a-image', {
        src: `#${link.id}`,
        rotation: '-90 0 0',
        width: 0.55,
        height: 0.55,
        opacity: 0.9,
        class: 'clickable',
      }));

      const sphere = createEl('a-sphere', {
        color: link.color,
        radius: 0.55,
        opacity: 0.4,
        class: 'clickable',
      });
      sphere.appendChild(createEl('a-triangle', {
        'vertex-a': vertex(angle - step / 2),
        'vertex-b': `${-x} 0.1 ${-z}`,
        'vertex-c': vertex(angle + step / 2),
        opacity: 0,
        class: 'clickable',
      }));

      item.append(spinner, sphere);
      this.el.appendChild(item);
    });
  },
});
