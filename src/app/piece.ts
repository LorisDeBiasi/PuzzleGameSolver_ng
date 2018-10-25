export class Piece {

    //
	private value: number;

    //
	public constructor(value: number) {
        this.value = value;
    }

    public getValue() {
    	return this.value;
    }

    public setValue(value: number) {
    	return this.value = value;
    }
}
