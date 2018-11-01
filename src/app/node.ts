import { Board } from './board';
import { Direction } from './direction';

export class Node {

	private board: Board;
	private heuristic: number;
	private moveHistoric: Direction[];

	public constructor(boardSizeY, boardSizeX: number) {
		this.board = new Board(boardSizeY, boardSizeX);
		this.moveHistoric = new Array();
	}

	public getPieceValue(y, x: number) {
		return this.board.getPieceValue(y, x);
	}

	//
    public getPieces() {
    	return this.board.getPieces();
    }

    public addToMoveHistoric(direction: Direction) {
    	this.moveHistoric.push(direction);
    }

    //
    public getMoveHistoric(): Direction[] {
        return this.moveHistoric;
    }

    //
    public resetMoveHistoric() {
        this.moveHistoric = new Array();
    }

    public getHeuristic(): number {
        return this.heuristic;
    }

    public setHeuristic(value: number) {
        this.heuristic = value;
    }

    //
    public copyNode(node: Node) {
        this.board.setSizeX(node.board.getSizeX());
        this.board.setSizeY(node.board.getSizeY());
        this.board.copyPieces(node.board);
        this.moveHistoric = Array.from(node.moveHistoric);
    }

    public randomizeBoard(nbOp: number) {
    	this.board.randomizeBoard(nbOp);
    }

    public isCleared(board: Board) {
    	return this.board.isCleared(board);
    }

    public checkMoves() {
    	return this.board.checkMove();
    }

    public getBoardSizeY() {
    	return this.board.getSizeY();
    }

    public getBoardSizeX() {
    	return this.board.getSizeX();
    }

    public movePiece(direction: Direction) {
    	this.board.movePiece(direction);
    	this.addToMoveHistoric(direction)
    }
}
