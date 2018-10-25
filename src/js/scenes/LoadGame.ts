import Phaser from 'phaser';
import { CST } from '../constants';
import MainMenu from './MainMenu';

class LoadGame extends Phaser.Scene {
  constructor() {
    super({ key: CST.SCENES.LOAD });
  }

  /**
   * create
   */
  public create() {
    console.log('Hello from Loading Scene');
    this.scene.add(CST.SCENES.MENU, MainMenu);
    this.scene.start(CST.SCENES.MENU);
  }
}

export default LoadGame;
