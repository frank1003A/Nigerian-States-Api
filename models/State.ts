
export default class State {
    constructor(
        public readonly code: string,
        public readonly name: string,
        public readonly lgas: Array<string>,
        public capital?: boolean,
    ){
        // unless specified the capital is false for every state
        this.capital = false;
    }
}