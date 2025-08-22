import { theGame } from './main.js';
import { Entity, AnimationSprite } from '../lib/ezLib.js';
import { Laser } from './laser.js';
import { Explosion } from './explosion.js';
//
export class Ship extends Entity {
	//static
	static STATE_LIVE = "LIVE";
	static STATE_TOUCHED = "TOUCHED";
	static STATE_INVINCIBLE = "INVINCIBLE";
	//
	static DIRECTION_NONE = "NONE";
	static DIRECTION_LEFT = "LEFT";
	static DIRECTION_RIGHT = "RIGHT";

	//private
	#InvicibleDurationSeconds = 1.0;
	//
	constructor(screenWidth, screenHeight, xini = 0, yini = 0) {
		//
		super(xini, yini, theGame.getAssetManager().getImage('invinsible'));

		this.screenWidth = screenWidth;
		this.screenHeight = screenHeight;

		this.speedModule = 200;
		this.setState(Ship.STATE_LIVE);
		this.direction = Ship.DIRECTION_NONE;

		this.timer = 0;

		this.anim = new AnimationSprite(theGame.getAssetManager().getImage("player"), 4, 1, 0.08, false);
		//
		this.jets = new AnimationSprite(theGame.getAssetManager().getImage("playerJets"), 3, 1, false);

		this.boom = new Explosion(xini, yini);

		this.laserPool = []

		for (let i = 0; i < 5; i++) {
			this.laserPool.push(new Laser(screenWidth, screenHeight));
		}

		this.inflateRectBounds(6, 6);
	}
	//
	getLaserAvailable() {
		for (let item of this.laserPool) {
			if (item.getState() === Laser.STATE_ARMED) {
				return item;
			}
		}
		//
		return null;
	}
	//
	fire() {
		const st = this.getState();
		//
		if (st === Ship.STATE_LIVE || st === Ship.STATE_INVINCIBLE) {
			this.anim.play(0, 4);
			//
			const thelaser = this.getLaserAvailable();

			if (thelaser) {
				thelaser.fire(this.getCenterX(), this.getTop());
			}
		}
	}
	//
	move(dir) {
		switch (dir) {
			//
			case Ship.DIRECTION_LEFT:
				this.setVelocityXY(-this.speedModule, 0);
				this.direction = Ship.DIRECTION_LEFT;
				break;
			//
			case Ship.DIRECTION_RIGHT:
				this.setVelocityXY(this.speedModule, 0);
				this.direction = Ship.DIRECTION_RIGHT;
				break;

			default:
				this.stop();
				this.direction = Ship.DIRECTION_NONE;
				break;
		}
	}
	//
	stop() {
		this.setVelocityXY(0, 0);
		this.direction = Ship.DIRECTION_NONE;
	}
	//
	limites() {
		//
		if (this.getLeft() <= 0) {
			this.setLeft(0);
		}

		if (this.getRight() >= this.screenWidth) {
			this.setRight(this.screenWidth);
		}
	}
	//
	touched() {
		if (this.getState() == Ship.STATE_LIVE) {
			this.setState(Ship.STATE_TOUCHED);
			this.stop();
			this.boom.play(this.getCenterX(), this.getCenterY());
		}
	}
	//
	renderJets(ctx, xp, yp) {
		switch (this.direction) {
			case Ship.DIRECTION_NONE:
				this.jets.renderFrame(ctx, 1, xp, yp)
				break;
			//
			case Ship.DIRECTION_LEFT:
				this.jets.renderFrame(ctx, 0, xp, yp)
				break;
			//
			case Ship.DIRECTION_RIGHT:
				this.jets.renderFrame(ctx, 2, xp, yp)
				break;
			//
			default:
				this.jets.renderFrame(ctx, 1, xp, yp)
				break;
		}
	}
	//
	isCollisionWidthBomb(bomb) {
		if (this.getState() === Ship.STATE_LIVE && this.collidesWithRectBounds(bomb)) {
			this.touched();
			return true;
		}
		//
		return false;
	}
	//
	update(dt) {
		super.update(dt);
		//
		if (this.getState() === Ship.STATE_INVINCIBLE) {
			this.timer += dt;
			if (this.timer >= this.#InvicibleDurationSeconds) {
				this.setState(Ship.STATE_LIVE);
				this.timer = 0;
			}
		}
		//
		this.limites();
		//
		this.anim.update(dt);
		//
		for (let item of this.laserPool) {
			item.update(dt);
		}
		//
		this.boom.update(dt);
	}
	//
	render(ctx) {
		const st = this.getState();
		const xp = this.getLeft();
		const yp = this.getTop();

		//lasers
		for (let item of this.laserPool) {
			item.render(ctx);
		}
		//
		if (st === Ship.STATE_INVINCIBLE) {
			super.render(ctx);
		}

		//explosion
		if (st === Ship.STATE_TOUCHED) {
			this.boom.render(ctx);
			//
			if (this.boom.isPlaying() == false) {
				this.setState(Ship.STATE_INVINCIBLE);
			}
		}
		//live
		if (st === Ship.STATE_LIVE) {
			//jets
			this.renderJets(ctx, xp, yp);

			// ship
			if (this.anim.isPlaying()) {
				//this.anim.renderAllAnimation(ctx, xp, yp);
				this.anim.renderAnimation(ctx, xp, yp);
			}
			else {
				this.anim.renderFrame(ctx, 0, xp, yp);
			}
		}
		//super.renderRectBoundsDebug(ctx);
	}
}
//end class