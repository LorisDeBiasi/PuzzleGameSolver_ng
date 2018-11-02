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

    //
    public constructor(boardSizeY, boardSizeX: number) {
        this.node = new Node(boardSizeY, boardSizeX);
        this.wantedBoard = new Board(boardSizeY, boardSizeX);
    }

    //
    public clearPuzzle() {
        //
        let nodeQueue: Node[] = new Array();

        //
        this.setup();

        //
        nodeQueue.push(this.node);

        //
        nodeQueue[0].resetMoveHistoric();

        //
        let nbMove: number = 0;

        // 
        while (nodeQueue.length > 0 && !nodeQueue[0].isEqual(this.wantedBoard) && nbMove < this.maxMoves) {
            //
            let possibleMoves: boolean[] = nodeQueue[0].getPossibleMoves();
            nbMove++;

            // up
            if (possibleMoves[0]) {
                let tmp: Node = new Node(nodeQueue[0].getBoardSizeY(), nodeQueue[0].getBoardSizeX());

                // Create a copy of the current board
                tmp.copyNode(nodeQueue[0]);

                // Move the piece
                tmp.movePiece(Direction.Up);

                //
                this.process(nodeQueue, tmp);
            }

            // down
            if (possibleMoves[1]) {
                let tmp: Node = new Node(nodeQueue[0].getBoardSizeY(), nodeQueue[0].getBoardSizeX());

                // Create a copy of the current board
                tmp.copyNode(nodeQueue[0]);

                // Move the piece
                tmp.movePiece(Direction.Down);

                //
                this.process(nodeQueue, tmp);
            }

            // left
            if (possibleMoves[2]) {
                let tmp: Node = new Node(nodeQueue[0].getBoardSizeY(), nodeQueue[0].getBoardSizeX());

                // Create a copy of the current board
                tmp.copyNode(nodeQueue[0]);

                // Move the piece
                tmp.movePiece(Direction.Left);

                //
                this.process(nodeQueue, tmp);
            }

            // right
            if (possibleMoves[3]) {
                let tmp: Node = new Node(nodeQueue[0].getBoardSizeY(), nodeQueue[0].getBoardSizeX());

                // Create a copy of the current board
                tmp.copyNode(nodeQueue[0]);

                // Move the piece
                tmp.movePiece(Direction.Right);

                //
                this.process(nodeQueue, tmp);
            }

            // Remove first item from array
            nodeQueue.shift();

            //sort queue a chaque iteration
            this.sortingAlgorithm(nodeQueue);
        }

        return new Array(String(nbMove), String(nodeQueue[0].getMoveHistoric()));
    }

    //
    public setup(){};

    //
    public sortingAlgorithm(nodeQueue: Node[]){};

    //
    public process(nodeQueue: Node[], node: Node){};

    //
    public randomizeBoard(nbOp: number) {
    	this.node.randomizeBoard(nbOp);
    }

    //
    public getPieces() {
    	return this.node.getPieces();
    }

    //
    public addToSeenBoard(pieces: Piece[][]) {
        this.seenBoard.push(this.piecesToString(pieces))
    }

    //
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

    //
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
