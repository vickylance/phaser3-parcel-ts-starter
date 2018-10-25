import { Game } from 'phaser';
import Images from '../../assets/**/*.png';

let gameScene = new Phaser.Scene('Game');

let keyList = [];
function _iterate(obj, stack) {
  for (let property in obj) {
    if (obj.hasOwnProperty(property)) {
      if (typeof obj[property] == 'object') {
        _iterate(obj[property], stack + '.' + property);
      } else {
        let keys = {};
        keys[property] = obj[property];
        keyList.push(keys);
      }
    }
  }
  return keyList;
}

Images = Object.assign(..._iterate(Images, ''));

gameScene.preload = function() {
  // load images
  this.load.image('background', Images['background']);
  this.load.image('dragon', Images['dragon']);
  this.load.image('player', Images['player']);
  this.load.image('treasure', Images['treasure']);
};

gameScene.create = function() {
  let bg = this.add.sprite(0, 0, 'background');
  bg.setOrigin(0, 0);
  // player
  this.player = this.add.sprite(40, this.sys.game.config.height / 2, 'player');

  // scale down
  this.player.setScale(0.5);

  // this.add.sprite(0, 0, 'dragon');
  // this.add.sprite(0, 0, 'treasure');
};

let game = new Game({
  width: 640,
  height: 360,
  type: Phaser.AUTO,
  scene: gameScene,
  title: 'Treasure Hunt'
});

function resize() {
  var canvas = document.querySelector('canvas');
  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;
  var windowRatio = windowWidth / windowHeight;
  var gameRatio = game.config.width / game.config.height;

  if (windowRatio < gameRatio) {
    canvas.style.width = windowWidth + 'px';
    canvas.style.height = windowWidth / gameRatio + 'px';
  } else {
    canvas.style.width = windowHeight * gameRatio + 'px';
    canvas.style.height = windowHeight + 'px';
  }
}
window.onload = function() {
  resize();
  window.addEventListener('resize', resize, false);
};

// This is for preventing re-run multiple scenes
if (module.hot) {
  module.hot.dispose(() => {
    window.location.reload();
  });
}
