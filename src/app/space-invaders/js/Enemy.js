const Enemy = function(e, x, y) {
  this.x = x;
  this.y = y;

  this.show = function(e) {
    e.fill(255, 0, 255)
    e.rectMode(e.CENTER)
    e.ellipse(this.x, this.y, 20, 20)
  }

}

export default Enemy