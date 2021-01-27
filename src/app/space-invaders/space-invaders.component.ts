import { Component, OnInit } from '@angular/core';
import * as p5 from 'p5';
import Ship from './js/Ship';
import Enemy from './js/Enemy';
import Lazer from './js/Lazer';
import Barrier from './js/Barrier';
import BarrierBlock from './js/BarrierBlock'
import GameDrawing from './js/GameDrawing';

@Component({
  selector: 'app-space-invaders',
  templateUrl: './space-invaders.component.html',
  styleUrls: ['./space-invaders.component.css']
})
export class SpaceInvadersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {


    let DISPLAY_MENU = true;
    let gameOver = false;
    let ship: any;
    let enemies: any = [];
    let lazers: any = [];
    let explosion: any = [];
    let enemyShot: any = [];
    let mode: number;
    let barrier: any = [];
    let barriers: any = [];
    let gameDrawing = new GameDrawing();

    const loadBarriers = function (e: any) {
      for (let i = 0; i < 10; i++) {
        barrier[i] = new BarrierBlock((e.width / 4) - (i*10), e.height - 200, 10, 10)
      }
      for (let j = 10; j < 20; j++) {
        barrier[j] = new BarrierBlock((e.width / 4) - ((j-10)*10), e.height -211, 10, 10)
      }
      for (let j = 20; j < 30; j++) {
        barrier[j] = new BarrierBlock((e.width / 4) - ((j-20)*10), e.height -222, 10, 10)
      }
      for (let j = 30; j < 40; j++) {
        barrier[j] = new BarrierBlock((e.width / 4) - ((j-30)*10), e.height -233, 10, 10)
      }
      for (let j = 40; j < 50; j++) {
        barrier[j] = new BarrierBlock((e.width / 4) - ((j-40)*10), e.height -244, 10, 10)
      }
    }

    const loadEnemies = function (e: any) {
      for (let i = 0; i < 11; i++) {
        enemies[i] = new Enemy(e, i * 30 + 30, 40, 6);
      }
      for (let i = 0; i < 11; i++) {
        enemies[i + 11] = new Enemy(e, i * 30 + 30, 60, 9);
      }
      for (let i = 0; i < 11; i++) {
        enemies[i + 22] = new Enemy(e, i * 32 + 22, 90, 12);
      }
    }

    const loadGame = function (e: any) {
      ship = new Ship(e);
      loadEnemies(e);
      loadBarriers(e)
    }

    const resetGame = function () {
      gameDrawing = new GameDrawing();
      enemyShot = [];
      explosion = [];
      lazers = [];
      ship = null;
    }


    const sketch = (e: any) => {

      e.preload = () => {

      }

      e.setup = () => {
        e.createCanvas(1000, 1000);
        e.noSmooth();
        e.frameRate(60);
        loadGame(e);
      };

      e.draw = () => {

        if (DISPLAY_MENU) {
          if (gameOver) {
            gameDrawing.gameOver(e)
          } else {
            gameDrawing.drawMenu(e, barrier)
          }
        } else {
          gameDrawing.drawGame(e, ship, enemies, explosion, enemyShot, lazers, barrier)
          if (ship.gameOver) {
            gameOver = true;
            DISPLAY_MENU = true;
            resetGame();
            loadGame(e);
          }
        }
      };


      e.keyReleased = () => {
        if (DISPLAY_MENU && !gameOver) {
          if (e.key === 'Enter') {
            DISPLAY_MENU = false;
          }
        } else if (gameOver) {
          if (e.key === 'Enter') {
            gameOver = false;
          }
        } else {
          if (e.key != ' ') {
            ship.setDir(0);
          }

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