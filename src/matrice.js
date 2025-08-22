import { getRandomInteger, Vector2D } from "../lib/ezLib.js";
import { Beetle } from './beetle.js'
import { Bomb } from "./bomb.js";
import { Laser } from "./laser.js";
import { Ship } from "./ship.js";
//
export class Matrice {
	constructor(xp, yp, screenWidth, screenHeight) {
		this.screenWidth = screenWidth;
		this.screenHeight = screenHeight;

		this.nbCols = 6;
		this.nbRows = 3;

		this.xinit = xp;
		this.yinit = yp;
		this.gapX = 10;
		this.gapY = 5;
		this.timer = 0;
		this.periode = 0.5;

		this.beetles = [];

		this.velocity = new Vector2D(5, 10);

		this.bound = {
			xb: xp,
			yb: yp,
			wb: 490,
			hb: 250
		}
		//
		this.bomb = new Bomb(screenWidth, screenHeight);
		//
		this.level = [[1, 2, 1, 1, 2, 1], [2, 3, 3, 3, 2, 2], [4, 1, 2, 3, 4, 2]];
		//
		this.create();
	}
	//
	create() {
		let x = 0;
		let y = 0;
		let num = 0;

		for (let r = 0; r < this.nbRows; r++) {
			for (let c = 0; c < this.nbCols; c++) {
				num = this.level[r][c];
				x = 80 * c + this.gapX + this.xinit;
				y = 80 * r + this.gapY + this.yinit;
				//
				switch (num) {
					//
					case 1:
						this.beetles.push(new Beetle(x, y, Beetle.TYPE_1));
						break;
					//
					case 2:
						this.beetles.push(new Beetle(x, y, Beetle.TYPE_2));
						break;
					//
					case 3:
						this.beetles.push(new Beetle(x, y, Beetle.TYPE_3));
						break;
					//
					case 4:
						this.beetles.push(new Beetle(x, y, Beetle.TYPE_4));
						break;

					default:
						this.beetles.push(new Beetle(x, y, Beetle.TYPE_1));
						break;
				}
			}
		}
	}
	//
	reset() {
		this.velocity.x *= 1.2;
		this.velocity.y *= 1.2;
		this.bomb.reset();
		this.bound.xb = this.xinit;
		this.bound.yb = this.yinit;
		this.create();
	}
	//
	move_x() {
		this.bound.xb += this.velocity.x;
		//
		for (let beetle of this.beetles) {
			beetle.move(this.velocity.x, 0);
		}
	}
	//
	move_y() {
		this.bound.yb += this.velocity.y;
		//
		for (let beetle of this.beetles) {
			beetle.move(0, this.velocity.y);
		}
	}
	//
	beetleInFront() {
		let beetle = undefined;
		//
		let index = getRandomInteger(0, this.beetles.length - 1);

		beetle = this.beetles[index];
		//
		if (beetle != undefined && beetle.getState() === Beetle.STATE_LIVE) {
			return beetle;
		}
		//
		return undefined;
	}
	//
	fireBomb() {
		const beetle = this.beetleInFront();

		if (beetle != undefined) {
			this.bomb.fire(beetle.getCenterX(), beetle.getBottom());
		}
	}
	//
	isAllDestroy() {
		for (let beetle of this.beetles) {
			if (beetle.getState() === Beetle.STATE_LIVE || beetle.getState() === Beetle.STATE_TOUCHED) {
				return false;
			}
		}

		return true;
	}
	//
	isCollisionWithShip(ship, score = undefined) {
		//
		if (ship.getState() !== Ship.STATE_LIVE) {
			return false;
		}
		else {
			for (let beetle of this.beetles) {
				for (let laser of ship.laserPool) {
					if (beetle.getState() === Beetle.STATE_LIVE && laser.getState() === Laser.STATE_FIRED
						&& laser.collidesWithRectBounds(beetle)) {
						laser.reset();
						//
						beetle.touched();
						//
						if (score !== undefined) {
							score.incrementsPoints(10, beetle.getCenterX(), beetle.getCenterY(), 0, -100)
						}
						return true;
					}
				}
			}
		}
		return false;
	}
	//
	update(dt) {
		this.timer += dt;

		if (this.timer > this.periode) {
			this.move_x();
			this.timer = 0;
		}
		//
		//limite right
		if ((this.bound.xb + this.bound.wb) > this.screenWidth) {
			this.move_y();
			this.velocity.x = -this.velocity.x;
			this.move_x();
		}

		//limite left
		if (this.bound.xb < 0) {
			this.move_y();
			this.velocity.x = -this.velocity.x;
			this.move_x();
		}
		//limite bottom
		if ((this.bound.yb + this.bound.hb) > this.screenHeight) {
			this.bound.yb = this.screenHeight - this.bound.hb;
		}
		//
		for (let beetle of this.beetles) {
			beetle.update(dt);
			//
			if (beetle.getBottom() > this.screenHeight) {
				beetle.setBottom(this.screenHeight);
			}
		}
		//bomb
		this.bomb.update(dt);
	}
	//
	render(ctx) {
		//
		for (let beetle of this.beetles) {
			beetle.render(ctx);
		}
		//bomb
		this.fireBomb();
		this.bomb.render(ctx);
	}
}
//end class