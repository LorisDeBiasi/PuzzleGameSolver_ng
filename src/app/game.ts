import { Board } from './board';
import { Direction } from './direction';

export class Game {

    //
	public board: Board;
    //tree

    //
	public constructor(boardSizeY, boardSizeX: number) {
        //this.board = new Array();
        this.board = new Board(boardSizeY, boardSizeX);
    }

    public clearPuzzle() {
        let boardQueue: Board[] = new Array();
        boardQueue.push(this.board);
        let nbMove: number = 0;

        // 
        while (!boardQueue[0].isCleared()) {//typeof boardQueue[0] != undefined || 
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
        return nbMove;
    }

    //
    public getPiecesList() {
    	return this.board.getPieces();
    }

    //
    public loadBoard() {

    }

    //
    public randomizeBoard() {

    }
}
