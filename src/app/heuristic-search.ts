import { Board } from './board';
import { Piece } from './piece';
import { Node } from './node';
import { Direction } from './direction';
import { Solver } from './solver';

export class HeuristicSearch extends Solver {
	//
	public setup() {
		//
		this.node.setHeuristic(this.wronglyPlacedPiecesSum(this.node))

		//
		this.seenBoard = new Array();

        //
        this.addToSeenBoard(this.node.getPieces());
	}

    //
    public sortingAlgorithm(nodeQueue: Node[]) {
    	this.sortNode(nodeQueue);
    };

    //
    public process(nodeQueue: Node[], node: Node) {
    	if (!this.existInSeenBoard(node)) {
			//
			node.setHeuristic(this.wronglyPlacedPiecesSum(node));

			// Add the board to the queue
			nodeQueue.push(node);
		}
    };

	//
	private sortNode(nodeQueue: Node[]) {
		this.quickSort(nodeQueue, 0, nodeQueue.length-1);
	}

	//
	private quickSort(nodeQueue: Node[], first, last: number) {
		if (first < last) {
			let p: number = this.partition(nodeQueue, first, last);
			this.quickSort(nodeQueue, first, p - 1);
			this.quickSort(nodeQueue, p + 1, last);
		}
	}

	//
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

	//
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

	//
	private wronglyPlacedPiecesSum(node: Node): number {
		let wronglyPlacedPiecesSum: number = 0;

		for (var y = 0; y < node.getBoardSizeY(); ++y) {
			for (var x = 0; x < node.getBoardSizeX(); ++x) {
				if (node.getPieceValue(y, x) != this.wantedBoard.getPieceValue(y, x)) {//dont check 0 ? i think so
					let pos: number[] = this.wantedBoard.findValue(node.getPieceValue(y, x))
					wronglyPlacedPiecesSum += Math.abs(y - pos[0]) + Math.abs(x - pos[1]);
				}
			}
		}

		return wronglyPlacedPiecesSum;
	}
}
