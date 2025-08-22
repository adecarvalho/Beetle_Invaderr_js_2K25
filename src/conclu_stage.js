import { Label, getRandomFloat } from '../lib/ezLib.js';
import { RectangleFadeOut } from '../lib/fade.js';
import { theGame, theMusicPlayer } from './main.js';
import { Space } from './space.js';
import { Beetle } from './beetle.js';
import { IntroStage } from './intro_stage.js';
//
export class ConcluStage {
  //
  constructor(screenWidth, screenHeight) {
    this.screenWidth = screenWidth;
    this.screenHeight = screenHeight;

    this.fadout = new RectangleFadeOut(screenWidth, screenHeight);

    this.space = new Space(screenWidth, screenHeight);

    this.beetles = [];

    this.beetles.push(new Beetle(screenWidth / 2, screenHeight / 4, Beetle.TYPE_1));

    this.beetles.push(new Beetle(screenWidth / 4, screenHeight / 4, Beetle.TYPE_2));

    this.beetles.push(new Beetle(3 * screenWidth / 4, screenHeight / 4, Beetle.TYPE_3));

    this.beetles.push(new Beetle(screenWidth / 2, 20, Beetle.TYPE_4));

    this.score = new Label('Score', 40);
    this.score.setColor('gold');

    this.com_play = new Label('Press Enter to Play', 40);
    this.com_play.setColor('WHITE');

    this.name = '???';
    this.points = 0;

    this.gameover = new Label('Game Over', 70);
    this.gameover.setColor("RED");

    this.first = new Label('First', 40);
    this.second = new Label('Second', 40);
    this.third = new Label('Third', 40);

    this.timer = 0;
  }
  //
  onEnter(datas) {
    if (datas) {
      //console.log(datas);
      //
      this.name = datas.name;
      this.points = datas.points;

      this.score.setText(`${this.name} : ${this.points}`);

      this.first.setText(`1. ${datas.bestscores.firstName} : ${datas.bestscores.firstPoints}`);
      this.second.setText(`2. ${datas.bestscores.secondName} : ${datas.bestscores.secondPoints}`);
      this.third.setText(`3. ${datas.bestscores.thirdName} : ${datas.bestscores.thirdPoints}`);
    }
    //
    setTimeout(() => {
      theMusicPlayer.play('./assets/musics/underground.ogg', 0.4, true);
    }, 100);
    //
    this.fadout.start();
  }
  //
  onExit() {
    theMusicPlayer.stop();
  }
  //
  update(dt) {
    //fadeOut
    if (this.fadout.isFinished() === false) {
      this.fadout.update(dt);
      return;
    }
    this.timer += dt;
    //
    this.space.update(dt);
    //
    if (this.timer > 0.05) {
      for (let item of this.beetles) {
        const dx = item.getCenterX() + getRandomFloat(-2, 2);
        const dy = item.getCenterY() + getRandomFloat(-2, 2);

        item.setCenterX(dx);
        item.setCenterY(dy);
        //
        item.update(dt);
      }
      //
      this.timer = 0;
    }
    //
    if (theGame.getInputManager().isKeyPressed('Enter')) {
      const datas = { name: this.name };

      setTimeout(() => {
        theGame.getStageManager().changeStage(new IntroStage(this.screenWidth, this.screenHeight), datas);
      }, 200);
    }
  }
  //
  render(ctx) {
    //
    this.space.render(ctx);
    //
    for (let item of this.beetles) {
      item.render(ctx);
    }
    //
    this.gameover.render(ctx, this.screenWidth / 4, this.screenHeight / 4);
    //
    this.score.render(ctx, 300, 250);

    this.first.render(ctx, 300, 350);
    this.second.render(ctx, 320, 400);
    this.third.render(ctx, 340, 450);

    this.com_play.render(ctx, 250, 550);
    //
    //fadeout
    if (this.fadout.isFinished() === false) {
      this.fadout.render(ctx);
    }
  }
}
//end class