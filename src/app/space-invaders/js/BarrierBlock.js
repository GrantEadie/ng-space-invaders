const BarrierBlock = function(x, y, w, h) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;

  this.show = function(e) {
    e.fill(255)
    e.noStroke()
    e.rect(this.x, this.y, this.w, this.h)
  }
}

export default BarrierBlock