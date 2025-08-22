import { Entity } from "../lib/ezLib.js";
import { theGame } from "./main.js";
//
export class Bomb extends Entity {
    //static
    static STATE_ARMED = "ARMED";
    static STATE_FIRED = "FIRED";
    static SPEED = 250;
    //
    constructor(screenWidth, screenHeight) {
        super(0, 0, theGame.getAssetManager().getImage('bomb'));

        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
        this.setState(Bomb.STATE_ARMED);
        this.reset();
    }
    //
    fire(xc, yc) {
        if (this.getState() === Bomb.STATE_ARMED) {
            this.setState(Bomb.STATE_FIRED);
            this.setCenterX(xc);
            this.setCenterY(yc);
            this.setVelocityY(Bomb.SPEED);
        }
    }
    //
    reset() {
        this.setState(Bomb.STATE_ARMED);
        this.setVelocityXY(0, 0);
        this.setPositionXY(2 * this.screenWidth, this.screenHeight);
    }
    //
    update(dt) {
        super.update(dt);
        //bottom
        if (this.getBottom() > this.screenHeight) {
            this.reset();
        }
    }
    //
    render(ctx) {
        super.render(ctx);
    }
}
//end class