const Lazer = function(e, x, y) {
  this.x = x;
  this.y = y;
  this.r = 4;
  this.toDelete = false;

  this.show = function(e) {
    e.push()
    e.noStroke();
    e.fill(255, 0, 0)
    e.rect(this.x, this.y, this.r/4, this.r*3)
    e.pop()
  }

  this.hits = function(e, enemy) {
    let d = e.dist(this.x, this.y, enemy.x, enemy.y);
    if (d < this.r + enemy.r) {
      return true;
    } else {
      return false;
    }
  }

  this.die = function () {
    this.toDelete = true;
  };

  this.move = function (e) {
    this.y = this.y - 8;
  };

}

export default Lazer