import { Board } from './board';

export class Game {

    //
	private board:Board;

    //
	public constructor() {
        this.board = new Board(3, 3);
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
