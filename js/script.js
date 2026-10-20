// 가운데 카드 + 양옆 미리보기 캐러셀
const slides = [...document.querySelectorAll('.slide')];
const dotsBox = document.querySelector('.dots');
const playBtn = document.querySelector('.play');
const n = slides.length;
let cur = 0, timer = null;

const dots = slides.map((_, i) => {
  const b = document.createElement('button');
  b.type = 'button';
  b.setAttribute('aria-label', `${i + 1}번 슬라이드`);
  b.addEventListener('click', () => { go(i); restart(); });
  dotsBox.appendChild(b);
  return b;
});

function go(i){
  cur = (i + n) % n;
  slides.forEach((s, k) => {
    let off = ((k - cur) % n + n) % n;   // 0..n-1
    if (off > n / 2) off -= n;           // 왼쪽은 음수
    s.style.setProperty('--off', off);
    s.classList.toggle('on', off === 0);
    s.classList.toggle('far', Math.abs(off) > 1);
    s.tabIndex = off === 0 ? 0 : -1;
  });
  dots.forEach((d, k) => d.classList.toggle('on', k === cur));
}

function start(){ timer = setInterval(() => go(cur + 1), 4000); playBtn.textContent = '❚❚'; playBtn.setAttribute('aria-label', '자동 재생 멈춤'); }
function stop(){ clearInterval(timer); timer = null; playBtn.textContent = '▶'; playBtn.setAttribute('aria-label', '자동 재생 시작'); }
function restart(){ if (timer){ stop(); start(); } }

// 양옆 카드를 누르면 그 카드로 이동
slides.forEach((s, k) => s.addEventListener('click', e => {
  if (!s.classList.contains('on')){ e.preventDefault(); go(k); restart(); }
}));
playBtn.addEventListener('click', () => timer ? stop() : start());

go(0);
if (matchMedia('(prefers-reduced-motion: reduce)').matches) stop(); else start();
