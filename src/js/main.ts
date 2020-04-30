import { Game } from 'phaser';
import LoadGame from './scenes/LoadGame';

const game = new Game({
  width: 640,
  height: 360,
  type: Phaser.WEBGL,
  disableContextMenu: true,
  scene: [LoadGame],
  title: 'Treasure Hunt',
  parent: 'game',
});

function resize() {
  const canvas: HTMLCanvasElement = document.querySelector('canvas');
  const windowWidth: number = window.innerWidth;
  const windowHeight: number = window.innerHeight;
  const windowRatio: number = windowWidth / windowHeight;
  const gameRatio: number = game.config.width / game.config.height;

  if (windowRatio < gameRatio) {
    canvas.style.width = windowWidth + 'px';
    canvas.style.height = windowWidth / gameRatio + 'px';
  } else {
    canvas.style.width = windowHeight * gameRatio + 'px';
    canvas.style.height = windowHeight + 'px';
  }
}

window.onload = () => {
  resize();
  window.addEventListener('resize', resize, false);
};

// This is for preventing re-run multiple scenes
if (module.hot) {
  module.hot.dispose(() => {
    window.location.reload();
  });
}
