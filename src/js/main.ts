import { Game } from "phaser";
import Images from "../../assets/**/*.png";

let gameScene = new Phaser.Scene("Game");

let keyList = [];
function _iterate(obj, stack) {
  for (let property in obj) {
    if (obj.hasOwnProperty(property)) {
      if (typeof obj[property] == "object") {
        _iterate(obj[property], stack + "." + property);
      } else {
        let keys = {};
        keys[property] = obj[property];
        keyList.push(keys);
      }
    }
  }
  return keyList;
}

Images = Object.assign(..._iterate(Images, ""));

gameScene.preload = function() {
  // load images
  console.log(Images);
  this.load.image("background", Images["background"]);
  this.load.image("dragon", Images["dragon"]);
  this.load.image("player", Images["player"]);
  this.load.image("treasure", Images["treasure"]);
};

gameScene.create = function() {
  this.add.sprite(0, 0, "background");
  this.add.sprite(0, 0, "dragon");
  this.add.sprite(0, 0, "player");
  this.add.sprite(0, 0, "treasure");
};

new Game({
  width: 800,
  height: 600,
  type: Phaser.AUTO,
  scene: gameScene
});
