
export default class State {
    constructor(
        public readonly code: string,
        public readonly name: string,
        public readonly lgas: Array<string>
    ){}

    public totalLga? = ()  => {
        return this.lgas.length
    }
}