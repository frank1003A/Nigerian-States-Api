"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class State {
    constructor(code, name, lgas, capital) {
        this.code = code;
        this.name = name;
        this.lgas = lgas;
        this.capital = capital;
        // unless specified the capital is false for every state
        this.capital = false;
    }
}
exports.default = State;
