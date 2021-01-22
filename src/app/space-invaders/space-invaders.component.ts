import { Component, OnInit } from '@angular/core';
import * as p5 from 'p5';
import Ship from './js/Ship';
import Enemy from './js/Enemy';
import Lazer from './js/Lazer';
import Barrier from './js/Barrier';
import Explosion from './js/Explosion'

@Component({
  selector: 'app-space-invaders',
  templateUrl: './space-invaders.component.html',
  styleUrls: ['./space-invaders.component.css']
})
export class SpaceInvadersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    let ship: any;
    let barriers: any = [];
    let enemies: any = [];
    let lazers: any = [];
    let explosion: any = [];

    const sketch = (e: any) => {

      e.preload = () => {

      }

      e.setup = () => {
        e.createCanvas(600, 400);
        e.noSmooth();
        e.frameRate(60)
        ship = new Ship(e);
        for (let i = 0; i < 11; i++) {
          enemies[i] = new Enemy(e, i * 30 + 30, 60, 6);
        }
        for (let i = 0; i < 11; i++) {
          enemies[i + 11] = new Enemy(e, i * 30 + 30, 90, 9);
        }
        for (let i = 0; i < 11; i++) {
          enemies[i + 22] = new Enemy(e, i * 32 + 22, 125, 12);
        }
      };

      e.draw = () => {
        e.background(0);
        ship.show(e);
        ship.move(e);

        // Move ship
        if (ship.x < 0) {
          ship.x += 5;
        } else if (ship.x > e.width) {
          ship.x -= 5
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
              explosion.push(new Explosion(e, enemies[j].x, enemies[j].y, e.frameCount))
            }
          }
        }

        let edge: boolean = false;

        for (let i = 0; i < explosion.length; i++) {
          if (e.frameCount < explosion[i].startCount + 30) {
            explosion[i].show(e)
          } else {
            explosion.slice(i, 1)
          }
        }

        for (let i = 0; i < enemies.length; i++) {
          enemies[i].show(e);
          enemies[i].move(e, 21);
          if (enemies[i].x > e.width - 30 || enemies[i].x < 30) {
            edge = true;
          }
        }
        if (edge) {
          for (let j = 0; j < enemies.length; j++) {
            enemies[j].shiftDown(e);
          }
        }

        for (let i = enemies.length - 1; i >= 0; i--) {
          if (enemies[i].toDelete) {
            enemies.splice(i, 1);
          }
        }

        for (let i = lazers.length - 1; i >= 0; i--) {
          if (lazers[i].toDelete) {
            lazers.splice(i, 1);
          }
        }
      };

      e.keyReleased = () => {
        if (e.key != ' ') {
          ship.setDir(0);
        }
      }

      e.keyPressed = () => {
        if (e.key === ' ') {
          if (e.frameCount - ship.lastLazerFiredTimeStamp > 15) {
            let lazer: any = new Lazer(e, ship.x + 20, e.height - 40);
            lazers.push(lazer)
          }
          ship.lastLazerFiredTimeStamp = e.frameCount;
        }

        if (e.keyCode === e.RIGHT_ARROW && ship.x < e.width) {
          ship.setDir(1);
        } else if (e.keyCode === e.LEFT_ARROW) {
          ship.setDir(-1);
        }
      }
    }

    let canvas = new p5(sketch);
  }

}