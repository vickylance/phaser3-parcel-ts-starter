import Phaser from 'phaser';
import { CST } from "../constants";
import FlappyGame from "./FlappyGame";
import MainGame from "./MainGame";

class MainMenu extends Phaser.Scene {
  constructor() {
    super({ key: CST.SCENES.MENU });
  }

  /**
   * create
   */
  public create() {
    console.log("Hello from Main Menu");
    // this.scene.add(CST.SCENES.GAME, MainGame);
    // this.scene.start(CST.SCENES.GAME);
    this.scene.add(CST.SCENES.FLAPPY, FlappyGame);
    this.scene.start(CST.SCENES.FLAPPY);
  }
}

export default MainMenu;
