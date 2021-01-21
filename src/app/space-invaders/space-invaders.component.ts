import { Component, OnInit } from '@angular/core';
import * as p5 from 'p5';
import Ship from './js/Ship';
import Enemy from './js/Enemy'

@Component({
  selector: 'app-space-invaders',
  templateUrl: './space-invaders.component.html',
  styleUrls: ['./space-invaders.component.css']
})
export class SpaceInvadersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    let ship : any;
    let enemies : any = [];

    const sketch = (e : any) => {

      e.preload = () => {
        // preload code
      }

      e.setup = () => {
        e.createCanvas(600, 400);
        ship = new Ship(e);
        for (let i = 0; i < 6; i++) {
          enemies[i] = new Enemy(e, i*80+80, 60);
        }
      };

      e.draw = () => {
        e.background(51);
        ship.show(e);
        for (let i = 0; i < enemies.length; i++) {
          enemies[i].show(e)
        }
      };

      e.keyPressed = () => {
        if (e.keyCode === e.RIGHT_ARROW) {
          ship.move(1);
        } else if (e.keyCode === e.LEFT_ARROW) {
          ship.move(-1);
        }
      }
    }

    let canvas = new p5(sketch);
  }

}