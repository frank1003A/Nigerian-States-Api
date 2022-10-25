"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class State {
    constructor(code, name, lgas) {
        this.code = code;
        this.name = name;
        this.lgas = lgas;
        this.totalLga = () => {
            return this.lgas.length;
        };
    }
}
exports.default = State;
