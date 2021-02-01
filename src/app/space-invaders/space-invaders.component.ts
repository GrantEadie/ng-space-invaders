import { Component, OnInit } from '@angular/core';
import * as p5 from 'p5';
import Ship from './js/Ship';
import Enemy from './js/Enemy';
import Lazer from './js/Lazer';
import BarrierBlock from './js/BarrierBlock';
import GameDrawing from './js/GameDrawing';
import loadBarriers from './js/LoadBarriers'

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
    let startingEnemies: number = 60;
    let lazers: any = [];
    let explosion: any = [];
    let enemyShot: any = [];
    let allBarriers: any = [];
    let gameDrawing = new GameDrawing();

    const loadEnemies = function (e: any, rows: number, amount: number) {
      const columnAmount = amount/rows
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < columnAmount; i++) {
          if (j % 2 === 0) {
            // first row
            enemies[i + (j*columnAmount)] = new Enemy(e, (i*40) + 30, 40 + (60*j), 6, j);
          } else {
            // second row
            enemies[i + (j*columnAmount)] = new Enemy(e, (i*40) + 20, 40 + (60*j), 6, j);
          }
        }
      }
    }

    const loadGame = function (e: any) {
      ship = new Ship(e);
      loadEnemies(e, 5, startingEnemies);
      for (let i = 0; i < 4; i++) {
        allBarriers[i] = loadBarriers(e, i * (e.width / 5))
      }
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
            gameDrawing.drawMenu(e, allBarriers)
          }
        } else {
          gameDrawing.drawGame(e, ship, enemies, explosion, enemyShot, lazers, allBarriers, startingEnemies)
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
          if (e.frameCount - ship.lastLazerFiredTimeStamp > 21) {
            let lazer: any = new Lazer(e, ship.x + 30, e.height - 40);
            lazers.push(lazer)
            ship.lastLazerFiredTimeStamp = e.frameCount;
          }
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