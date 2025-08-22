import { theGame, theMusicPlayer } from "./main.js";
import { Keyboard } from "../lib/keyboard.js";
import { PlayStage } from './play_stage.js';
//
export class KeyboardStage {
  constructor(screenWidth, screenHeight) {
    this.screenWidth = screenWidth;
    this.screenHeight = screenHeight;

    this.img = theGame.getAssetManager().getImage('space');

    this.input = theGame.getInputManager();

    this.clavier = new Keyboard(
      150,
      250,
      this.screenWidth,
      this.screenHeight,
      this.input
    );
  }
  //
  onEnter(datas) {
    //
    if (datas) {
      this.clavier.setInitText(datas.name);
    }
    //
    setTimeout(() => {
      //theMusicPlayer.play('./assets/musics/space.ogg');
    }, 500);
  }
  //
  onExit() {
    theMusicPlayer.stop();
  }
  //
  update(dt) {
    this.clavier.update(dt);

    if (this.clavier.isValidate()) {

      //console.log(this.clavier.getTextValidate());

      const datas = {
        name: this.clavier.getTextValidate(),
      };
      //
      theGame
        .getStageManager()
        .changeStage(
          new PlayStage(this.screenWidth, this.screenHeight),
          datas
        );
    }
  }
  //
  render(ctx) {
    ctx.drawImage(this.img, 0, 0);
    this.clavier.render(ctx);
  }
}
//end class
