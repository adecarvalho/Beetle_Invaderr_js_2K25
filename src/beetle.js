import { Entity, getRandomFloat, AnimationSprite } from "../lib/ezLib.js";
import { theGame } from "./main.js";
//
export class Beetle extends Entity {
    //static
    static STATE_LIVE = "LIVE";
    static STATE_TOUCHED = "TOUCHED";
    static STATE_DEAD = "DEAD";
    //
    static TYPE_1 = 1;
    static TYPE_2 = 2;
    static TYPE_3 = 3;
    static TYPE_4 = 4;
    //
    constructor(xp, yp, type = Beetle.TYPE_1) {
        super(xp, yp, undefined, 80, 80);

        this.type = type;
        this.setState(Beetle.STATE_LIVE);
        this.timer = 0;
        this.xinit = xp;
        this.yinit = yp;

        this.anim = undefined;

        switch (this.type) {
            //
            case Beetle.TYPE_1:
                this.anim = new AnimationSprite(theGame.getAssetManager().getImage('beetle_1'), 3, 1, 0.1, false);
                break;
            //
            case Beetle.TYPE_2:
                this.anim = new AnimationSprite(theGame.getAssetManager().getImage('beetle_2'), 3, 1, 0.1, false);
                break;
            //
            case Beetle.TYPE_3:
                this.anim = new AnimationSprite(theGame.getAssetManager().getImage('beetle_3'), 3, 1, 0.1, false);
                break;
            //
            case Beetle.TYPE_4:
                this.anim = new AnimationSprite(theGame.getAssetManager().getImage('beetle_4'), 3, 1, 0.1, false);
                break;

            default:
                break;
        }
        //
        this.inflateRectBounds(5, 5);
    }
    //
    reset() {
        this.setState(Beetle.STATE_LIVE);
        this.setPositionXY(this.xinit, this.yinit);
        this.timer = 0;
    }
    //
    touched() {
        this.setState(Beetle.STATE_TOUCHED);
        this.anim.play(0, 2);
    }
    //
    move(dx, dy) {
        if (this.getState() === Beetle.STATE_LIVE) {
            const xn = this.getLeft() + dx;
            const yn = this.getTop() + dy;

            this.setPositionXY(xn, yn);
        }
    }
    //
    update(dt) {
        const dx = getRandomFloat(-20, 20);
        const dy = getRandomFloat(-20, 20);
        this.setVelocityXY(dx, dy);
        //
        super.update(dt);
        //
        this.anim.update(dt);
    }
    //
    render(ctx) {
        const st = this.getState();

        const xp = this.getLeft();
        const yp = this.getTop();

        if (st === Beetle.STATE_LIVE) {
            this.anim.renderFrame(ctx, 0, xp, yp);
        }
        else if (st === Beetle.STATE_TOUCHED) {
            this.anim.renderAnimation(ctx, xp, yp);
            //
            if (this.anim.isPlaying() == false) {
                this.setState(Beetle.STATE_DEAD);
            }
        }
        //
        // super.renderRectBoundsDebug(ctx);
    }
}
//end class