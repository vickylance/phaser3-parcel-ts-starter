import Phaser from 'phaser';
import { CST } from '../constants';
import MainGame from './MainGame';

class MainMenu extends Phaser.Scene {
  constructor() {
    super({ key: CST.SCENES.MENU });
  }

  /**
   * create
   */
  public create() {
    console.log('Hello from Main Menu');
    this.scene.add(CST.SCENES.GAME, MainGame, false);
    this.scene.start(CST.SCENES.GAME);
  }
}

export default MainMenu;
