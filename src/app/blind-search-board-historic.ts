import { Board } from './board';
import { Piece } from './piece';
import { Direction } from './direction';
import { Node } from './node';
import { Solver } from './solver';

export class BlindSearchBoardHistoric extends Solver {
	//
	public setup() {
		//
		this.seenBoard = new Array();

        //
        this.addToSeenBoard(this.node.getPieces());
	}

    //
    public sortingAlgorithm(nodeQueue: Node[]) {
    	
    };

    //
    public process(nodeQueue: Node[], node: Node) {
    	if (!this.existInSeenBoard(node)) {
			// Add the board to the queue
			nodeQueue.push(node)
		}
    };
}
