import EnemyShot from "./EnemyShot";
import Explosion from "./Explosion";

const GameDrawing = function () {
  this.textPlayerLife = function (e, ship) {
    e.push();
    e.noStroke();
    e.fill(255);
    e.textSize(15);
    e.text("life " + ship.playerLife, e.width - 50, 30);
    e.pop();
  };

  this.drawMenu = function (e, barrier) {
    e.background(0);
    e.noStroke();
    e.fill(255);
    e.textAlign(e.CENTER);
    e.textSize(15);

    let msgPress = "PRESS ENTER TO START";

    e.text(msgPress, e.width / 2, e.height / 2);

    for (let i = 0; i < barrier.length; i++) {
      for (let j = 0; j < barrier[i].length; j++) {
        barrier[i][j].show(e);
      }
    }

    // e.text(msgOption, ((_cols/2)*_scl), ((_rows/2)*_scl));
  };

  this.gameOver = function (e) {
    e.background(255);
    e.noStroke();
    e.textAlign(e.CENTER);
    e.textSize(15);

    let msgPress = "GAME OVER";

    e.text(msgPress, e.width / 2, e.height / 2);
  };

  this.drawGame = function (
    e,
    ship,
    enemies,
    explosion,
    enemyShot,
    lazers,
    barrier
  ) {
    e.background(0);
    // create ship

    this.textPlayerLife(e, ship);
    if (ship.deathAnimation) {
      if (e.frameCount - ship.deathFrameCapture > 60) {
        ship.deathAnimation = false;
      }
    } else if (ship.resetInvinsible) {
      if (e.frameCount - ship.deathFrameCapture < 200) {
        if (e.frameCount % 10 > 5) {
          ship.show(e);
        }
        ship.move(e);
      } else {
        ship.resetInvinsible = false;
      }
    } else {
      ship.show(e);
      ship.move(e);
    }
    let edge = false;

    // Move ship
    if (ship.x < 0) {
      ship.x += 5;
    } else if (ship.x > e.width) {
      ship.x -= 5;
    }

    // Enemy Guns
    for (let i = 0; i < enemies.length; i++) {
      // let randomEnemyShot = e.round(e.random(0, enemies.length));

      if (e.abs(enemies[i].x - ship.x - 20) < 40) {
        if (e.frameCount % e.round(e.random(150, 400)) === 0) {
          let shot = new EnemyShot(e, enemies[i].x, enemies[i].y);
          enemyShot.push(shot);
        }
      }
    }

    for (let i = enemyShot.length - 1; i > 0; i--) {
      enemyShot[i].show(e);
      enemyShot[i].move(e);
      if (enemyShot[i].y > e.height) {
        enemyShot[i].die(e);
      }
      if (enemyShot[i].hits(e, ship) && !ship.resetInvinsible) {
        enemyShot.splice(0, enemyShot.length);
        explosion.push(new Explosion(e, ship.x + 20, ship.y, e.frameCount, 30));
        ship.die(e);
        break;
      }
      for (let j = 0; j < barrier.length; j++) {
        for (let k = 0; k < barrier[j].length; k++) {
          if (enemyShot[i].hitsBarrier(e, barrier[j][k])) {
            barrier[j].splice(k, 1);
            enemyShot[i].die(e)
            // enemyShot.splice(i, 1);
            break;
          }
        }
      }
    }

    for (let i = 0; i < barrier.length; i++) {
      for (let j = 0; j < barrier[i].length; j++) {
        barrier[i][j].show(e);
      }
    }

    // Lazer show and hit
    for (let i = 0; i < lazers.length; i++) {
      lazers[i].show(e);
      lazers[i].move(e);
      if (lazers[i].y <= 0) {
        lazers[i].die(e);
      }
      for (let j = 0; j < enemies.length; j++) {
        if (lazers[i].hits(e, enemies[j])) {
          enemies[j].die(e);
          lazers[i].die(e);
          explosion.push(
            new Explosion(e, enemies[j].x, enemies[j].y, e.frameCount, 15)
          );
        }
      }
      for (let j = 0; j < barrier.length; j++) {
        for (let k = 0; k < barrier[j].length; k++) {
          if (lazers[i].hitsBarrier(e, barrier[j][k])) {
            barrier[j].splice(k, 1);
            lazers[i].die(e)
            break;
          }
        }
      }
      // Enemy Shots hit Ship Lazer 
      for (let j = 0; j < enemyShot.length; j++) {
        if (lazers[i].hitsShot(e, enemyShot[j])) {
          enemyShot[j].die(e)
          lazers[i].die(e)
          explosion.push(
            new Explosion(e, enemyShot[j].x, enemyShot[j].y, e.frameCount, 7)
          );
        }
      }
    }

    for (let i = 0; i < explosion.length; i++) {
      if (e.frameCount < explosion[i].startCount + 30) {
        explosion[i].show(e);
      } else {
        explosion.slice(i, 1);
      }
    }

    // Show and move Enemies
    for (let i = 0; i < enemies.length; i++) {
      enemies[i].show(e);
      enemies[i].move(e, 25);
      if (enemies[i].x > e.width || enemies[i].x < 10) {
        edge = true;
      }
    }
    //Move enemies down if on edge
    if (edge) {
      for (let j = 0; j < enemies.length; j++) {
        enemies[j].shiftDown(e);
      }
      edge = false;
    }
    //Remove enemy from the array if hit
    for (let i = enemies.length - 1; i >= 0; i--) {
      if (enemies[i].toDelete) {
        enemies.splice(i, 1);
      }
    }
    //Remove Lazer from the array if hit
    for (let i = lazers.length - 1; i >= 0; i--) {
      if (lazers[i].toDelete) {
        lazers.splice(i, 1);
      }
    }

    for (let i = enemyShot.length - 1; i >= 0; i--) {
      if (enemyShot[i].toDelete) {
        enemyShot.splice(i, 1);
      }
    }
  };
};

export default GameDrawing;
