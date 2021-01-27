const Explosion = function(e, x, y, startCount, size) {
  this.x = x;
  this.y = y;
  this.r = 4;
  this.startCount = startCount;
  this.size = size;

  this.show = function(e) {
    e.push();
    e.translate(this.x, this.y);
    e.noFill();
    e.stroke(255);
    e.strokeWeight(1);
    if(e.frameCount%3 === 0) {
      for(let i = 0; i < 10; i++){
        e.line(e.floor(e.random(0,size/2)), 0, e.floor(e.random(size/2,size*2)), 0);
        e.rotate(e.random(0,((4 * e.PI) / 10)));
      }

    }
    e.pop();
  }

}

export default Explosion