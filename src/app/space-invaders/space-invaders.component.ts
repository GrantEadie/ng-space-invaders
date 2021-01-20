import { Component, OnInit } from '@angular/core';
import * as p5 from 'p5';

@Component({
  selector: 'app-space-invaders',
  templateUrl: './space-invaders.component.html',
  styleUrls: ['./space-invaders.component.css']
})
export class SpaceInvadersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const sketch = (e : any) => {

      e.preload = () => {
        // preload code
      }

      e.setup = () => {
        e.createCanvas(400, 400);
      };

      e.draw = () => {
        e.background(255);
        e.rect(200, 200, 200, 200);
      };
    }

    let canvas = new p5(sketch);
  }

}