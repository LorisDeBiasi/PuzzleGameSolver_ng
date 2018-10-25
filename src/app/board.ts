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
    public loadBoard(newBoard: Board) {
        this.sizeX = newBoard.sizeX;
        this.sizeY = newBoard.sizeX;
        this.pieces = newBoard.pieces;
    }

    //
    public randomizeBoard() {

    }

    //
    public findZero() {
        var zeroIndex: number[];
        
        for (var y = 0; y < this.sizeY; ++y) {
            for (var x = 0; x < this.sizeX; ++x) {
                if (this.pieces[y][x].getValue() == 0) {
                    zeroIndex[0] = y;
                    zeroIndex[1] = x;
                }
            }
        }

        return zeroIndex;
    }

    //
    public checkMove() {
        var zeroIndex: number[];
        zeroIndex = this.findZero();

        if (zeroIndex[0] > 0) {
            this.movePiece(zeroIndex, "up");
        }
        if (zeroIndex[0] < this.sizeY-1) {
            this.movePiece(zeroIndex, "down");
        }
        if (zeroIndex[1] > 0) {
            this.movePiece(zeroIndex, "left");
        }
        if (zeroIndex[1] < this.sizeX-1) {
            this.movePiece(zeroIndex, "right");
        }
    }

    //
	public movePiece(zeroIndex: number[], direction: String) {
        switch (direction) {
            case "up":
                this.pieces[zeroIndex[0]][zeroIndex[1]].setValue(this.pieces[zeroIndex[0]-1][zeroIndex[1]].getValue());
                this.pieces[zeroIndex[0]-1][zeroIndex[1]].setValue(0);
                break;
            case "down":
                this.pieces[zeroIndex[0]][zeroIndex[1]].setValue(this.pieces[zeroIndex[0]-1][zeroIndex[1]].getValue());
                this.pieces[zeroIndex[0]+1][zeroIndex[1]].setValue(0);
                break;
            case "left":
                this.pieces[zeroIndex[0]][zeroIndex[1]].setValue(this.pieces[zeroIndex[0]-1][zeroIndex[1]].getValue());
                this.pieces[zeroIndex[0]][zeroIndex[1]-1].setValue(0);
                break;
            case "right":
                this.pieces[zeroIndex[0]][zeroIndex[1]].setValue(this.pieces[zeroIndex[0]-1][zeroIndex[1]].getValue());
                this.pieces[zeroIndex[0]][zeroIndex[1]+1].setValue(0);
                break;
        }
    }
}
