const Barrier = function(x, y, w, h) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;

  this.show = function(e) {
    e.stroke(255)
    e.rect(this.x, this.y, this.w, this.h)
  }
}

export default Barrier