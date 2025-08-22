import { theGame, theMusicPlayer } from './main.js';
import { RectangleFadeOut, CircleFadeIn } from '../lib/fade.js';
import { Label, getRandomFloat } from '../lib/ezLib.js';
import { PlayStage } from './play_stage.js';
import { Beetle } from './beetle.js';
import { Space } from './space.js';
//
export class IntroStage {
  //
  constructor(screenWidth, screenHeight) {
    this.screenWidth = screenWidth;
    this.screenHeight = screenHeight;

    this.fadout = new RectangleFadeOut(screenWidth, screenHeight);

    this.fadin = new CircleFadeIn(screenWidth, screenHeight);

    this.beetles = [];

    this.beetles.push(new Beetle(screenWidth / 2, screenHeight / 4, Beetle.TYPE_1));

    this.beetles.push(new Beetle(screenWidth / 4, screenHeight / 2, Beetle.TYPE_2));

    this.beetles.push(new Beetle(3 * screenWidth / 4, screenHeight / 2, Beetle.TYPE_3));

    this.beetles.push(new Beetle(screenWidth / 2, screenHeight / 2, Beetle.TYPE_4));

    this.space = new Space(screenWidth, screenHeight);

    this.input = theGame.getInputManager();

    this.assetManager = theGame.getAssetManager();

    this.title = new Label('Beetle Invader', 70);
    this.title.setColor('RED');

    this.com = new Label('Press Space to Start', 30);
    this.com.setColor('WHITE');

    this.nameLabel = new Label('AAA', 60);
    this.nameLabel.setColor('GOLD');

    this.tab = [65, 65, 65];
    this.indice = 0;
    this.timer = 0;
    this.timermove = 0;
    this.toggle = true;

    this.name = '***';
    this.handler = null;
  }
  //
  onEnter(datas) {
    if (datas) {
      const thename = datas.name;
      for (let i = 0; i < 3; i++) {
        this.tab[i] = thename.charCodeAt(i);
      }
    }
    this.handler = setTimeout(() => {
      this.assetManager.playSound('newgame');
      theMusicPlayer.play('./assets/musics/alliance.mp3', 0.4, false);
    }, 500);
    //fadeout
    this.fadout.start();
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
  update(dt) {
    //fadeIn
    if (this.fadin.isFinished() === false) {
      this.fadin.update(dt);
    }
    //fadeOut
    if (this.fadout.isFinished() === false) {
      this.fadout.update(dt);
    }
    //
    this.timer += dt;
    //
    this.timermove += dt;
    if (this.timermove > 0.05) {
      for (let item of this.beetles) {
        const dx = item.getCenterX() + getRandomFloat(-2, 2);
        const dy = item.getCenterY() + getRandomFloat(-2, 2);

        item.setCenterX(dx);
        item.setCenterY(dy);
        //
        item.update(dt);
      }
      this.timermove = 0;
    }
    //
    this.space.update(dt);
    //
    if (this.timer > 0.4) {
      this.timer = 0;
      this.toggle = !this.toggle;
    }
    //
    if (this.input.isKeyPressed('ArrowLeft') && this.indice > 0) {
      this.indice = this.indice - 1;
    }
    //
    if (this.input.isKeyPressed('ArrowRight') && this.indice < 2) {
      this.indice = this.indice + 1;
    }
    //
    if (this.input.isKeyPressed('ArrowUp')) {
      this.tab[this.indice] = this.tab[this.indice] + 1;
      if (this.tab[this.indice] > 90) {
        this.tab[this.indice] = 65;
      }
    }
    //
    if (this.input.isKeyPressed('ArrowDown')) {
      this.tab[this.indice] = this.tab[this.indice] - 1;
      if (this.tab[this.indice] < 65) {
        this.tab[this.indice] = 90;
      }
    }
    //enter -> game stage
    if (this.input.isKeyPressed('Space')) {
      //start fadeOut
      this.fadin.start();
    }
    //
    if (this.fadin.isStarted() === true && this.fadin.isFinished() === true) {
      //
      const datas = {
        name: (this.name = String.fromCharCode(
          this.tab[0],
          this.tab[1],
          this.tab[2]
        ))
      };
      //
      theGame.getStageManager().changeStage(
        new PlayStage(this.screenWidth, this.screenHeight),
        datas);
    }
  }
  //
  afficheName(ctx) {
    if (this.indice == 0) {
      if (this.toggle) {
        this.name = String.fromCharCode(32, 32, this.tab[1], this.tab[2]);
      } else {
        this.name = String.fromCharCode(this.tab[0], this.tab[1], this.tab[2]);
      }
    }
    //
    else if (this.indice == 1) {
      if (this.toggle) {
        this.name = String.fromCharCode(this.tab[0], 32, 32, this.tab[2]);
      } else {
        this.name = String.fromCharCode(this.tab[0], this.tab[1], this.tab[2]);
      }
    }
    //
    else if (this.indice == 2) {
      if (this.toggle) {
        this.name = String.fromCharCode(this.tab[0], this.tab[1], 32, 32);
      } else {
        this.name = String.fromCharCode(this.tab[0], this.tab[1], this.tab[2]);
      }
    }
    //
    this.nameLabel.setText(this.name);

    this.nameLabel.render(ctx, 300, this.screenHeight * 0.5);
  }
  //
  render(ctx) {
    this.space.render(ctx);

    for (let item of this.beetles) {
      item.render(ctx);
    }

    this.title.render(ctx, this.screenWidth * 0.25, 100);

    this.afficheName(ctx);

    this.com.render(ctx, 270, this.screenHeight - 20);
    //
    //fadeout
    if (this.fadout.isFinished() === false) {
      this.fadout.render(ctx);
    }
    //fadein
    if (this.fadin.isFinished() === false) {
      this.fadin.render(ctx);
    }

  }
}
//end class