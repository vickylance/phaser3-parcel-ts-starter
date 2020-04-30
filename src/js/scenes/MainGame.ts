import { Scene, GameObjects, Actions, Geom, Types } from 'phaser';
import { CST } from '../constants';
import Images from '../images';

class MainGame extends Scene {
  public playerSpeed: number;
  public enemyMaxY: number;
  public enemyMinY: number;
  public highScore: number;
  public isPlayerAlive: boolean;
  public player: GameObjects.Sprite;
  public treasure: GameObjects.Sprite;
  public enemies: GameObjects.Group;

  constructor() {
    super({ key: CST.SCENES.GAME });
  }

  /**
   * init
   */
  public init() {
    this.playerSpeed = 1.5;
    this.enemyMaxY = 280;
    this.enemyMinY = 80;
    // player is alive
    this.isPlayerAlive = true;
  }

  /**
   * preload
   */
  public preload() {
    // load images
    this.load.image('background', Images.background);
    this.load.image('dragon', Images.dragon);
    this.load.image('player', Images.player);
    this.load.image('treasure', Images.treasure);
  }

  /**
   * create
   */
  public create() {
    const height = this.sys.game.config.height;
    const width = this.sys.game.config.width;
    const bg = this.add.sprite(0, 0, 'background');
    bg.setOrigin(0, 0);
    // player
    this.player = this.add.sprite(40, (height as number) / 2, 'player');
    this.player.setScale(0.5);

    // group of enemies
    this.enemies = this.add.group({
      key: 'dragon',
      repeat: 5,
      setXY: {
        x: 110,
        y: 100,
        stepX: 80,
        stepY: 20,
      },
    } as Types.GameObjects.Group.GroupCreateConfig);
    // scale enemies
    Actions.ScaleXY(this.enemies.getChildren(), -0.5, -0.5);
    // set speeds
    Actions.Call(
      this.enemies.getChildren(),
      (enemy) => {
        enemy.speed = Math.random() * 2 + 1;
      },
      this
    );

    // goal
    this.treasure = this.add.sprite(
      (width as number) - 80,
      (height as number) / 2,
      'treasure'
    );
    this.treasure.setScale(0.6);
    this.input.mouse.disableContextMenu();
  }

  /**
   * update
   */
  public update() {
    // only if the player is alive
    if (!this.isPlayerAlive) {
      return;
    }
    if (this.input.activePointer.isDown) {
      this.player.x += this.playerSpeed;
    }

    // treasure collision
    if (
      Geom.Intersects.RectangleToRectangle(
        this.player.getBounds(),
        this.treasure.getBounds()
      )
    ) {
      this.highScore++;
      this.gameOver();
    }

    // enemy movement
    const enemies = this.enemies.getChildren();
    for (const enemy of enemies) {
      // move enemies
      enemy.y += enemy.speed;

      // reverse movement if reached the edges
      if (enemy.y >= this.enemyMaxY && enemy.speed > 0) {
        enemy.speed *= -1;
      } else if (enemy.y <= this.enemyMinY && enemy.speed < 0) {
        enemy.speed *= -1;
      }

      // enemy collision
      if (
        Geom.Intersects.RectangleToRectangle(
          this.player.getBounds(),
          enemy.getBounds()
        )
      ) {
        this.gameOver();
        break;
      }
    }
  }

  private gameOver() {
    // flag to set player is dead
    this.isPlayerAlive = false;

    // shake the camera
    this.cameras.main.shake(500);

    // fade camera
    this.time.delayedCall(
      250,
      () => {
        this.cameras.main.fade(250);
      },
      [],
      this
    );

    // restart game
    this.time.delayedCall(
      500,
      () => {
        this.scene.restart();
      },
      [],
      this
    );
  }
}

export default MainGame;
