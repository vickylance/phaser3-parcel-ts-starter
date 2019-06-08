import { Scene } from 'phaser';
import { CST } from '../constants';
import MainMenu from './MainMenu';

class LoadGame extends Scene {
  constructor() {
    super({ key: CST.SCENES.LOAD });
  }

  /**
   * create
   */
  public create() {
    console.log('Hello from Loading Scene');
    this.scene.add(CST.SCENES.MENU, MainMenu, false);
    this.scene.start(CST.SCENES.MENU);
  }
}

export default LoadGame;
