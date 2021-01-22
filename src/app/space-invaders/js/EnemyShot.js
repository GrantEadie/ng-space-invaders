const EnemyShot = function(e, x, y) {
  this.x = x;
  this.y = y;
  this.r = 4;
  this.toDelete = false;

  this.show = function(e) {
    e.noStroke();
    e.fill(255, 0, 0)
    e.rect(this.x, this.y, this.r/4, this.r*3)
  }

  this.hits = function(e, ship) {
    let d = e.dist(this.x, this.y, ship.x, ship.y);
    if (d < this.r + ship.r) {
      return true;
    } else {
      return false;
    }
  }

  this.die = function () {
    this.toDelete = true;
  };

  this.move = function (e) {
    this.y = this.y + 8;
  };

}

export default EnemyShot