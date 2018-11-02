import { Component } from '@angular/core';
import { Direction } from './direction';
import { Solver } from './solver';
import { BlindSearch } from './blind-search';
import { BlindSearchBoardHistoric } from './blind-search-board-historic';
import { HeuristicSearch } from './heuristic-search';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'PuzzleGame';

  solver = new HeuristicSearch(3, 3);

  // Store a reference to the enum
  direction = Direction;

  // Create an empty result (used to store clearPuzzle)
  result = [];

  // default number of randomize
  nbRandomize = 10;
}
