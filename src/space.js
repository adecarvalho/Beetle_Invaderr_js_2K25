import { getRandomInteger, drawFillRectangle, drawFillCircle, Vector2D } from '../lib/ezLib.js';
//
class Star {
    //
    constructor(screenWidth, screenHeight, xp = 0, yp = 0) {
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
        //
        this.position = new Vector2D(xp, yp);

        this.velocity = new Vector2D(0, 50);
        //
        this.radius = getRandomInteger(1, 3);
        this.color = 'rgb(250,250,250)';
    }
    //
    reset() {
        this.position.x = getRandomInteger(0, this.screenWidth);
        this.position.y = -10;
        this.velocity.y = getRandomInteger(5, 50);
        this.velocity.x = 0;
    }
    //
    update(dt) {
        this.position.x += (this.velocity.x) * dt;
        this.position.y += (this.velocity.y) * dt;
        //
        if (this.position.y >= this.screenHeight || this.position.x >= this.screenWidth) {
            this.reset();
        }
    }
    //
    render(ctx) {
        if (this.velocity.y >= 20) {
            this.color = 'rgb(255,255,255)';
        }
        if (this.velocity.y >= 10 && this.velocity.y < 20) {
            this.color = 'rgb(150,150,150)';
        }
        if (this.velocity.y < 10) {
            this.color = 'rgb(50,50,50)';
        }
        drawFillCircle(ctx, this.position.x, this.position.y, this.radius, this.color);
    }
}
//****************************** */
//
export class Space {
    #stars = [];
    //
    constructor(screenWidth, screenHeight) {
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
        //
        for (let i = 0; i < 50; i++) {
            this.#stars.push(new Star(screenWidth, screenHeight,
                getRandomInteger(0, screenWidth), getRandomInteger(0, screenHeight)));
        }
    }
    //
    update(dt) {
        for (let s of this.#stars) {
            s.update(dt);
        }
    }
    //
    render(ctx) {
        drawFillRectangle(ctx, 0, 0, this.screenWidth, this.screenHeight, 'rgb(50,50,50)');
        //
        for (let s of this.#stars) {
            s.render(ctx);
        }
    }
}
//end class