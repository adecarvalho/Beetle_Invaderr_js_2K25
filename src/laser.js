import { Entity } from '../lib/ezLib.js';
import { theGame } from './main.js';
//
export class Laser extends Entity {
    static STATE_ARMED = "ARMED";
    static STATE_FIRED = "FIRED";
    static SPEED = 500;
    //
    constructor(screenWidth, screenHeight) {
        super(0, 0, theGame.getAssetManager().getImage('laser'));

        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
        this.reset();
    }
    //
    reset() {
        this.setPositionXY(this.screenWidth * 2, 0);
        this.setVelocityXY(0, 0);
        this.setState(Laser.STATE_ARMED);
    }
    //
    fire(xf, yf) {
        if (this.getState() === Laser.STATE_ARMED) {
            this.setState(Laser.STATE_FIRED);
            this.setCenterX(xf);
            this.setCenterY(yf);
            this.setVelocityXY(0, -Laser.SPEED);
        }
    }
    //
    update(dt) {
        super.update(dt);
        //
        if (this.getBottom() < 0) {
            this.reset();
        }
    }
    //
    render(ctx) {
        super.render(ctx);
        //
        //super.renderRectBoundsDebug(ctx);
    }
}
//end class