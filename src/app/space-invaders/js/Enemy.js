const Enemy = function (e, x, y, r, shape) {
  this.redShadow = "rgba(255, 0, 0, .6)";

  this.shapeArray = ["circle", "triangle", "circle", "square"];
  this.shapeType = this.shapeArray[shape];
  this.x = x;

  if (this.shapeType === 'triangle') {
    this.y = y-20;
  } else {
    this.y = y;
  }
  
  this.r = r;
  this.toDelete = false;
  this.triangle = function (e, x, y, r, color) {
    e.fill(color)
    e.stroke(color)
    e.strokeWeight(e.random(1, 2));
    e.triangle(x - 2 * r, y + 4 * r, x, y, x + 2 * r, y + 4 * r);
  };

  this.square = function (e, x, y, r, color, shadowColor) {

    //drop shadow
    e.push()
    e.rectMode(e.CENTER)
    e.fill(shadowColor)
    e.stroke(shadowColor)
    e.strokeWeight(e.random(1, 1.5))
    e.rect(x-2, y+2, 25, 25)
    e.pop()

    //actual drawing
    e.push()
    e.rectMode(e.CENTER)
    e.fill(0)
    e.stroke(color)
    e.strokeWeight(e.random(1, 2))
    e.rect(x, y, 25, 25)
    e.pop()
  }

  this.xdir = 10;

  this.shiftDown = function () {
    this.xdir *= -1;
    this.y += 1;
  };

  this.show = function (e) {
    if (this.shapeType === "circle") {
      e.push();
      e.strokeWeight(e.random(1, 1.5));
      e.fill("rgba(255, 0, 0, .6)");
      e.ellipse(this.x - 2, this.y + 2, this.r * 4, this.r * 4);
      e.pop();
      e.push();
      e.fill(0);
      e.stroke(255);
      e.strokeWeight(e.random(1, 1.5));
      e.ellipse(this.x, this.y, this.r * 4, this.r * 4);
      e.pop();
    }
    if (this.shapeType === "triangle") {
      e.push();
      this.triangle(e, this.x - 2, this.y + 2, this.r, this.redShadow);
      this.triangle(e, this.x, this.y, this.r, 255);
      e.pop();
    }
    if (this.shapeType === 'square') {
      e.push()
      this.square(e, this.x, this.y, this.r, 255, this.redShadow);
      e.pop()
    }
  };

  this.die = function (e) {
    this.toDelete = true;
  };

  this.move = function (e, speed) {
    if (e.frameCount % speed === 0) {
      this.x = this.x + this.xdir;
    }
  };
};

export default Enemy;
