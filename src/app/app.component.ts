import { Component } from '@angular/core';
import { Direction } from './direction';
import { Solver } from './solver';
import { HeuristicSearch } from './heuristic-search';
import { BlindSearch } from './blind-search';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'PuzzleGame';
  game = new BlindSearch(3, 3);

  //Store a reference to the enum
  direction = Direction;

  // Create an empty nbMove (used to store clearPuzzle)
  nbMove = [];

  nbRandomize = 10;
}
