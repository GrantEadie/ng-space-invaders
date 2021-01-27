import Lazer from './Lazer';

const Ship = function(e) {
  this.x = e.width/2;
  this.y = e.height-20
  this.xdir = 0;
  this.lazerInterval = 10;
  this.lastLazerFiredTimeStamp = this.lazerInterval;
  this.w = 40;
  this.h = 10;
  this.playerLife = 3;
  this.gameOver = false;
  this.deathAnimation = false;
  this.deathFrameCapture = e.frameCount;
  this.resetInvinsible = false;

  this.show = function(e) {
    e.noFill()
    e.rect(this.x, this.y, this.w, this.h)
    e.triangle(this.x+12.5, e.height-20, this.x + 20, e.height - 27.5, this.x+27.5, e.height-20 )
  }

  this.setDir = function(dir) {
    this.xdir = dir;
  }

  this.move = function(e) {
      this.x += this.xdir*3;
  }

  this.die = function(e) {
    this.playerLife -= 1;
    this.deathAnimation = true;
    this.resetInvinsible = true;
    this.deathFrameCapture = e.frameCount;
    if (this.playerLife < 0) {
      this.gameOver = true
    }
  };
}

export default Ship