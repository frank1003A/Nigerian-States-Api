"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class State {
    constructor(code, name, lgas, capital, direction, description, isCapital) {
        this.code = code;
        this.name = name;
        this.lgas = lgas;
        this.capital = capital;
        this.direction = direction;
        this.description = description;
        this.isCapital = isCapital;
        // unless specified the capital is false for every state
        this.isCapital = false;
    }
}
exports.default = State;
