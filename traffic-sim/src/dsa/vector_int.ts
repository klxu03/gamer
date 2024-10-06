export default class VectorInt {
    #array: Int32Array;
    #index: number;
    public size: number;

    /**
     * Default constructor for a VectorInt
     * @param values Optional parameter that allows you to pass a list of values to the constructor
     */
    constructor(values?: number[]) {
        if (values && values.length > 0) {
            this.#array = new Int32Array(values);
            
            // The size of the array is the next power of 2 greater than or equal to the length of the values array
            this.size = Math.pow(2, Math.ceil(Math.log2(values.length)));

            this.#index = values.length;
        } else {
            this.#array = new Int32Array([0]);
            this.size = 1;
            this.#index = 0;
        }
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
