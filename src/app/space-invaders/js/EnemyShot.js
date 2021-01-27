const EnemyShot = function(e, x, y) {
  this.x = x;
  this.y = y;
  this.r = 4;
  this.toDelete = false;
  this.secondaryRGB = [255, 255, 0]

  this.show = function(e) {
    e.noStroke();
    e.fill(255, 255, 0)
    e.ellipse(this.x, this.y, this.r, this.r);
    e.push();
    let size = this.r * (e.random(1, 6))
    e.stroke(`rgba(${this.secondaryRGB[0]},${this.secondaryRGB[1]},${this.secondaryRGB[2]},.3) `);
    e.strokeWeight(size);
    e.noFill()
    e.ellipse(this.x, this.y, this.r/2, this.r*3);
    e.pop();
  }

  this.hits = function(e, ship) {
    let d = e.dist(this.x, this.y, ship.x+20, ship.y+15);
    if (d < this.r + 12) {
      return true;
    } else {
      return false;
    }
  }

  this.hitsBarrier = function(e, barrier) {
    let edgeOfLazer = this.x;
    let rightEdgeOfBarrier = barrier.x + barrier.w+5;
    let bottomLeftEdgeOfBarrier = barrier.y + barrier.h;

    if (edgeOfLazer >= barrier.x && edgeOfLazer < rightEdgeOfBarrier && this.y >= barrier.y && this.y <= bottomLeftEdgeOfBarrier) {
      return true
    } else {
      return false
    }
  }

  this.die = function () {
    this.toDelete = true;
  };

  this.move = function (e) {
    this.y = this.y + 7;
  };

}

export default EnemyShot