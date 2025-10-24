const tickerMessages = [
  '🎉 Игрок LuckyFox выиграл 1200₽ в Fruit Spin!',
  '💎 User_234 сорвал 800₽ в Crystal Slots!',
  '🔥 NeoStar удвоил ставку в BlackJack Neo!',
  '🎲 Мега-раунд Рулетки начнётся через 60 секунд!',
  '🏆 Player_102 занял первое место в Neo Tournament!'
];

const activityMessages = [
  'Player_102 сделал ставку 300₽',
  'User_234 сделал ставку 500₽',
  'LuckyFox выиграл 1200₽',
  'MiraX сделал ставку 900₽',
  'NeoHunter сорвал 1500₽',
  'StarRise сделал ставку 450₽'
];

const tickerContainer = document.getElementById('live-ticker');
const activityFeed = document.getElementById('activity-feed');
const switcherButtons = document.querySelectorAll('.switcher__btn');
const gameCards = document.querySelectorAll('.game-card');
const themeToggle = document.getElementById('theme-toggle');

function renderTicker() {
  if (!tickerContainer) return;
  tickerContainer.innerHTML = '';
  tickerMessages.forEach((message, index) => {
    const span = document.createElement('span');
    span.className = 'live-ticker__message';
    span.style.animationDelay = `${index * 1.2}s`;
    span.textContent = message;
    tickerContainer.appendChild(span);
  });
}

function startTickerPulse() {
  if (!tickerContainer) return;
  setInterval(() => {
    const randomMessage = tickerMessages[Math.floor(Math.random() * tickerMessages.length)];
    const span = document.createElement('span');
    span.className = 'live-ticker__message live-ticker__message--glow';
    span.textContent = randomMessage;
    tickerContainer.appendChild(span);
    if (tickerContainer.children.length > 12) {
      tickerContainer.removeChild(tickerContainer.firstChild);
    }
  }, 4000);
}

function startActivityFeed() {
  if (!activityFeed) return;
  setInterval(() => {
    const li = document.createElement('li');
    li.textContent = activityMessages[Math.floor(Math.random() * activityMessages.length)];
    li.className = 'activity-feed__item activity-feed__item--glow';
    activityFeed.prepend(li);
    const items = activityFeed.querySelectorAll('li');
    if (items.length > 6) {
      activityFeed.removeChild(activityFeed.lastChild);
    }
  }, 5000);
}

function filterGames(mode) {
  gameCards.forEach((card) => {
    const isVisible = card.dataset.type === mode;
    card.style.display = isVisible ? 'flex' : 'none';
  });
}

function initSwitcher() {
  if (!switcherButtons.length) return;
  switcherButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.mode;
      switcherButtons.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      filterGames(mode);
    });
  });
  const activeButton = document.querySelector('.switcher__btn.is-active');
  if (activeButton) {
    filterGames(activeButton.dataset.mode);
  }
}

function initThemeToggle() {
  if (!themeToggle) return;
  themeToggle.addEventListener('change', () => {
    document.body.classList.toggle('page--dark', themeToggle.checked);
  });
}

function initTicker() {
  if (!tickerContainer) return;
  renderTicker();
  startTickerPulse();
}

function initActivity() {
  if (!activityFeed) return;
  startActivityFeed();
}

initTicker();
initActivity();
initSwitcher();
initThemeToggle();
