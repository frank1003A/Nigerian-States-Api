
export default class State {
    constructor(
        public readonly code: string,
        public readonly name: string,
        public readonly lgas: Array<string>,
        public readonly capital: string,
        public readonly direction: string,
        public readonly description: string,
        public isCapital?: boolean,
    ){
        // unless specified the capital is false for every state
        this.isCapital = false;
    }
}