import { Board } from './board';
import { Piece } from './piece';
import { Node } from './node';
import { Direction } from './direction';
import { Solver } from './solver';

export class HeuristicSearch extends Solver {

	public clearPuzzle() {
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
					//
					tmp.setHeuristic(this.wronglyPlacedPiecesSum(tmp))

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
					//
					tmp.setHeuristic(this.wronglyPlacedPiecesSum(tmp))

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
					//
					tmp.setHeuristic(this.wronglyPlacedPiecesSum(tmp))

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
					//
					tmp.setHeuristic(this.wronglyPlacedPiecesSum(tmp))

					// Add the board to the queue
					nodeQueue.push(tmp)
				}
			}

			// Remove first item from array
			nodeQueue.shift();
			console.log("loop");
		}

		//sort queue a chaque iteration
		this.sortNode(nodeQueue);

		console.log(nodeQueue);
		return new Array(String(nbMove), String(nodeQueue[0].getMoveHistoric()));
	}

	private sortNode(nodeQueue: Node[]) {
		this.quickSort(nodeQueue, 0, nodeQueue.length-1);
	}

	private quickSort(nodeQueue: Node[], first, last: number) {
		if (first < last) {
			let p: number = this.partition(nodeQueue, first, last);
			this.quickSort(nodeQueue, first, p - 1);
			this.quickSort(nodeQueue, p + 1, last);
		}
	}

	private partition(nodeQueue: Node[], first, last: number) {
		let pivot: number = nodeQueue[last].getHeuristic();
		let i: number = first;

		for (var j = first; j < last; ++j) {
			if (nodeQueue[j].getHeuristic() < pivot) {
				if (i != j) {
					let tmp: Node = nodeQueue[i];
					nodeQueue[i] = nodeQueue[j];
					nodeQueue[j] = tmp;
				}
				i++;
			}
		}

		let tmp: Node = nodeQueue[i];
		nodeQueue[i] = nodeQueue[last];
		nodeQueue[last] = tmp;

		return i;
	}

	private nbPiecesWronglyPlaced(node: Node): number {
		let nbPiecesWronglyPlaced: number = 0;

		for (var y = 0; y < node.getBoardSizeY(); ++y) {
			for (var x = 0; x < node.getBoardSizeX(); ++x) {
				if (node.getPieceValue(y, x) != this.wantedBoard.getPieceValue(y, x)) {
					nbPiecesWronglyPlaced++;
				}
			}
		}

		return nbPiecesWronglyPlaced;
	}

	private wronglyPlacedPiecesSum(node: Node): number {
		let wronglyPlacedPiecesSum: number = 0;

		for (var y = 0; y < node.getBoardSizeY(); ++y) {
			for (var x = 0; x < node.getBoardSizeX(); ++x) {
				if (node.getPieceValue(y, x) != this.wantedBoard.getPieceValue(y, x)) {
					wronglyPlacedPiecesSum += node.getPieceValue(y, x);
				}
			}
		}

		return wronglyPlacedPiecesSum;
	}
}
