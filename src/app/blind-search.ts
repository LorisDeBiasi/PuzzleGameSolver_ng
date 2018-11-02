import { Board } from './board';
import { Piece } from './piece';
import { Direction } from './direction';
import { Node } from './node';
import { Solver } from './solver';

export class BlindSearch extends Solver {
    //
	public setup() {
		
	}

    //
    public sortingAlgorithm(nodeQueue: Node[]) {
    	
    };

    //
    public process(nodeQueue: Node[], node: Node) {
    	// Add the board to the queue
		nodeQueue.push(node)
    };
}
