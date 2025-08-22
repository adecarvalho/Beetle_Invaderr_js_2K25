import { getRandomFloat, getRandomInteger, drawFillCircle } from '../lib/ezLib.js';

//******************* */
//*** Part ********** */
//******************* */
export class Part {
    //
    constructor(xp, yp) {
        this.position = { x: xp, y: yp };
        this.velocity = { x: 0, y: 0 };
        this.radius = 3;
        this.color = 'RED';
        this.age = 0;
        this.maxAge = 60;
        this.state = 'LIVE';//'DEAD'
        //
        this.reset();
    }
    //
    reset(xp, yp) {
        this.position = { x: xp, y: yp };
        this.velocity.x = getRandomFloat(-120, 120);//-150,150
        this.velocity.y = getRandomFloat(-120, 120);//-150,150
        this.radius = getRandomFloat(2, 10);//5,20
        this.age = getRandomInteger(0, 10);
        this.maxAge = getRandomInteger(20, 70);
        this.state = 'LIVE';

    }
    //
    update(dt) {
        if (this.state === 'LIVE') {
            this.age += 1;
            //
            if (this.age > this.maxAge) {
                this.age = this.maxAge;
                this.radius *= 0.9;
                //
                if (this.radius < 1) {
                    this.state = 'DEAD';
                }
            }
            //
            this.position.x += dt * this.velocity.x;
            this.position.y += dt * this.velocity.y;
            //friction
            this.velocity.x *= 0.97;//0.95
            this.velocity.y *= 0.97;//0.95
        }
    }
    //
    render(ctx) {
        if (this.state === 'LIVE') {
            if (this.radius > 0) {
                //
                if (this.age < 20) {
                    this.color = 'WHITE';
                }
                //
                if (this.age >= 20 && this.age < 30) {
                    this.color = 'YELLOW';
                }
                //
                if (this.age >= 30 && this.age < 40) {
                    this.color = 'RED';
                }
                //
                if (this.age >= 40 && this.age < 45) {
                    this.color = 'ORANGE';
                }
                //
                if (this.age >= 45 && this.age < 60) {
                    this.color = "rgb(50,50,50)";
                }
                //
                if (this.age >= 60) {
                    this.color = 'rgb(40,40,40)';
                }

                drawFillCircle(ctx, this.position.x, this.position.y, this.radius, this.color);
            }
        }
    }
}
//end part
//******************** */
//*** Explosion ****** */
//******************** */
export class Explosion {
    //
    constructor(xp, yp, particules = 100) {
        this.position = { x: xp, y: yp };
        this.action = false;

        this.parts = [];
        //
        for (let i = 0; i < particules; i++) {
            this.parts.push(new Part(xp, yp));
        }
    }
    //
    play(xp, yp) {
        //
        for (let part of this.parts) {
            part.reset(xp, yp);
        }
        //
        this.action = true;
    }
    //
    isPlaying() {
        for (let part of this.parts) {
            if (part.state === 'LIVE') {
                return true;
            }
        }
        //
        return false;
    }
    //
    update(dt) {
        if (this.action) {
            for (let part of this.parts) {
                part.update(dt);
            }
        }
    }
    //
    render(ctx) {
        if (this.action) {
            for (let part of this.parts) {
                part.render(ctx);
            }
        }

    }
}
//end Explosion