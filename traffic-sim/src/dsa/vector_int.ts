export default class VectorInt {
    #array: Int32Array;
    #index: number;
    public size: number;

    constructor() {
        this.#array = new Int32Array([0]);
        this.size = 1;
        this.#index = 0;
    }

    #resize() {
        const newArray = new Int32Array(this.size * 2);
        newArray.set(this.#array);
        this.#array = newArray;
    }

    public push(value: number) {
        if (this.#index === this.size) {
            this.#resize();
        }

        this.#array[this.#index] = value;
        this.#index++;
    }

    public set(index: number, value: number) {
        this.#array[index] = value;
    }

    public get(index: number): number {
        return this.#array[index];
    }
}
