import { Btn } from './btn.js';
//
const clavier = {
  nbRow: 4,
  nbCol: 10,
  keyWidth: 50,
  keyHeight: 50,
  width: 500,
  height: 200,
  touches: [
    [{ x: 0, y: 0, w: 1, h: 1, txt: "0" },
    { x: 1, y: 0, w: 1, h: 1, txt: "1" },
    { x: 2, y: 0, w: 1, h: 1, txt: "2" },
    { x: 3, y: 0, w: 1, h: 1, txt: "3" },
    { x: 4, y: 0, w: 1, h: 1, txt: "4" },
    { x: 5, y: 0, w: 1, h: 1, txt: "5" },
    { x: 6, y: 0, w: 1, h: 1, txt: "6" },
    { x: 7, y: 0, w: 1, h: 1, txt: "7" },
    { x: 8, y: 0, w: 1, h: 1, txt: "8" },
    { x: 9, y: 0, w: 1, h: 1, txt: "9" },
    ],
    [{ x: 0, y: 1, w: 1, h: 1, txt: "A" },
    { x: 1, y: 1, w: 1, h: 1, txt: "Z" },
    { x: 2, y: 1, w: 1, h: 1, txt: "E" },
    { x: 3, y: 1, w: 1, h: 1, txt: "R" },
    { x: 4, y: 1, w: 1, h: 1, txt: "T" },
    { x: 5, y: 1, w: 1, h: 1, txt: "Y" },
    { x: 6, y: 1, w: 1, h: 1, txt: "U" },
    { x: 7, y: 1, w: 1, h: 1, txt: "I" },
    { x: 8, y: 1, w: 1, h: 1, txt: "O" },
    { x: 9, y: 1, w: 1, h: 1, txt: "P" },
    ],
    [{ x: 0, y: 2, w: 1, h: 1, txt: "Q" },
    { x: 1, y: 2, w: 1, h: 1, txt: "S" },
    { x: 2, y: 2, w: 1, h: 1, txt: "D" },
    { x: 3, y: 2, w: 1, h: 1, txt: "F" },
    { x: 4, y: 2, w: 1, h: 1, txt: "G" },
    { x: 5, y: 2, w: 1, h: 1, txt: "H" },
    { x: 6, y: 2, w: 1, h: 1, txt: "J" },
    { x: 7, y: 2, w: 1, h: 1, txt: "K" },
    { x: 8, y: 2, w: 1, h: 1, txt: "L" },
    { x: 9, y: 2, w: 1, h: 1, txt: "M" },
    ],
    [{ x: 0, y: 3, w: 1, h: 1, txt: "W" },
    { x: 1, y: 3, w: 1, h: 1, txt: "X" },
    { x: 2, y: 3, w: 1, h: 1, txt: "C" },
    { x: 3, y: 3, w: 1, h: 1, txt: "V" },
    { x: 4, y: 3, w: 1, h: 1, txt: "B" },
    { x: 5, y: 3, w: 1, h: 1, txt: "N" },
    { x: 6, y: 3, w: 2, h: 1, txt: "DEL" },
    { x: 8, y: 3, w: 2, h: 1, txt: "OK" },
    ],
  ]
}
//

//
export class Keyboard {
  constructor(xp = 0, yp = 0, screenWidth, screenHeight, input = undefined, textColor = 'gold') {
    this.xp = xp;
    this.yp = yp;
    this.screenWidth = screenWidth;
    this.screenHeight = screenHeight;

    this.nbRow = clavier.nbRow;
    this.nbCol = clavier.nbCol;
    this.width = clavier.width;
    this.height = clavier.height;

    this.textColor = textColor;

    this.input = input;

    this.tab = [];
    this.saisie = ["-", "-", "-", "-", "-"];
    this.pointerMax = this.saisie.length - 1;
    //
    for (let c = 0; c < this.nbRow; c++) {
      this.createRow(c);
    }
    //
    this.pointer = 0;
    this.timer = 0;
    this.toggle = false;
    this.period = 0.5;
    //
    this.validate = false;
  }

  setInitText(txt) {
    for (let i = 0; i < txt.length; i++) {
      this.saisie[i] = txt[i];
    }
  }

  isValidate() {
    return this.validate;
  }

  getTextValidate() {
    let txt = "";

    for (let i = 0; i < this.saisie.length; i++) {
      txt += `${this.saisie[i]}`;
    }
    return txt;
  }

  createRow(row) {
    const _keywidth = clavier.keyWidth;
    const _keyheight = clavier.keyHeight;

    const _nbcol = clavier.touches[row].length;
    //console.log("nbcol :", _nbcol);

    let temp = [];

    for (let i = 0; i < _nbcol; i++) {
      const val = clavier.touches[row][i];

      const xb = this.xp + (val.x * _keywidth);
      const yb = this.yp + (val.y * _keyheight);
      const wb = val.w * _keywidth;
      const hb = val.h * _keyheight;
      temp.push(new Btn(xb, yb, wb, hb, val.txt));
    }

    this.tab.push(temp);
  }

  resetStates() {
    for (let r = 0; r < this.nbRow; r++) {
      for (let c = 0; c < this.tab[r].length; c++) {
        //
        const btn = this.tab[r][c];

        btn.setReleased();
      }
    }
  }

  isContainsMouse() {
    const xm = this.input.mousePosition.x;
    const ym = this.input.mousePosition.y;

    if (xm >= this.xp && xm <= (this.xp + this.width) && ym >= this.yp && ym <= (this.yp + this.height)) {
      return true;
    }

    return false;
  }

  update(dt) {
    //
    this.timer += dt;

    if (this.timer > this.period) {
      this.timer = 0;
      this.toggle = !this.toggle;
    }
    //
    this.resetStates();
    //
    if (this.input) {
      if (this.isContainsMouse()) {
        //
        // console.log(this.input.mouseClick);
        const xm = this.input.mousePosition.x;
        const ym = this.input.mousePosition.y;
        //
        for (let r = 0; r < this.nbRow; r++) {
          for (let c = 0; c < this.tab[r].length; c++) {

            const btn = this.tab[r][c];

            if (btn.isContainsPoints(xm, ym)) {
              btn.setPressed();
              //
              if (this.input.mouseClick.clicked) {
                //btn.debug();
                //console.log(">> ", btn.txt);
                this.processBtn(btn.txt);
              }
              return;
            }
          }
        }
      }
    }
  }

  processBtn(btnTxt) {
    //touches OK
    if (btnTxt === "OK") {
      //console.log("Btn Ok: ", btnTxt);
      this.validate = true;
      return;
    }
    //
    else if (btnTxt === "DEL") {
      //console.log("Btn Del: ", btnTxt);
      this.validate = false;

      this.saisie[this.pointer] = "-";
      this.pointer -= 1;
      if (this.pointer < 0) {
        this.pointer = 0;
      }
      return;
    }
    //
    else {
      this.validate = false;
      this.saisie[this.pointer] = btnTxt;
      this.pointer += 1;

      if (this.pointer > this.pointerMax) {
        this.pointer = this.pointerMax;
      }
    }

  }

  afficheText(ctx) {
    ctx.fillStyle = this.textColor;
    ctx.font = `60px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = "middle";

    let txt = "";
    let tmp = [];

    for (let i = 0; i < this.saisie.length; i++) {
      tmp[i] = this.saisie[i];
    }
    //
    if (this.toggle) {
      tmp[this.pointer] = "  ";
    }
    for (let i = 0; i < this.saisie.length; i++) {
      txt += `${tmp[i]}`;
    }

    ctx.fillText(txt, this.screenWidth / 2, 100);
  }

  render(ctx) {
    ctx.save();
    //
    for (let r = 0; r < this.nbRow; r++) {
      for (let c = 0; c < this.tab[r].length; c++) {
        this.tab[r][c].render(ctx);
      }
    }
    //
    this.afficheText(ctx);
    //
    ctx.restore();
  }
}