import { Game, MusicPlayer } from '../lib/ezLib.js'
import { IntroStage } from './intro_stage.js';

const canvas = document.getElementById('game_screen');
const loading = document.getElementById('loading');
const audio_element = document.getElementById('audio_element');

export const theMusicPlayer = new MusicPlayer(audio_element);
export const theGame = new Game(canvas);
//
async function loadAssets() {
  try {
    console.log('loading assets');
    await theGame.loadImage("player", "./assets/images/player.png");
    await theGame.loadImage("playerJets", "./assets/images/player_jets.png");
    await theGame.loadImage("invinsible", "./assets/images/ship_invincible.png");
    await theGame.loadImage("explosion", "./assets/images/explosion.png");

    await theGame.loadImage("beetle_1", "./assets/images/beetlemorph_1.png");
    await theGame.loadImage("beetle_2", "./assets/images/beetlemorph_2.png");
    await theGame.loadImage("beetle_3", "./assets/images/beetlemorph_3.png");
    await theGame.loadImage("beetle_4", "./assets/images/beetlemorph_4.png");

    await theGame.loadImage("laser", "./assets/images/laser.png");
    await theGame.loadImage("bomb", "./assets/images/bomb.png");
    //
    await theGame.loadSound("boomBeetle", './assets/sounds/boomBeetle.mp3');
    await theGame.loadSound("newgame", './assets/sounds/newgame.mp3');
    await theGame.loadSound("lose", './assets/sounds/scream.mp3');
    await theGame.loadSound("slide", './assets/sounds/slide.mp3');
    //
    console.log('end loading');
    //
    setTimeout(() => {
      loading.style.display = 'none';
      const datas = { name: "AAA" };
      theGame.getStageManager().pushStage(new IntroStage(canvas.width, canvas.height), datas);
      //
      theGame.start();
    }, 500);
  } catch (error) {
    console.log(error);
  }
}
//
loadAssets();