import { Board } from './board';
import { Piece } from './piece';
import { Direction } from './direction';
import { Node } from './node';
import { Solver } from './solver';

export class BlindSearch extends Solver {

	public clearPuzzle() {
		//
		let nodeQueue: Node[] = new Array();
		nodeQueue.push(this.node);

		//
		nodeQueue[0].resetMoveHistoric();

		//
		let nbMove: number = 0;

		// 
		while (nodeQueue.length > 0 && !nodeQueue[0].isCleared(this.wantedBoard) && nbMove < this.maxMoves) {
			//
			let possibleMoves: boolean[] = nodeQueue[0].checkMoves();
			nbMove++;

			// up
			if (possibleMoves[0]) {
				let tmp: Node = new Node(nodeQueue[0].getBoardSizeY(), nodeQueue[0].getBoardSizeX());

				// Create a copy of the current board
				tmp.copyNode(nodeQueue[0]);

				// Move the piece
				tmp.movePiece(Direction.Up);

				// Add the board to the queue
				nodeQueue.push(tmp)
			}

			// down
			if (possibleMoves[1]) {
				let tmp: Node = new Node(nodeQueue[0].getBoardSizeY(), nodeQueue[0].getBoardSizeX());

				// Create a copy of the current board
				tmp.copyNode(nodeQueue[0]);

				// Move the piece
				tmp.movePiece(Direction.Down);

				// Add the board to the queue
				nodeQueue.push(tmp)
			}

			// left
			if (possibleMoves[2]) {
				let tmp: Node = new Node(nodeQueue[0].getBoardSizeY(), nodeQueue[0].getBoardSizeX());

				// Create a copy of the current board
				tmp.copyNode(nodeQueue[0]);

				// Move the piece
				tmp.movePiece(Direction.Left);

				// Add the board to the queue
				nodeQueue.push(tmp)
			}

			// right
			if (possibleMoves[3]) {
				let tmp: Node = new Node(nodeQueue[0].getBoardSizeY(), nodeQueue[0].getBoardSizeX());

				// Create a copy of the current board
				tmp.copyNode(nodeQueue[0]);

				// Move the piece
				tmp.movePiece(Direction.Right);

				// Add the board to the queue
				nodeQueue.push(tmp)
			}

			// Remove first item from array
			nodeQueue.shift();
			console.log("loop");
		}

		console.log(nodeQueue);
		return new Array(String(nbMove), String(nodeQueue[0].getMoveHistoric()));
	}
	

	public clearPuzzleWithSeenBoard() {
		//
		let nodeQueue: Node[] = new Array();
		nodeQueue.push(this.node);

		//
		this.seenBoard = new Array();
		this.addToSeenBoard(this.node.getPieces());

		//
		nodeQueue[0].resetMoveHistoric();

		//
		let nbMove: number = 0;

		// 
		while (nodeQueue.length > 0 && !nodeQueue[0].isCleared(this.wantedBoard) && nbMove < this.maxMoves) {
			//
			let possibleMoves: boolean[] = nodeQueue[0].checkMoves();
			nbMove++;

			// up
			if (possibleMoves[0]) {
				let tmp: Node = new Node(nodeQueue[0].getBoardSizeY(), nodeQueue[0].getBoardSizeX());

				// Create a copy of the current board
				tmp.copyNode(nodeQueue[0]);

				// Move the piece
				tmp.movePiece(Direction.Up);

				if (!this.existInSeenBoard(tmp)) {
					// Add the board to the queue
					nodeQueue.push(tmp)
				}
			}

			// down
			if (possibleMoves[1]) {
				let tmp: Node = new Node(nodeQueue[0].getBoardSizeY(), nodeQueue[0].getBoardSizeX());

				// Create a copy of the current board
				tmp.copyNode(nodeQueue[0]);

				// Move the piece
				tmp.movePiece(Direction.Down);

				if (!this.existInSeenBoard(tmp)) {
					// Add the board to the queue
					nodeQueue.push(tmp)
				}
			}

			// left
			if (possibleMoves[2]) {
				let tmp: Node = new Node(nodeQueue[0].getBoardSizeY(), nodeQueue[0].getBoardSizeX());

				// Create a copy of the current board
				tmp.copyNode(nodeQueue[0]);

				// Move the piece
				tmp.movePiece(Direction.Left);

				if (!this.existInSeenBoard(tmp)) {
					// Add the board to the queue
					nodeQueue.push(tmp)
				}
			}

			// right
			if (possibleMoves[3]) {
				let tmp: Node = new Node(nodeQueue[0].getBoardSizeY(), nodeQueue[0].getBoardSizeX());

				// Create a copy of the current board
				tmp.copyNode(nodeQueue[0]);

				// Move the piece
				tmp.movePiece(Direction.Right);

				if (!this.existInSeenBoard(tmp)) {
					// Add the board to the queue
					nodeQueue.push(tmp)
				}
			}

			// Remove first item from array
			nodeQueue.shift();
			console.log("loop");
		}

		console.log(nodeQueue);
		return new Array(String(nbMove), String(nodeQueue[0].getMoveHistoric()));
	}
}
