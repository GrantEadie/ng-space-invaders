const Barrier = function(e) {
  this.x = e.width/2;
  this.xdir = 0;

  this.show = function(e) {
    e.fill(255)
    e.rectMode(e.CENTER)
    e.rect(this.x, e.height-20, 10, 20)
  }

}

export default Barrier