class Student {
    #age: number = 0;
    constructor(
        public firstname: string,
        public lastname: string,
         age: number
    ){
        this.age = age;
    }

    get age() {
        return this.#age;
    }

    set age(value: number) {
        const raiseError = (msg: string): never => {throw new Error(msg);};
        this.#age = value < 0 ?raiseError("x") : value
    }

}
