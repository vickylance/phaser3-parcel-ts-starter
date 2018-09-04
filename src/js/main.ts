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
  console.log(Images);
  this.load.image('background', Images['background']);
  this.load.image('dragon', Images['dragon']);
  this.load.image('player', Images['player']);
  this.load.image('treasure', Images['treasure']);
  // this.game.scale.pageAlignHorizontally = true;
  // this.game.scale.pageAlignVertically = true;
  // this.game.scale.refresh();
};

gameScene.create = function() {
  let bg = this.add.sprite(0, 0, 'background');
  bg.setOrigin(0,0);
  // player
  this.player = this.add.sprite(40, this.sys.game.config.height / 2, 'player');
 
  // scale down
  this.player.setScale(0.5);

  // this.add.sprite(0, 0, 'dragon');
  // this.add.sprite(0, 0, 'treasure');
};

new Game({
  width: 640,
  height: 360,
  type: Phaser.AUTO,
  scene: gameScene,
  title: 'Treasure Hunt'
});
