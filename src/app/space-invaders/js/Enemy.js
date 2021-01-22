const Enemy = function (e, x, y, r) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.toDelete = false;

  this.xdir = 10;

  this.shiftDown = function () {
    this.xdir *= -1;
    this.y += 1;
  }

  this.show = function (e) {
    e.fill(0);
    e.stroke(255);
    e.ellipse(this.x, this.y, this.r * 2, this.r * 2);
  };

  this.die = function (e) {
    this.toDelete = true;
  };

  this.move = function (e, speed) {
    if (e.frameCount%speed === 0) {
    this.x = this.x + this.xdir;
    }
  }
};

export default Enemy;