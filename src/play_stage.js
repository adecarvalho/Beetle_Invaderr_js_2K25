import { ScoreManager } from '../lib/ezLib.js';
import { theGame, theMusicPlayer } from './main.js';
import { WindowFadeOut } from '../lib/fade.js';
import { Ship } from './ship.js';
import { Matrice } from './matrice.js';
import { Space } from './space.js';
import { ConcluStage } from './conclu_stage.js';
//
export class PlayStage {
  //
  constructor(screenWidth, screenHeight) {

    this.screenWidth = screenWidth;

    this.screenHeight = screenHeight;

    this.assetManager = theGame.getAssetManager();

    this.inputManager = theGame.getInputManager();

    this.space = new Space(screenWidth, screenHeight);

    this.score = new ScoreManager(screenWidth, screenHeight, "Beetle");
    this.score.setLabelsColor("GOLD");

    this.ship = new Ship(screenWidth, screenHeight, screenWidth / 2, screenHeight - 120);
    //
    this.matrix = new Matrice(0, 0, screenWidth, screenHeight);
    //
    this.handler = null;
    //
    this.fadeout = new WindowFadeOut(screenWidth, screenHeight);
  }
  //
  onEnter(datas) {
    //
    if (datas) {
      this.score.setName(datas.name);
      this.score.reset();
    }
    //
    this.handler = setTimeout(() => {
      this.assetManager.playSound('newgame');
      theMusicPlayer.play('./assets/musics/alliance.mp3', 0.4, false);
    }, 10);
    //
    this.fadeout.start(500);
  }
  //
  onExit() {
    theMusicPlayer.stop();
    //
    if (this.handler != null) {
      clearInterval(this.handler);
    }
  }
  //
  input() {
    //move ship
    if (this.inputManager.isKeyPressed('ArrowLeft')) {
      this.ship.move(Ship.DIRECTION_LEFT);
    }
    //
    if (this.inputManager.isKeyPressed('ArrowRight')) {
      this.ship.move(Ship.DIRECTION_RIGHT);
    }
    //
    if (this.inputManager.isKeyReleased('ArrowLeft') || this.inputManager.isKeyReleased('ArrowRight')) {
      this.ship.stop();
    }

    //fire laser
    if (this.inputManager.isKeyPressed('Space')) {
      this.ship.fire();
      this.assetManager.playSound('slide');
    }
  }
  //
  collisions() {
    //collide matrix with ship
    if (this.matrix.isCollisionWithShip(this.ship, this.score)) {
      this.assetManager.playSound('boomBeetle');
    }
    //collide ship with bomb
    if (this.ship.isCollisionWidthBomb(this.matrix.bomb)) {
      this.assetManager.playSound('lose');
      this.score.decrementsLives(1);
    }
  }
  //
  checkMatrixIsDestroy() {
    if (this.matrix.isAllDestroy()) {
      this.matrix.reset();
    }
  }
  //
  checkIsGameOver() {
    if (this.score.isGameOver()) {
      const datas = {
        name: this.score.getName(),
        points: this.score.getPoints(),

        bestscores: this.score.getBestScore()
      };
      //
      theGame.getStageManager().changeStage(
        new ConcluStage(this.screenWidth, this.screenHeight),
        datas);
    }
  }
  //
  update(dt) {
    //
    if (this.fadeout.isFinished() == false) {
      this.fadeout.update(dt);
      return;
    }
    //
    this.input();

    this.space.update(dt);

    this.score.update(dt);

    this.ship.update(dt);

    this.matrix.update(dt);

    this.collisions();

    this.checkMatrixIsDestroy();

    this.checkIsGameOver();
  }
  //
  render(ctx) {
    this.space.render(ctx);
    //
    this.matrix.render(ctx);
    //
    this.ship.render(ctx);
    //
    this.score.render(ctx);
    //
    if (this.fadeout.isFinished() == false) {
      this.fadeout.render(ctx);
    }
  }
}
//end class