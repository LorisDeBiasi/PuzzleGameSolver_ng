import { Board } from './board';
import { Piece } from './piece';
import { Direction } from './direction';

export class Solver {

    //
	public board: Board;
	//
    public seenBoard: string[];

    //
	public constructor(boardSizeY, boardSizeX: number) {
        this.board = new Board(boardSizeY, boardSizeX);
    }

    //
    public loadBoard() {

    }

    //
    public randomizeBoard() {

    }

    //
    public getPiecesList() {
    	return this.board.getPieces();
    }

    //
    public existInSeenBoard(board: Board): boolean {
        var result: boolean = false;

        for (let stringBoard of this.seenBoard) {
            if (stringBoard == this.piecesToString(board)) {
                result = true;
            }
        }

        return result;
    }

    //
    public addToSeenBoard(board: Board) {
        this.seenBoard.push(this.piecesToString(board))
    }

    //
    public piecesToString(board: Board): string {
        var result: string = "";

        for (let line of board.getPieces()) {
            for (let piece of line) {
                result += piece.getValue();
            }
        }

        return result;
    }
}
