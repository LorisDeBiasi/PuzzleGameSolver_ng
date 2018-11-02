import { Board } from './board';
import { Direction } from './direction';

export class Node {

	private board: Board;
	private heuristic: number;
	private moveHistoric: Direction[];

	//
	public constructor(boardSizeY, boardSizeX: number) {
		this.board = new Board(boardSizeY, boardSizeX);
		this.moveHistoric = new Array();
	}

	// Return a piece value
	public getPieceValue(y, x: number) {
		return this.board.getPieceValue(y, x);
	}

	// Return the pieces
    public getPieces() {
    	return this.board.getPieces();
    }

    // Add a direction to the historic
    public addToMoveHistoric(direction: Direction) {
    	this.moveHistoric.push(direction);
    }

    // Return the move historic
    public getMoveHistoric(): Direction[] {
        return this.moveHistoric;
    }

    // Reset the move historic
    public resetMoveHistoric() {
        this.moveHistoric = new Array();
    }

    // Get the heuristic value
    public getHeuristic(): number {
        return this.heuristic;
    }

    // Set the heuristic value
    public setHeuristic(value: number) {
        this.heuristic = value;
    }

    // Copy a node in this one
    public copyNode(node: Node) {
        this.board.setSizeX(node.board.getSizeX());
        this.board.setSizeY(node.board.getSizeY());
        this.board.copyPieces(node.board);
        this.moveHistoric = Array.from(node.moveHistoric);
    }

    // Randomize the board
    public randomizeBoard(nbOp: number) {
    	this.board.randomizeBoard(nbOp);
    }

    // Check if the current board is equal to another
    public isEqual(board: Board) {
    	return this.board.isEqual(board);
    }

    // Get the possible moves
    public getPossibleMoves() {
    	return this.board.getPossibleMoves();
    }

    // Get the y board size
    public getBoardSizeY() {
    	return this.board.getSizeY();
    }

    // Get the x board size
    public getBoardSizeX() {
    	return this.board.getSizeX();
    }

    // Move a pieces and add the direction to the historic
    public movePiece(direction: Direction) {
    	this.board.movePiece(direction);
    	this.addToMoveHistoric(direction)
    }
}
