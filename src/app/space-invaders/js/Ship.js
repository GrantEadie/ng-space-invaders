import Lazer from './Lazer';

const Ship = function(e) {
  this.x = e.width/2;
  this.xdir = 0;
  this.lazerInterval = 10;
  this.lastLazerFiredTimeStamp = this.lazerInterval;

  this.show = function(e) {
    e.noFill()
    e.rect(this.x, e.height-20, 40, 10)
    e.triangle(this.x+12.5, e.height-20, this.x + 20, e.height - 27.5, this.x+27.5, e.height-20 )
  }

  this.setDir = function(dir) {
    this.xdir = dir;
  }

  this.move = function(e) {
      this.x += this.xdir*3;
  }
}

export default Ship