import { Piece } from './piece';

export class Board {

	//
	private sizeX: number;
	private sizeY: number;
	private pieces: Piece[][];

	//
	private startingValue: number = 1;

	//
	public constructor(sizeX, sizeY: number) {
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.pieces = [];

        //
        for (var y = 0; y < this.sizeY; ++y) {
        	this.pieces[y] = [];
        	for (var x = 0; x < this.sizeX; ++x) {
        		this.pieces[y][x] = new Piece(this.startingValue);
        		this.startingValue++;
        	}
        }
        this.pieces[this.sizeY-1][this.sizeX-1] = new Piece(0);
    }

    //
    public getSizeX() {
    	return this.sizeX;
    }

    //
    public getSizeY() {
    	return this.sizeY;
    }

    //
    public getPieces() {
    	return this.pieces;
    }

    //
    public loadBoard() {
    	
    }

    //
    public randomizeBoard() {

    }

    //
    public checkMove() {

    }

    //
	public movePiece() {

    }
}
