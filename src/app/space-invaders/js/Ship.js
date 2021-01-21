const Ship = function(e) {
  this.x = e.width/2;

  this.show = function(e) {
    e.fill(255)
    e.rectMode(e.CENTER)
    e.rect(this.x, e.height-20, 20, 20)
  }

  this.move = function(dir) {
    this.x += dir*5;
  }
}

export default Ship