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
        this.wantedBoard.loadPieces([[1,2,3],[4,5,6],[7,8,0]]);// temporary
    }

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
        var result: boolean = false;

        //
        for (let stringBoard of this.seenBoard) {
            if (stringBoard == this.piecesToString(node.getPieces())) {
                result = true;
            }
        }

        //
        if (result == true) {
        	this.addToSeenBoard(node.getPieces())
        }

        return result;
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
