export class Btn {
    constructor(xp = 0, yp = 0, w = 20, h = 20, txt = "A") {
        this.xp = xp;
        this.yp = yp;
        this.w = w;
        this.h = h;
        this.txt = txt;
        this.font = "30px Arial";
        this.colorReleased = 'rgb(51,51,51)';
        this.colorPressed = 'rgb(200,200,200)'
        this.state = "OFF"; //"ON" or OFF
    }

    setPressed() {
        this.state = "ON";
    }

    setReleased() {
        this.state = "OFF";
    }

    debug() {
        const res = `xp: ${this.xp} yp:${this.yp} w:${this.w} h:${this.h} txt:${this.txt} state:${this.state}`;
        console.log(res);
    }

    isContainsPoints(xm, ym) {
        if (xm >= this.xp && xm <= (this.xp + this.w) && ym >= this.yp && ym <= (this.yp + this.h)) {
            return true;
        }
        return false;
    }

    render(ctx) {
        ctx.save();

        if (this.state === "ON") {
            //
            ctx.fillStyle = this.colorReleased;
            ctx.fillRect(this.xp, this.yp, this.w, this.h);
            //
            ctx.font = this.font;
            ctx.textAlign = 'center';
            ctx.textBaseline = "middle";
            ctx.fillStyle = this.colorPressed;
            ctx.fillText(this.txt, this.xp + this.w / 2, this.yp + this.h / 2);
            //
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'rgb(255,250,250)';
            ctx.strokeRect(this.xp, this.yp, this.w - 2, this.h - 2);

        } else {
            const linear = ctx.createLinearGradient(this.xp, this.yp, this.xp + this.w, this.yp);
            linear.addColorStop(0, 'rgb(255,250,250)');
            linear.addColorStop(1, 'rgb(80,80,80)');

            //ctx.fillStyle = this.colorPressed;
            ctx.fillStyle = linear;
            ctx.fillRect(this.xp, this.yp, this.w, this.h);
            //
            ctx.font = this.font;
            ctx.textAlign = 'center';
            ctx.textBaseline = "middle";
            ctx.fillStyle = this.colorReleased;
            ctx.fillText(this.txt, this.xp + this.w / 2, this.yp + this.h / 2);
            //
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'rgb(51,51,51)';
            ctx.strokeRect(this.xp, this.yp, this.w, this.h);
        }
        //
        ctx.restore();

    }
}