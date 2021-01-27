const Lazer = function(e, x, y) {
  this.x = x;
  this.y = y;
  this.r = 4;
  this.toDelete = false;
  this.secondaryRGB = [255, 0, 0]


  this.show = function(e) {
    e.push()
    e.noStroke();
    e.fill(255, 0, 0)
    e.rect(this.x, this.y, this.r/4, this.r*3)
    e.pop()
    e.push();
    let size = this.r * (e.random(1, 6))
    e.stroke(`rgba(${this.secondaryRGB[0]},${this.secondaryRGB[1]},${this.secondaryRGB[2]},.3) `);
    e.strokeWeight(size);
    e.noFill()
    e.ellipse(this.x, this.y+20, this.r/2, this.r*3);
    e.pop();
  }

  this.hits = function(e, enemy) {
    let d = e.dist(this.x, this.y, enemy.x, enemy.y);
    if (d < this.r + enemy.r) {
      return true;
    } else {
      return false;
    }
  }

  this.hitsBarrier = function(e, barrier) {
    let edgeOfLazer = this.x+this.r;
    let rightEdgeOfBarrier = barrier.x + barrier.w+5;
    let bottomLeftEdgeOfBarrier = barrier.y + barrier.h;

    if (edgeOfLazer >= barrier.x && edgeOfLazer < rightEdgeOfBarrier && this.y >= barrier.y && this.y <= bottomLeftEdgeOfBarrier) {
      return true
    } else {
      return false
    }
  }

  this.hitsShot = function(e, enemyShot) {
    let d = e.dist(this.x, this.y, enemyShot.x, enemyShot.y);
    if (d < this.r + enemyShot.r) {
      return true;
    } else {
      return false;
    }
  }

  this.die = function () {
    this.toDelete = true;
  };

  this.move = function (e) {
    this.y = this.y - 10;
  };

}

export default Lazer