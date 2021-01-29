const BarrierBlock = function(x, y, w, h) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;

  this.show = function(e) {
    e.push()
    e.fill(255)
    e.stroke(255);
      e.strokeWeight(e.random(1, 2));
    e.rect(this.x, this.y, this.w, this.h)
    e.pop()
  }
}

export default BarrierBlock