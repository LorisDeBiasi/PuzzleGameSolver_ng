import { Board } from './board';
import { Piece } from './piece';
import { Direction } from './direction';
import { Solver } from './solver';

export class BlindSearch extends Solver {

	public clearPuzzle() {
		//
		let boardQueue: Board[] = new Array();
		boardQueue.push(this.board);

		//
		boardQueue[0].resetMoveSinceCreated();

		//
		let nbMove: number = 0;

		// 
		while (boardQueue.length > 0 && !boardQueue[0].isCleared() && nbMove < 1000000) {
			//
			let possibleMoves: boolean[] = boardQueue[0].checkMove();
			nbMove++;

			// up
			if (possibleMoves[0]) {
				let tmp: Board = new Board(boardQueue[0].getSizeY(), boardQueue[0].getSizeX());

				// Create a copy of the current board
				tmp.loadBoard(boardQueue[0]);

				// Move the piece
				tmp.movePiece(Direction.Up);

				// Add the board to the queue
				boardQueue.push(tmp)
			}

			// down
			if (possibleMoves[1]) {
				let tmp: Board = new Board(boardQueue[0].getSizeY(), boardQueue[0].getSizeX());

				// Create a copy of the current board
				tmp.loadBoard(boardQueue[0]);

				// Move the piece
				tmp.movePiece(Direction.Down);

				// Add the board to the queue
				boardQueue.push(tmp)
			}

			// left
			if (possibleMoves[2]) {
				let tmp: Board = new Board(boardQueue[0].getSizeY(), boardQueue[0].getSizeX());

				// Create a copy of the current board
				tmp.loadBoard(boardQueue[0]);

				// Move the piece
				tmp.movePiece(Direction.Left);

				// Add the board to the queue
				boardQueue.push(tmp)
			}

			// right
			if (possibleMoves[3]) {
				let tmp: Board = new Board(boardQueue[0].getSizeY(), boardQueue[0].getSizeX());

				// Create a copy of the current board
				tmp.loadBoard(boardQueue[0]);

				// Move the piece
				tmp.movePiece(Direction.Right);

				// Add the board to the queue
				boardQueue.push(tmp)
			}

			// Remove first item from array
			boardQueue.shift();
			console.log("loop");
		}

		console.log(boardQueue);
		return new Array(nbMove, boardQueue[0].getMoveSinceCreated());
	}

	public clearPuzzleWithSeenBoard() {
		//
		let boardQueue: Board[] = new Array();
		boardQueue.push(this.board);

		//
		boardQueue[0].resetMoveSinceCreated();

		//
		this.seenBoard = new Array();
		this.addToSeenBoard(this.board);

		//
		let nbMove: number = 0;

		// 
		while (boardQueue.length > 0 && !boardQueue[0].isCleared()) {
			//
			let possibleMoves: boolean[] = boardQueue[0].checkMove();
			nbMove++;

			// up
			if (possibleMoves[0]) {
				let tmp: Board = new Board(boardQueue[0].getSizeY(), boardQueue[0].getSizeX());

				// Create a copy of the current board
				tmp.loadBoard(boardQueue[0]);

				// Move the piece
				tmp.movePiece(Direction.Up);

				if (!this.existInSeenBoard(tmp)) {
					this.addToSeenBoard(tmp);
					// Add the board to the queue
					boardQueue.push(tmp)
				}
			}

			// down
			if (possibleMoves[1]) {
				let tmp: Board = new Board(boardQueue[0].getSizeY(), boardQueue[0].getSizeX());

				// Create a copy of the current board
				tmp.loadBoard(boardQueue[0]);

				// Move the piece
				tmp.movePiece(Direction.Down);

				if (!this.existInSeenBoard(tmp)) {
					this.addToSeenBoard(tmp);
					// Add the board to the queue
					boardQueue.push(tmp)
				}
			}

			// left
			if (possibleMoves[2]) {
				let tmp: Board = new Board(boardQueue[0].getSizeY(), boardQueue[0].getSizeX());

				// Create a copy of the current board
				tmp.loadBoard(boardQueue[0]);

				// Move the piece
				tmp.movePiece(Direction.Left);

				if (!this.existInSeenBoard(tmp)) {
					this.addToSeenBoard(tmp);
					// Add the board to the queue
					boardQueue.push(tmp)
				}
			}

			// right
			if (possibleMoves[3]) {
				let tmp: Board = new Board(boardQueue[0].getSizeY(), boardQueue[0].getSizeX());

				// Create a copy of the current board
				tmp.loadBoard(boardQueue[0]);

				// Move the piece
				tmp.movePiece(Direction.Right);

				if (!this.existInSeenBoard(tmp)) {
					this.addToSeenBoard(tmp);
					// Add the board to the queue
					boardQueue.push(tmp)
				}
			}

			// Remove first item from array
			boardQueue.shift();
			console.log("loop");
		}

		console.log(boardQueue);
		console.log(this.seenBoard);
		return new Array(nbMove, boardQueue[0].getMoveSinceCreated());
	}
}
