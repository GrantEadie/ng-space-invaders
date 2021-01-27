const SpritesDrawing = function(x, y, currDesign, pixelWidth, pixelHeightRatio, color) {
  this.x = x;
  this.y = y;
  this.currDesign = currDesign;
  this.pixelWidth = pixelWidth;
  this.pixelHeightRatio = pixelHeightRatio;
  this.color = color;

  this.drawSprite = function(e) {
    e.noStroke();
    for (let i = 0; i < this.currDesign.length; i++) {
      for (let j = 0; j < this.currDesign[i].length; j++) {
        if (this.currDesign[i][j] == 1) {
          let posx = this.x + (j * this.pixelWidth);
          let posy = this.y + (i * this.pixelWidth * this.pixelHeightRatio);
          e.push()
          e.fill(255)
          e.rect(posx, posy, pixelWidth, (this.pixelWidth*this.pixelHeightRatio))
          e.pop()
        }
      }
    }
  }
}

export default SpritesDrawing