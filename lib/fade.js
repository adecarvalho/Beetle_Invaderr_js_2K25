import { drawFillRectangle, drawFillCircle } from './ezLib.js';

//
export class WindowFadeOut {
    constructor(screenWidth, screenHeight) {
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
        this.speed = 200;
        this.go = false;
        this.finished = false;
        this.size = screenHeight;
    }
    //
    isFinished() {
        return this.finished;
    }
    //
    isStarted() {
        return this.go;
    }
    //
    start(speed = 500) {
        this.go = true;
        this.size = this.screenHeight;
        this.speed = speed;
    }
    //
    update(dt) {
        this.size -= this.speed * dt;
        if (this.size <= 0) {
            this.speed = 0;
            this.finished = true;
        }
    }
    //
    render(ctx) {
        if (this.isFinished() == false) {
            drawFillRectangle(ctx, 0, 0, this.screenWidth, this.size, "rgb(20,20,20)");
        }
    }
}
//
export class RectangleFadeOut {
    constructor(screenWidth, screenHeight) {
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
        this.position = { x: 0, y: 0 };
        this.velocity = { x: 200, y: 100 };
        this.size = { w: screenWidth, h: screenHeight };
        this.finished = false;
        this.go = false;
    }
    start(dx = 200, dy = 200) {
        this.position = { x: 0, y: 0 };
        this.velocity = { x: dx, y: dy };
        this.size = { w: this.screenWidth, h: this.screenHeight };
        this.finished = false;
        this.go = true;
    }
    //
    isStarted() {
        return this.go;
    }
    //
    isFinished() {
        return this.finished;
    }
    //
    update(dt) {
        if (this.go === false) {
            return;
        }
        this.position.x += this.velocity.x * dt;
        this.position.y += this.velocity.y * dt;
        this.size.w = this.screenWidth - (2 * this.position.x);
        this.size.h = this.screenHeight - (2 * this.position.y);
        //
        if (this.size.w < 0 || this.size.h < 0) {
            this.velocity.x = 0;
            this.velocity.y = 0;
            this.size.w = 0;
            this.size.h = 0;
            this.finished = true;
        }
    }
    //
    render(ctx) {
        if (this.go) {
            drawFillRectangle(ctx, this.position.x, this.position.y, this.size.w, this.size.h, 'rgb(20,20,20)');
        }

    }
}
//end fade out

//
export class CircleFadeIn {
    constructor(screenWidth, screenHeight) {
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
        this.position = {
            x: screenWidth / 2,
            y: screenHeight / 2
        };
        this.velocity = 300;
        this.radius = 0;
        this.finished = false;
        this.go = false;
    }
    //
    start(speed = 400) {
        this.velocity = speed;
        this.radius = 0;
        this.finished = false;
        this.go = true;
    }
    //
    isStarted() {
        return this.go;
    }
    //
    isFinished() {
        return this.finished;
    }
    //
    update(dt) {
        if (this.go === false) {
            return;
        }
        //
        this.radius += this.velocity * dt;
        if (this.radius > 1.4 * this.screenWidth || this.radius > 1.4 * this.screenHeight) {
            this.velocity = 0;
            this.finished = true;
        }
    }
    //
    render(ctx) {
        if (this.go) {
            drawFillCircle(ctx, this.position.x, this.position.y, this.radius, "rgb(20,20,20)");
        }

    }
}
//end fadeIn