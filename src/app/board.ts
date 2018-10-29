import { Piece } from './piece';
import { Direction } from './direction';

export class Board {

	//
	private sizeX: number;
	private sizeY: number;
	private pieces: Piece[][];

	//
	public constructor(sizeX, sizeY: number) {
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.pieces = [];

        let startingValue: number = 1;

        //
        for (var y = 0; y < this.sizeY; ++y) {
        	this.pieces[y] = [];
        	for (var x = 0; x < this.sizeX; ++x) {
        		this.pieces[y][x] = new Piece(startingValue);
        		startingValue++;
        	}
        }
        this.pieces[this.sizeY-1][this.sizeX-1] = new Piece(0);
    }

    //
    public getSizeX(): number {
    	return this.sizeX;
    }

    //
    public getSizeY(): number {
    	return this.sizeY;
    }

    //
    public getPieces(): Piece[][] {
    	return this.pieces;
    }

    //
    public loadBoard(newBoard: Board) {
        this.sizeX = newBoard.sizeX;
        this.sizeY = newBoard.sizeX;
        this.copyPieces(newBoard);
    }

    private copyPieces(newBoard: Board) {
        for (var y = 0; y < this.sizeY; ++y) {
            for (var x = 0; x < this.sizeX; ++x) {
                this.pieces[y][x].setValue(newBoard.pieces[y][x].getValue());
            }
        }
    }

    //
    public randomizeBoard(nbOp: number) {
        //var nbOp: number = getRndInteger(1, 100);

        for (var i = 0; i < nbOp; ++i) {
            let op: number = getRndInteger(1, 4);

            switch (op) {
                case 1:
                    this.movePiece(Direction.Up);
                    break;
                case 2:
                    this.movePiece(Direction.Down);
                    break;
                case 3:
                    this.movePiece(Direction.Left);
                    break;
                case 4:
                    this.movePiece(Direction.Right);
                    break;
            }
        }
    }

    //
    public findZero(): number[] {
        let zeroIndex: number[] = Array();

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
    public checkMove(): boolean[] {
        let zeroIndex: number[];
        let possibleMoves: boolean[] = new Array(false,false,false,false);//up, down, left, right

        zeroIndex = this.findZero();

        if (zeroIndex[0] > 0) {
            possibleMoves[0] = true;
        }
        if (zeroIndex[0] < this.sizeY-1) {
            possibleMoves[1] = true;
        }
        if (zeroIndex[1] > 0) {
            possibleMoves[2] = true;
        }
        if (zeroIndex[1] < this.sizeX-1) {
            possibleMoves[3] = true;
        }

        return possibleMoves;
    }

    //
    public movePiece(direction: Direction) {
        let zeroIndex: number[] = this.findZero();

        if (direction == Direction.Up) {
            if (zeroIndex[0] > 0) {
                this.pieces[zeroIndex[0]][zeroIndex[1]].setValue(this.pieces[zeroIndex[0]-1][zeroIndex[1]].getValue());
                this.pieces[zeroIndex[0]-1][zeroIndex[1]].setValue(0);
            }
        }
        else if (direction == Direction.Down) {
            if (zeroIndex[0] < this.sizeY-1) {
                this.pieces[zeroIndex[0]][zeroIndex[1]].setValue(this.pieces[zeroIndex[0]+1][zeroIndex[1]].getValue());
                this.pieces[zeroIndex[0]+1][zeroIndex[1]].setValue(0);
            }
        }
        else if (direction == Direction.Left) {
            if (zeroIndex[1] > 0) {
                this.pieces[zeroIndex[0]][zeroIndex[1]].setValue(this.pieces[zeroIndex[0]][zeroIndex[1]-1].getValue());
                this.pieces[zeroIndex[0]][zeroIndex[1]-1].setValue(0);
            }
        }
        else if (direction == Direction.Right) {
            if (zeroIndex[1] < this.sizeX-1) {
                this.pieces[zeroIndex[0]][zeroIndex[1]].setValue(this.pieces[zeroIndex[0]][zeroIndex[1]+1].getValue());
                this.pieces[zeroIndex[0]][zeroIndex[1]+1].setValue(0);
            }
        }
    }

    public isCleared(): boolean {
        let isCleared: boolean = true;
        let value: number = 1;

        for (var y = 0; y < this.sizeY; ++y) {
            for (var x = 0; x < this.sizeX; ++x) {

                // Check if all the index have the right value
                if (y < this.sizeY - 1 && x < this.sizeX - 1) {
                    if (this.pieces[y][x].getValue() != value) {
                        isCleared = false;
                    }
                }
                // Check if the last value equals 0
                else {
                    if (this.pieces[this.sizeY-1][this.sizeX-1].getValue() != 0) {
                        isCleared = false;
                    }
                }

                ++value;
            }
        }

        return isCleared;
    }
}

// Random integer [min, max]
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max + 1 - min) ) + min;
}
