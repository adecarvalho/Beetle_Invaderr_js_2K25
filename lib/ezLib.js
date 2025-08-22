/*
simple game Library javascript
2025-Aout-19
-
author A.DeCarvalho
- change scoreManager with title for localStorage
- add Vector2D class
- drawFillTriangle
- drawLineTriangle
- drawLine
- released mouseEvent up and down
- getBoundingClientRect();
- function map
*/

//***************
// functions
//***************
export function map(n, start1, stop1, start2, stop2) {
  let val = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
  return val;
}
//
export function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
//
export function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}
//
export function drawImage(ctx, image, xp, yp) {
  if (image !== undefined) {
    ctx.drawImage(image, xp, yp);
  }
}
//
export function drawText(ctx, text, xp, yp, size, color = 'rgb(255,50,200)') {
  ctx.fillStyle = color;
  ctx.font = `${size}px Arial`;
  ctx.fillText(text, xp, yp);
}
//
export function drawLine(ctx, x1, y1, x2, y2, size = 1, color = 'rgb(200,20,200)') {
  ctx.lineWidth = size;
  ctx.strokeStyle = color;
  //
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.closePath();
  ctx.stroke();
}
//
export function drawLineCircle(ctx, xc, yc, radius, color = 'rgb(255,50,200)') {
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.arc(xc, yc, radius, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.stroke();
}
//
export function drawFillCircle(ctx, xc, yc, radius, color = 'rgb(255,50,200)') {
  ctx.fillStyle = color;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(xc, yc, radius, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fill();
}
//
export function drawFillRectangle(ctx, xp, yp, width, height, color = 'rgb(255,50,200)') {
  ctx.fillStyle = color;
  ctx.fillRect(xp, yp, width, height);
}
//
export function drawLineRectangle(ctx, xp, yp, width, height, color = 'rgb(255,50,200)') {
  ctx.lineWidth = 2;
  ctx.strokeStyle = color; //'rgb(255,50,200)';
  ctx.strokeRect(xp, yp, width, height);
}
//
export function drawFillTriangle(ctx, x1, y1, x2, y2, x3, y3, color = 'rgb(255,50,200)') {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x3, y3);
  ctx.fill();
}
//
export function drawLineTriangle(ctx, x1, y1, x2, y2, x3, y3, color = 'rgb(200,200,0)') {
  ctx.strokeStyle = color; //'rgb(255,50,200)';
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x3, y3);
  ctx.closePath();
  ctx.stroke();
}
//
//*********************** */
// Vector2D
//*********************** */
export class Vector2D {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
  //
  printToConsole() {
    console.log(`X=${this.x}: Y=${this.y}: Mag= ${this.getMag()}: Angl=${this.getAngle()}`);
  }
  //
  static add(v1, v2) {
    if (v1 instanceof Vector2D && v2 instanceof Vector2D) {
      const x = v1.x + v2.x;
      const y = v1.y + v2.y;
      return new Vector2D(x, y);
    }
    return null;
  }
  //
  static sub(v1, v2) {
    if (v1 instanceof Vector2D && v2 instanceof Vector2D) {
      const x = v1.x - v2.x;
      const y = v1.y - v2.y;
      return new Vector2D(x, y);
    }
    return null;
  }
  //
  static mult(v1, amt) {
    if (v1 instanceof Vector2D) {
      const a = v1.x * amt;
      const b = v1.y * amt;

      return new Vector2D(a, b);
    }
    return new Vector2D(0, 0);
  }
  //
  static div(v1, amt) {
    if (v1 instanceof Vector2D && amt !== 0) {
      const a = v1.x / amt;
      const b = v1.y / amt;
      return new Vector2D(a, b);
    }
    return new Vector2D(0, 0);
  }
  //
  static random2D() {
    this.x = getRandomFloat(-1, 1);
    this.y = getRandomFloat(-1, 1);
    return new Vector2D(this.x, this.y);
  }
  //
  static distance(v1, v2) {
    if (v1 instanceof Vector2D && v2 instanceof Vector2D) {
      const a = v2.x - v1.x;
      const b = v2.y - v1.y;
      return Math.sqrt(a * a + b * b);
    }
    return 0;
  }
  //
  static distanceSq(v1, v2) {
    if (v1 instanceof Vector2D && v2 instanceof Vector2D) {
      const a = v2.x - v1.x;
      const b = v2.y - v1.y;
      return (a * a + b * b);
    }
    return 0;
  }
  //
  set(a, b) {
    this.x = a;
    this.y = b;
  }
  //
  add(other) {
    this.x += other.x;
    this.y += other.y;
  }
  //
  sub(other) {
    this.x -= other.x;
    this.y -= other.y;
  }
  //
  mult(amt) {
    this.x = this.x * amt;
    this.y = this.y * amt;
  }
  //
  div(amt) {
    if (amt != 0) {
      this.x = this.x / amt;
      this.y = this.y / amt;
    }
  }
  //
  getMag() {
    const x2 = this.x * this.x;
    const y2 = this.y * this.y;
    return Math.sqrt(x2 + y2);
  }
  //
  getMagSq() {
    const x2 = this.x * this.x;
    const y2 = this.y * this.y;
    return (x2 + y2);
  }
  //
  getAngle() {
    return Math.atan2(this.y, this.x);
  }
  //
  normalize() {
    const g = this.getMag();
    this.div(g);
  }
  //
  copy() {
    return new Vector2D(this.x, this.y);
  }
  //
  setMag(amt) {
    this.normalize();
    this.mult(amt);
  }
  //
  limit(amt) {
    const g = this.getMag();
    if (g >= amt) {
      this.setMag(amt);
    }
  }
  //
  dot(other) {
    const a = this.x * other.x;
    const b = this.y * other.y;
    return a + b;
  }
}
//******************* */
// Objets graphics
//******************* */
//*****  FillRect *** */
//******************* */
export class FillRect {
  constructor(xp, yp, width, height, color = 'rgb(200,20,200') {
    this.position = { x: xp, y: yp };
    this.width = width;
    this.height = height;
    this.color = color;
  }
  //
  setColor(color) {
    this.color = color;
  }
  //
  setPosition(xp, yp) {
    this.position.x = xp;
    this.position.y = yp;
  }
  //
  setSize(width, height) {
    this.width = width;
    this.height = height;
  }
  //
  render(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
//******************* */
//****  LineRect **** */
//******************* */
export class LineRect {
  constructor(xp, yp, width, height, color = 'rgb(200,20,200') {
    this.position = { x: xp, y: yp };
    this.width = width;
    this.height = height;
    this.color = color;
    this.lineWidth = 1;
  }
  //
  setColor(color) {
    this.color = color;
  }
  //
  setPosition(xp, yp) {
    this.position.x = xp;
    this.position.y = yp;
  }
  //
  setSize(width, height) {
    this.width = width;
    this.height = height;
  }
  //
  setLineWidth(width) {
    this.lineWidth = width;
  }
  //
  render(ctx) {
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.lineWidth;
    ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);
  }
}
//******************* */
//***** FillCircle ** */
//******************* */
export class FillCircle {
  constructor(xp, yp, radius = 10, color = 'rgb(200,20,200') {
    this.position = { x: xp, y: yp };
    this.radius = radius;
    this.color = color;
  }
  //
  setColor(color) {
    this.color = color;
  }
  //
  setPosition(xp, yp) {
    this.position.x = xp;
    this.position.y = yp;
  }
  //
  setRadius(radius) {
    this.radius = radius;
  }
  //
  render(ctx) {
    ctx.fillStyle = this.color;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(
      this.position.x,
      this.position.y,
      this.radius,
      0,
      Math.PI * 2,
      true
    );
    ctx.closePath();
    ctx.fill();
  }
}
//******************* */
//*** LineCircle **** */
//******************* */
export class LineCircle {
  constructor(xp, yp, radius = 10, color = 'rgb(200,20,200') {
    this.position = { x: xp, y: yp };
    this.radius = radius;
    this.color = color;
    this.lineWidth = 1;
  }
  //
  setColor(color) {
    this.color = color;
  }
  //
  setPosition(xp, yp) {
    this.position.x = xp;
    this.position.y = yp;
  }
  //
  setRadius(radius) {
    this.radius = radius;
  }
  //
  setLineWidth(width) {
    this.lineWidth = width;
  }
  //
  render(ctx) {
    ctx.fillStyle = this.color;
    ctx.lineWidth = this.lineWidth;
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.stroke();
  }
}
//******************* */
//** MusicPlayer **** */
//******************* */
export class MusicPlayer {
  constructor(snd = undefined) {
    this.snd = snd;
    this.snd.src = '';
    this.snd.setAttribute('preload', 'auto');
    this.snd.loop = true;
  }
  //
  stop() {
    if (this.snd) {
      this.snd.pause();
    }
  }
  //
  play(path, volume = 1.0, loop = true) {
    try {
      if (this.snd) {
        this.snd.src = path;
        this.snd.volume = volume;
        this.snd.loop = loop;
        //
        this.snd.addEventListener('canplaythrough', () => {
          this.snd.play();
        });
      }
    } catch (error) {
      console.log('Error MusicPlayer to play');
    }
  }
  //
  setVolume(amt = 1) {
    if (this.snd) {
      this.snd.volume = amt;
    }
  }
  //
  getVolume() {
    return this.snd.volume;
  }
}
//******************** */
//***** CircBounds *** */
//******************** */
export class CircBounds {
  constructor(xc = 0, yc = 0, radius = 10) {
    this.xc = xc;
    this.yc = yc;
    this.radius = radius;
  }
  //
  update(xc, yc) {
    this.xc = xc;
    this.yc = yc;
  }
  //
  inflate(xi = 0) {
    this.radius = this.radius - xi;
  }
  //
  overlap(circ_target) {
    const a_2 = (this.xc - circ_target.xc) * (this.xc - circ_target.xc);
    const b_2 = (this.yc - circ_target.yc) * (this.yc - circ_target.yc);

    const disq = a_2 + b_2;
    const r_2 = (this.radius + circ_target.radius) * (this.radius + circ_target.radius);

    if (disq < r_2) {
      return true;
    }
    return false;
  }
  //
  render(ctx) {
    drawLineCircle(ctx, this.xc, this.yc, this.radius, 'rgb(255,0,255)');
  }
}
//******************** */
//** RecBounds ******* */
//******************** */
export class RecBounds {
  constructor(x = 0, y = 0, w = 10, h = 10) {
    this.x = x;
    this.y = y;

    this.w = w;
    this.h = h;

    this.xi = 0;
    this.yi = 0;
  }
  //
  overlap(target) {
    if (this.x > target.x + target.w ||
      this.x + this.w < target.x ||
      this.y > target.y + target.h ||
      this.y + this.h < target.y) {
      return false;
    } else {
      return true;
    }
  }
  //
  update(xp, yp) {
    this.x = xp;
    this.x = this.x + this.xi;

    this.y = yp;
    this.y = this.y + this.yi;
  }
  //
  render(ctx) {
    drawLineRectangle(ctx, this.x, this.y, this.w, this.h, 'rgb(255,255,0)');
  }
  //
  inflate(xi, yi) {
    this.xi = xi;
    this.yi = yi;
    this.w = this.w - 2 * this.xi;
    this.h = this.h - 2 * this.yi;

    this.x = this.x + this.xi;
    this.y = this.y + this.yi;
  }
  //
  containPoint(px, py) {
    if (
      px > this.x &&
      px < this.x + this.w &&
      py > this.y &&
      py < this.y + this.h
    ) {
      return true;
    }
    return false;
  }
}
//**************** */
//***  stage *******/
//**************** */
export class Stage {

  constructor(screenWidth, screenHeight) {
    this.screenWidth = screenWidth;
    this.screenHeight = screenHeight;
  }
  //
  onEnter(datas = undefined) { }
  //
  onExit() { }
  //
  update(dt) { }
  //
  render(ctx) { }
}
//**************** */
//**** Entity **** */
//**************** */
export class Entity {

  constructor(xn = 0, yn = 0, image_src = undefined, w = 50, h = 50) {

    this.position = new Vector2D(xn, yn);

    this.image = image_src;

    this.color = 'rgb(200,200,200)';

    this.velocity = new Vector2D(0, 0);

    this.angle = 0;

    //dim
    if (this.image != undefined) {
      this.width = this.image.width;
      this.height = this.image.height;
    } else {
      this.width = w;
      this.height = h;
    }

    //state
    this.state = -1;

    //bouds rect
    this.rectBounds = new RecBounds(
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );

    //bounds circ
    this.circBounds = new CircBounds(
      this.getCenterX(),
      this.getCenterY(),
      this.width / 2
    );
  }
  //
  setImage(image_src) {
    this.image = image_src;
    this.width = this.image.width;
    this.height = this.image.height;
    //
    this.rectBounds = new RecBounds(
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
  //
  setState(val) {
    this.state = val;
  }
  //
  getState() {
    return this.state;
  }
  //
  getWidth() {
    return this.width;
  }
  //
  getHeight() {
    return this.height;
  }
  //
  setVelocityXY(dx, dy) {
    this.velocity.x = dx;
    this.velocity.y = dy;
  }
  //
  setVelocityX(dx) {
    this.velocity.x = dx;
  }
  //
  setVelocityY(dy) {
    this.velocity.y = dy;
  }
  //
  getVelocityX() {
    return this.velocity.x;
  }
  //
  getVelocityY() {
    return this.velocity.y;
  }
  //
  setColor(color) {
    this.color = color;
  }
  //
  setAngle(angle) {
    this.angle = angle;
  }
  //
  getAngle() {
    return this.angle;
  }
  //
  getPositionX() {
    return this.position.x;
  }
  //
  getPositionY() {
    return this.position.y;
  }
  //
  setPositionXY(xp, yp) {
    this.position.x = xp;
    this.position.y = yp;
  }
  //
  setPositionX(xp) {
    this.position.x = xp;
  }
  //
  setPositionY(yp) {
    this.position.y = yp;
  }
  //
  getCenterX() {
    return this.position.x + this.width / 2;
  }
  //
  getCenterY() {
    return this.position.y + this.height / 2;
  }
  //
  getLeft() {
    return this.position.x;
  }
  //
  setLeft(left) {
    this.position.x = left;
  }
  //
  getRight() {
    return this.position.x + this.width;
  }
  //
  setCenterX(centerX) {
    this.position.x = centerX - this.width / 2;
  }
  //
  setCenterY(centerY) {
    this.position.y = centerY - this.height / 2;
  }
  //
  setRight(right) {
    this.position.x = right - this.width;
  }
  //
  getTop() {
    return this.position.y;
  }
  //
  setTop(top) {
    this.position.y = top;
  }
  //
  getBottom() {
    return this.position.y + this.height;
  }
  //
  setBottom(bottom) {
    this.position.y = bottom - this.height;
  }
  //
  inflateRectBounds(xi, yi) {
    this.rectBounds.inflate(xi, yi);
  }
  //
  inflateCircBounds(xi) {
    this.circBounds.inflate(xi);
  }
  //
  collidesWithRectBounds(other_entity) {
    if (this.rectBounds.overlap(other_entity.rectBounds)) {
      return true;
    } else {
      return false;
    }
  }
  //
  collidesWithCircBounds(other_entity) {
    if (this.circBounds.overlap(other_entity.circBounds)) {
      return true;
    }
    //
    return false;
  }
  //
  update(dt) {
    this.position.x = this.position.x + this.velocity.x * dt;
    this.position.y = this.position.y + this.velocity.y * dt;

    this.rectBounds.update(this.position.x, this.position.y);
    this.circBounds.update(this.getCenterX(), this.getCenterY());
  }
  //
  render(ctx) {
    if (this.image != undefined) {
      //
      ctx.save();
      ctx.translate(this.getCenterX(), this.getCenterY());
      ctx.rotate(this.angle);
      //
      ctx.drawImage(
        this.image, -this.width / 2, -this.height / 2,
        this.width,
        this.height
      );
      ctx.restore();
      //
    } else {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
  }
  //
  renderCircBoundsDebug(ctx) {
    this.circBounds.render(ctx);
  }
  //
  renderRectBoundsDebug(ctx) {
    this.rectBounds.render(ctx);
  }
}
//********* */
//** Quads  */
//********* */
class Quads {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  //
  print() {
    console.log('x= ' + x + ' y=' + y);
  }
}
//************************** */
//***** AnimationSprites *****/
//************************** */
export class AnimationSprite {
  constructor(atlas, nbCols = 1, nbRows = 1, duration = 1 / 30, looping = false) {
    this.atlas = atlas;
    this.rows = nbRows;
    this.cols = nbCols;
    this.duration = duration;
    this.looping = looping;
    //
    this.spriteWidth = Math.floor(this.atlas.width / this.cols);
    this.spriteHeight = Math.floor(this.atlas.height / this.rows);
    //
    this.quads = [];
    this.currentFrame = 0;
    this.timer = 0;
    this.first = 0;
    this.last = 0;
    this.go = false;
    //
    this.createQuads();
    //
    //console.log("cols", this.cols);
    //console.log("rows", this.rows);
  }
  //
  createQuads() {
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        this.quads.push(new Quads(x, y, this.spriteWidth, this.spriteHeight));
      }
    }
  }
  //
  play(first = 0, last = undefined) {
    if (last === undefined) {
      this.last = this.quads.length - 1;
    }
    else {
      this.last = last;
    }
    //
    this.first = first;
    this.currentFrame = first;
    this.go = true;
  }
  //
  stop() {
    this.go = false;
  }
  //
  isPlaying() {
    return this.go;
  }
  //
  update(dt) {
    if (this.go && this.quads.length > 1) {
      this.timer += dt;
      //
      if (this.timer > this.duration) {
        this.timer = 0;
        //
        this.currentFrame++;
        if (this.currentFrame >= this.last) {
          this.currentFrame = this.first;
          //
          if (this.looping === false) {
            this.go = false;
          }
        }
      }
    }
  }
  //
  renderFrame(ctx, frame = 0, xp = 0, yp = 0) {
    if (frame < this.quads.length) {
      let quad = this.quads[frame];
      //
      ctx.drawImage(this.atlas,
        quad.x * this.spriteWidth,
        quad.y * this.spriteHeight,
        quad.w,
        quad.h,
        xp,
        yp,
        this.spriteWidth,
        this.spriteHeight);
    }
    else {
      console.log("Error AnimationSprite render frame");
    }
  }
  //
  renderAnimation(ctx, xp, yp) {
    if (this.go) {
      this.renderFrame(ctx, this.currentFrame, xp, yp);
    }
  }
}
//
//**********************/
//*****  player        */
//******************** */
class Player {
  constructor(name, score, lives) {
    this.name = name;
    this.score = score;
    this.lives = lives;
  }
  //
  reset(lives) {
    this.score = 0;
    this.lives = lives;
  }
  //
  changePlayer(target) {
    this.name = target.name;
    this.score = target.score;
    this.lives = target.lives;
  }
  //
  debug() {
    console.log(`${this.name} : ${this.score}`);
  }
}
//******************* */
//** scoreManager     */
//******************* */
export class ScoreManager {
  //
  constructor(screenWidth, screenHeight, name = "gamejs") {
    this.screenWidth = screenWidth;
    this.screenHeight = screenHeight;
    //
    this.title = name;
    //
    this.movePoint = new MoveLabel(screenWidth, screenHeight, "0", 2 * screenWidth, 2 * screenHeight);
    this.movePoint.setSpeeds(0, 0);
    //
    this.player = new Player("AAA", 0, 3);
    //
    this.bestOne = new Player("AAA", 3, 3);
    this.bestTwo = new Player("BBB", 2, 3);
    this.bestThird = new Player("CCC", 1, 3);
    //
    this.timer = 0;
    this.fps = 0;
    this.fpsmoyen = 0;
    //
    this.labelPoints = new Label();
    this.labelPoints.setSize(20);
    //
    this.labelName = new Label();
    this.labelName.setSize(20);
    //
    this.labelPoints.setColor('purple');
    this.labelName.setColor('purple');
    //
    this.labelFps = new Label();
    this.labelFps.setColor('purple');
    //
    this.bestscores = {
      firstName: 'AAA',
      firstPoints: 3,
      secondName: 'BBB',
      secondPoints: 2,
      thirdName: 'CCC',
      thirdPoints: 1
    }
    //
    this.itemBestOne = `${this.title}_GAME_BEST_ONE`;
    this.itemBestTwo = `${this.title}_GAME_BEST_TWO`;
    this.itemBestThird = `${this.title}_GAME_BEST_THIRD`;

    this.readFromLocalStorage();
  }
  //
  setLabelsColor(color = 'WHITE') {
    this.movePoint.setColor(color);
    this.labelPoints.setColor(color);
    this.labelName.setColor(color);
    this.labelFps.setColor(color);
  }
  //
  getBestScore() {
    this.bestscores.firstName = this.bestOne.name;
    this.bestscores.firstPoints = this.bestOne.score;

    this.bestscores.secondName = this.bestTwo.name;
    this.bestscores.secondPoints = this.bestTwo.score;

    this.bestscores.thirdName = this.bestThird.name;
    this.bestscores.thirdPoints = this.bestThird.score;

    return this.bestscores
  }
  //
  calcBestScores() {

    if (this.player.score > this.bestOne.score) {
      //
      this.bestThird.changePlayer(this.bestTwo);
      this.bestTwo.changePlayer(this.bestOne);
      this.bestOne.name = this.player.name;
      this.bestOne.score = this.player.score;
      //
      this.writeToLocalStorage();
      return;
    }
    if (this.player.score > this.bestTwo.score) {
      //
      this.bestThird.changePlayer(this.bestTwo);
      this.bestTwo.name = this.player.name;
      this.bestTwo.score = this.player.score;
      //
      this.writeToLocalStorage();
      return;

    }
    if (this.player.score > this.bestThird.score) {
      //
      this.bestThird.name = this.player.name;
      this.bestThird.score = this.player.score;
      //
      this.writeToLocalStorage();
      return;

    }
  }
  //
  readFromLocalStorage() {
    try {
      //bestOne
      if (this.itemBestOne in localStorage) {
        const res = JSON.parse(localStorage.getItem(this.itemBestOne));
        this.bestOne.name = res.name.toString();
        this.bestOne.score = parseInt(res.score);
        //this.bestOne.debug();
      }
      //bestTwo
      if (this.itemBestTwo in localStorage) {
        const res = JSON.parse(localStorage.getItem(this.itemBestTwo));
        this.bestTwo.name = res.name.toString();
        this.bestTwo.score = parseInt(res.score);
        //this.bestTwo.debug();
      }
      //bestThird
      if (this.itemBestThird in localStorage) {
        const res = JSON.parse(localStorage.getItem(this.itemBestThird));
        this.bestThird.name = res.name.toString();
        this.bestThird.score = parseInt(res.score);
        //this.bestThird.debug();
      }
    } catch (error) {
      console.log(error);
    }
  }
  //
  writeToLocalStorage() {
    try {
      //bestOne
      let bestTxt = "";

      bestTxt = JSON.stringify({ name: this.bestOne.name, score: this.bestOne.score });
      localStorage.setItem(this.itemBestOne, bestTxt);

      //bestTwo
      bestTxt = JSON.stringify({ name: this.bestTwo.name, score: this.bestTwo.score });
      localStorage.setItem(this.itemBestTwo, bestTxt);

      //bestThird
      bestTxt = JSON.stringify({ name: this.bestThird.name, score: this.bestThird.score });
      localStorage.setItem(this.itemBestThird, bestTxt);


    } catch (error) {
      console.log(error);
    }
  }
  //
  setName(zename) {
    this.player.name = zename;
  }
  //
  getName() {
    return this.player.name;
  }
  //
  getPoints() {
    return this.player.score;
  }
  //
  setPoints(nb) {
    this.player.score = nb;
  }
  //
  getLives() {
    return this.player.lives;
  }
  //
  incrementsPoints(amt, xanim = 0, yanim = 0, dx = 0, dy = 0) {
    this.player.score += amt;
    //
    if (xanim > 0 || yanim > 0) {
      this.movePoint.setText(amt.toString());
      this.movePoint.setPosition(xanim, yanim);
      this.movePoint.setSpeeds(dx, dy);
    }
  }
  //
  incrementsLives(amt = 1) {
    if (this.player.lives >= 0 && this.player.lives < 3) {
      this.player.lives += amt;
    }
  }
  //
  decrementsLives(amt = 1) {
    this.player.lives -= amt;
  }
  //
  isGameOver() {
    if (this.player.lives < 0) {
      this.calcBestScores();
      return true;
    }
    else {
      return false;
    }
  }
  //
  reset() {
    this.player.reset(3);
  }
  //
  update(dt) {
    this.timer += dt;
    this.fps++;
    //
    this.movePoint.update(dt);

    if (this.timer > 1.0) {
      this.fpsmoyen = this.fps;
      this.fps = 0;
      this.timer = 0;
    }
  }
  //
  render(ctx) {
    this.labelPoints.setText('Points: ' + this.player.score);
    this.labelPoints.render(ctx, 10, 20);

    this.labelFps.setText('Fps: ' + this.fpsmoyen);
    this.labelFps.render(ctx, 10, 45);

    this.labelName.setText(this.player.name);
    this.labelName.render(ctx, this.screenWidth - 80, 50);
    //
    this.movePoint.render(ctx);
    //lives
    let xd = this.screenWidth - 80;

    ctx.fillStyle = 'rgb(250,50,250)';

    if (this.player.lives > 0) {
      for (let i = 0; i < this.player.lives; i++) {
        ctx.beginPath();
        ctx.arc(xd + 25 * i, 20, 10, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }
    }
  }
}
//************** */
//** label       */
//************** */
export class Label {
  constructor(text = '', size = 20) {
    this.txt = text;
    this.size = size;
    this.visible = true;
    this.rgbColor = 'rgb(250,250,20)';
  }
  //
  setVisible(visible) {
    this.visible = visible;
  }
  //
  setText(txt) {
    this.txt = txt;
  }
  //
  setColor(rgbColor) {
    this.rgbColor = rgbColor;
  }
  //
  setSize(size) {
    this.size = size;
  }
  //
  render(context, xp, yp) {
    if (this.visible) {
      context.fillStyle = this.rgbColor;
      context.font = `${this.size}px Arial`;
      context.fillText(this.txt, xp, yp);
    }
  }
}
//***************************** */
//* particulesGenerator         */
//***************************** */
export class ParticulesGenerator {

  constructor(
    xp,
    yp,
    speedMin = 10,
    speedMax = 100,
    angleMin = Math.PI / 4,
    angleMax = (3 * Math.PI) / 4
  ) {
    this.position = { x: xp, y: yp };
    this.speedMin = speedMin;
    this.speedMax = speedMax;

    this.angleMin = angleMin;
    this.angleMax = angleMax;

    this.go = false;

    this.particules = [];

    for (let i = 0; i < 100; i++) {
      this.particules.push(new Particule(this.position.x, this.position.y));
      const module = getRandomFloat(speedMin, speedMax);
      const angle = getRandomFloat(angleMin, angleMax);

      this.particules[i].setSpeed(module, angle);
    }
  }
  //
  setColor(r = 50, g = 50, b = 50) {
    for (let i = 0; i < 100; i++) {
      this.particules[i].setColor(r, g, b);
    }
  }
  //
  setSpeedMinMax(speedMin, speedMax) {
    this.speedMin = speedMin;
    this.speedMax = speedMax;
  }
  //
  setAngleMinMax(angleMin, angleMax) {
    this.angleMin = angleMin;
    this.angleMax = angleMax;
  }
  //
  start() {
    this.go = true;
  }
  //
  stop() {
    this.go = false;
  }
  //
  move(xn, yn) {
    this.position.x = xn;
    this.position.y = yn;
  }
  //
  update(dt) {
    if (this.particules.length > 0 && this.go) {
      for (let i = 0; i < this.particules.length; i++) {
        this.particules[i].update(dt);
        //
        if (this.particules[i].isDead()) {
          this.particules[i].reset(this.position.x, this.position.y);

          const module = getRandomFloat(this.speedMin, this.speedMax);
          const angle = getRandomFloat(this.angleMin, this.angleMax);

          this.particules[i].setSpeed(module, angle);
        }
      }
    }
  }
  //
  render(ctx) {
    if (this.particules.length > 0 && this.go) {
      for (let i = 0; i < this.particules.length; i++) {
        this.particules[i].render(ctx);
      }
    }
  }
}
//******************* */
//** particule        */
//******************* */
export class Particule {
  constructor(xp, yp, radius = 5, live = 1) {
    this.positionInit = {
      x: xp,
      y: yp,
    };
    this.position = {
      x: xp,
      y: yp,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.radius = radius;
    this.live = getRandomFloat(0.1, live);

    this.color = { r: 0, g: 0, b: 0, a: 1 };
    this.state = 'LIVE';
    this.timer = 0;
  }
  //
  setColor(r = 50, g = 50, b = 50) {
    this.color.r = r;
    this.color.g = g;
    this.color.b = b;
    this.color.a = 1;
  }
  //
  isDead() {
    if (this.state === 'DEAD') {
      return true;
    }
    return false;
  }
  //
  reset(xn, yn) {
    this.positionInit.x = xn;
    this.positionInit.y = yn;

    this.position.x = xn;
    this.position.y = yn;

    this.timer = 0;
    this.color.a = 1;
    this.state = 'LIVE';
  }
  //
  setVelocity(dx, dy) {
    this.velocity.x = dx;
    this.velocity.y = dy;
  }
  //
  setSpeed(module, angle) {
    this.velocity.x = module * Math.cos(angle);
    this.velocity.y = module * Math.sin(angle);
  }
  //
  move(xn, yn) {
    this.positionInit.x = xn;
    this.positionInit.y = yn;
  }
  //
  update(dt) {
    if (this.state == 'LIVE') {
      this.timer += dt;
      //
      if (this.timer > this.live) {
        this.timer = 0;
        this.state = 'DEAD';
      }

      const alpha = 255 - (255 * this.timer) / this.live;

      this.color.a = alpha / 255;

      this.position.x += this.velocity.x * dt;
      this.position.y += this.velocity.y * dt;
    }
  }
  //
  render(ctx) {
    ctx.beginPath();

    ctx.fillStyle = `rgba(${this.color.r},${this.color.g},${this.color.b},${this.color.a})`;

    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}
//**********************/
//****** assetManager */
//*********************/
class AssetsManager {
  constructor() {
    this.textures = {};
    this.sounds = {};
  }
  //
  putImage(id, image) {
    this.textures[id] = image;
  }
  //
  getImage(id) {
    try {
      return this.textures[id];
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  //
  playSound(id) {
    try {
      this.sounds[id].load();
      this.sounds[id].play();
    } catch (error) {
      console.error(`Error Play Sound ${id}`);
    }
  }
  //
  putSound(id, sound) {
    this.sounds[id] = sound;
  }
  //
  getSound(id) {
    try {
      return this.sounds[id];
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
//**********************/
//****** stageManager */
//*********************/
class StageManager {
  constructor() {
    this.tab = [];
    this.current = undefined;
  }
  //
  pushStage(newstage, datas) {
    this.tab.push(newstage);
    this.current = this.tab[this.tab.length - 1];
    this.current.onEnter(datas);
  }
  //
  popStage() {
    if (this.tab.length > 0) {
      this.current = this.tab.pop();
      this.current.onExit();
    }
  }
  //
  changeStage(newstage, datas) {
    if (this.tab.length > 0) {
      this.current.onExit();
      this.tab.pop();
      //
      this.tab.push(newstage);
      this.current = this.tab[this.tab.length - 1];
      this.current.onEnter(datas);
    }
  }
  //
  update(dt) {
    this.current.update(dt);
  }
  //
  render(ctx) {
    this.current.render(ctx);
  }
}
//**********************/
//******* inputManager */
//******************** */
class InputManager {
  constructor(canvas = undefined) {
    this.canvas = canvas;
    if (canvas === undefined) {
      console.log("Error Canvas null in inputManager")
    }
    //
    this.tabKeyPressed = {};
    this.tabKeyReleased = {};
    //
    this.mousePosition = { x: 0, y: 0 };
    this.mouseClick = { x: 0, y: 0, clicked: false, button: -1 };
    //
    document.addEventListener('mousemove', (evt) => {
      const rect = this.canvas.getBoundingClientRect();
      //
      this.mousePosition.x = Math.floor(evt.clientX - rect.left);
      this.mousePosition.y = Math.floor(evt.clientY - rect.top);
      //console.log(this.mousePosition.x, this.mousePosition.y);
    });
    //
    document.addEventListener('mouseup', (evt) => {
      setTimeout(() => {
        const rect = this.canvas.getBoundingClientRect();
        this.mouseClick.x = Math.floor(evt.clientX - rect.left);
        this.mouseClick.y = Math.floor(evt.clientY - rect.top);
        //
        this.mouseClick.clicked = false
        this.mouseClick.button = evt.button;
      }, 10);
    });
    //
    document.addEventListener('mousedown', (evt) => {
      setTimeout(() => {
        const rect = this.canvas.getBoundingClientRect();
        this.mouseClick.x = Math.floor(evt.clientX - rect.left);
        this.mouseClick.y = Math.floor(evt.clientY - rect.top);
        //
        this.mouseClick.clicked = true
        this.mouseClick.button = evt.button;
      }, 10);
    });
    //
    document.addEventListener(
      'keydown',
      (evt) => {
        setTimeout(() => {
          this.tabKeyPressed[evt.code] = true;
          this.tabKeyReleased[evt.code] = false;
        }, 10);
      },
      false
    );
    //
    document.addEventListener(
      'keyup',
      (evt) => {
        setTimeout(() => {
          this.tabKeyReleased[evt.code] = true;
          this.tabKeyPressed[evt.code] = false;
        }, 10);
      },
      false
    );
  }
  //
  update() {
    this.tabKeyReleased = {};
    this.tabKeyPressed = {};

    this.mouseClick.clicked = false;
    this.mouseClick.button = -1;
  }
  //
  isKeyPressed(keyCode) {
    return this.tabKeyPressed[keyCode];
  }
  //
  isKeyReleased(keyCode) {
    return this.tabKeyReleased[keyCode];
  }
  //
  isMouseClicked() {
    return this.mouseClick.clicked;
  }
}
//**********************/
//********* game *******/
//**********************/
export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');

    this.screenWidth = this.canvas.width;
    this.screenHeight = this.canvas.height;
    //
    this.stageManager = new StageManager();

    this.inputManager = new InputManager(canvas);

    this.assetManager = new AssetsManager();

    this.spriteStillLoading = 0;
    this.soundStillLoading = 0;

    this.oldtime = 0;

    this.timer = 0;

    this.fps = 0;
    this.fpsmoyen = 0;
  }
  //
  getStageManager() {
    return this.stageManager;
  }
  //
  getInputManager() {
    return this.inputManager;
  }
  //
  getAssetManager() {
    return this.assetManager;
  }
  //
  getFps() {
    return this.fpsmoyen;
  }
  //
  loadImage(id, path) {
    return new Promise((resolve, reject) => {
      try {
        const img = new Image();
        img.src = path;
        this.spriteStillLoading += 1;

        img.onload = () => {
          this.spriteStillLoading -= 1;
          this.assetManager.putImage(id, img);
          //console.log(`${ path } :> is loaded`);
          resolve(true);
        };
      } catch (err) {
        console.log(`${path} :> Not Found`);
        reject(err);
      }
    });
  }
  //
  loadSound(id, path, volume = 1.0) {
    return new Promise((resolve, reject) => {
      try {
        const snd = new Audio();
        snd.src = path;

        snd.loop = false;
        snd.volume = volume;
        //
        this.soundStillLoading += 1;

        snd.addEventListener('canplaythrough', () => {
          this.soundStillLoading -= 1;
          this.assetManager.putSound(id, snd);
          //console.log(`${ path } : loaded`);
          resolve(true);
        });
      } catch (e) {
        console.log(e);
        reject(e);
      }
    });
  }
  //
  start() {
    //
    if (this.spriteStillLoading > 0 || this.soundStillLoading > 0) {
      requestAnimationFrame(() => {
        this.start();
      });
    } else {
      console.log('game to mainloop');

      this.mainLoop();
    }
  }
  //
  mainLoop(timestamp) {
    const dt = (timestamp - this.oldtime) / 1000.0 || 0;

    this.oldtime = timestamp;

    this.timer += dt;

    this.fps++;

    if (this.timer >= 1.0) {
      //console.log(`fps = ${ this.fps }`);
      this.timer = 0;
      this.fpsmoyen = this.fps;
      this.fps = 0;
    }

    //clear screen
    //this.ctx.clearRect(0, 0, this.screenWidth, this.screenHeight);
    //
    this.stageManager.update(dt);
    //
    this.inputManager.update();
    //
    this.stageManager.render(this.ctx);
    //
    requestAnimationFrame((timestamp) => {
      this.mainLoop(timestamp);
    });
  }
}
//
//******************* */
//** MoveLabel        */
//******************* */
export class MoveLabel extends Label {
  //
  constructor(screenWidth, screenHeight, txt = "point", xinit = 0, yinit = 0, color = "WHITE", size = 25) {
    super(txt, size);
    super.setColor(color);
    //
    this.screenWidth = screenWidth;
    this.screenHeight = screenHeight;
    //
    this.position = { x: xinit, y: yinit };
    //
    this.velocity = { x: 0, y: 0 };
  }
  //
  setSpeeds(dx, dy) {
    this.velocity.x = dx;
    this.velocity.y = dy;
  }
  //
  setPosition(xp, yp) {
    this.position.x = xp;
    this.position.y = yp;
  }
  //
  update(dt) {
    this.position.x += this.velocity.x * dt;
    this.position.y += this.velocity.y * dt;
    //limites
    if (this.position.x <= 0 || this.position.x > this.screenWidth) {
      this.position.x = 2 * this.screenWidth;
      this.velocity.x = 0;
    }
    //
    if (this.position.y < 0 || this.position.y > this.screenHeight) {
      this.position.y = 2 * this.screenHeight;
      this.velocity.y = 0;
    }
  }
  //
  render(ctx) {
    super.render(ctx, this.position.x, this.position.y);
  }
}
//************/
//end