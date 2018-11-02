import { Board } from './board';
import { Piece } from './piece';
import { Direction } from './direction';
import { Node } from './node';

export class Solver {

    //
    public node: Node;
    public wantedBoard: Board;
    public seenBoard: string[];

    protected maxMoves: number = 1000000;

    // Create a solver
    public constructor(boardSizeY, boardSizeX: number) {
        this.node = new Node(boardSizeY, boardSizeX);
        this.wantedBoard = new Board(boardSizeY, boardSizeX);
    }

    // Method used to clear a puzzle
    public clearPuzzle() {
        // Create an array used to store all the node
        let nodeQueue: Node[] = new Array();

        // Setup some variable if needed
        this.setup();

        // Add the current node to the nodeQueue
        nodeQueue.push(this.node);

        // Reset the historic of the current node
        nodeQueue[0].resetMoveHistoric();

        // Used to limit the number of moves
        let nbMove: number = 0;

        // Repeat until : nodeQueue is empty, a clear node is found, a certain amount of move
        while (nodeQueue.length > 0 && !nodeQueue[0].isEqual(this.wantedBoard) && nbMove < this.maxMoves) {
            // Store the possible moves for the current node
            let possibleMoves: boolean[] = nodeQueue[0].getPossibleMoves();
            nbMove++;

            // up
            if (possibleMoves[0]) {
                let tmp: Node = new Node(nodeQueue[0].getBoardSizeY(), nodeQueue[0].getBoardSizeX());

                // Create a copy of the current board
                tmp.copyNode(nodeQueue[0]);

                // Move the piece
                tmp.movePiece(Direction.Up);

                // Depend of the solver type
                this.process(nodeQueue, tmp);
            }

            // down
            if (possibleMoves[1]) {
                let tmp: Node = new Node(nodeQueue[0].getBoardSizeY(), nodeQueue[0].getBoardSizeX());

                // Create a copy of the current board
                tmp.copyNode(nodeQueue[0]);

                // Move the piece
                tmp.movePiece(Direction.Down);

                // Depend of the solver type
                this.process(nodeQueue, tmp);
            }

            // left
            if (possibleMoves[2]) {
                let tmp: Node = new Node(nodeQueue[0].getBoardSizeY(), nodeQueue[0].getBoardSizeX());

                // Create a copy of the current board
                tmp.copyNode(nodeQueue[0]);

                // Move the piece
                tmp.movePiece(Direction.Left);

                // Depend of the solver type
                this.process(nodeQueue, tmp);
            }

            // right
            if (possibleMoves[3]) {
                let tmp: Node = new Node(nodeQueue[0].getBoardSizeY(), nodeQueue[0].getBoardSizeX());

                // Create a copy of the current board
                tmp.copyNode(nodeQueue[0]);

                // Move the piece
                tmp.movePiece(Direction.Right);

                // Depend of the solver type
                this.process(nodeQueue, tmp);
            }

            // Remove first item from array
            nodeQueue.shift();

            // Depend of the solver type
            this.sortingAlgorithm(nodeQueue);
        }

        // Return an array containing nbMove and the historic of first element of nodeQueue
        return new Array(String(nbMove), String(nodeQueue[0].getMoveHistoric()));
    }

    // Setup some variable if needed
    public setup(){};

    // Depend of the solver type
    public sortingAlgorithm(nodeQueue: Node[]){};

    // Depend of the solver type
    public process(nodeQueue: Node[], node: Node){};

    // Randomize the position of each element in the board
    public randomizeBoard(nbOp: number) {
    	this.node.randomizeBoard(nbOp);
    }

    // Return the pieces of the node
    public getPieces() {
    	return this.node.getPieces();
    }

    // Add a board to the seen board
    public addToSeenBoard(pieces: Piece[][]) {
        this.seenBoard.push(this.piecesToString(pieces))
    }

    // Check if the node has already been seen. If not, add it in seen board
    public existInSeenBoard(node: Node): boolean {
        var exist: boolean = false;

        //
        for (let stringBoard of this.seenBoard) {
            if (stringBoard == this.piecesToString(node.getPieces())) {
                exist = true;
            }
        }

        //
        if (exist != true) {
        	this.addToSeenBoard(node.getPieces())
        }

        return exist;
    }

    // Return a simplified version of the pieces
    public piecesToString(pieces: Piece[][]): string {
        var result: string = "";

        for (let line of pieces) {
            for (let piece of line) {
                result += piece.getValue();
            }
        }

        return result;
    }
}
