const Explosion = function(e, x, y, startCount) {
  this.x = x;
  this.y = y;
  this.r = 4;
  this.startCount = startCount;

  this.show = function(e) {
    e.push();
    e.translate(this.x, this.y);
    e.noFill();
    e.stroke(255);
    e.strokeWeight(1);
    if(e.frameCount%3 === 0) {
      for(let i = 0; i < 10; i++){
        e.line(e.floor(e.random(0,10)), 0, e.floor(e.random(10,20)), 0);
        e.rotate(e.random(0,((4 * e.PI) / 10)));
      }

    }
    e.pop();
  }

}

export default Explosion