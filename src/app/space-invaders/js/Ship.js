import Lazer from "./Lazer";

const Ship = function (e) {
  this.x = e.width / 2;
  this.y = e.height - 20;
  this.xdir = 0;
  this.lazerInterval = 10;
  this.lastLazerFiredTimeStamp = this.lazerInterval;
  this.w = 60;
  this.h = 10;
  this.playerLife = 3;
  this.gameOver = false;
  this.deathAnimation = false;
  this.deathFrameCapture = e.frameCount;
  this.resetInvinsible = false;

  this.show = function (e) {
    e.push();
    e.noFill();
    e.stroke(255);
    e.strokeWeight(e.random(1, 2));
    e.rect(this.x, this.y, this.w, this.h);
    e.triangle(
      this.x + 15,
      e.height - 20,
      this.x + 30,
      e.height - 27.5,
      this.x + 45,
      e.height - 20
    );
    e.pop();

    e.push();
    e.stroke("red");
    e.strokeWeight(2);
    e.point(this.x, this.y);
    e.pop();

    e.push();
    e.stroke("red");
    e.strokeWeight(2);
    e.point(this.x + this.w, this.y);
    e.pop();
  };

  this.setDir = function (dir) {
    this.xdir = dir;
  };

  this.move = function (e) {
    this.x += this.xdir * 3;
  };

  this.die = function (e) {
    this.playerLife -= 1;
    this.deathAnimation = true;
    this.resetInvinsible = true;
    this.deathFrameCapture = e.frameCount;
    if (this.playerLife < 0) {
      this.gameOver = true;
    }
  };
};

export default Ship;
