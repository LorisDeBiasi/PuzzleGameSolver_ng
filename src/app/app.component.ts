import { Component } from '@angular/core';
import { Game } from './game';
import { Direction } from './direction';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'PuzzleGame';
  game = new Game(3, 3);

  //Store a reference to the enum
  direction = Direction;
}
