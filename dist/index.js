"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//imports
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const data_1 = require("./utils/data");
dotenv.config();
const app = (0, express_1.default)();
//middlewares
app.use((0, cors_1.default)());
const capitalizeStr = (str) => {
    let orr_str = str;
    let new_str = "";
    let dash = str.indexOf("-");
    let rep = orr_str.charAt(0).toUpperCase();
    //
    new_str = orr_str.replace(orr_str[0], rep);
    let rep_dash = new_str.charAt(dash + 1).toUpperCase();
    //
    if (dash) {
        new_str = new_str.replace(new_str[dash + 1], rep_dash);
    }
    return new_str;
};
const getLGA = (lga) => {
    const states = data_1.StateData;
    let mappedLgas = states.filter((st) => {
        let capLga = capitalizeStr(lga);
        return st.lgas.includes(capLga);
    });
    return mappedLgas;
};
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let states = data_1.StateData;
    let limitedStates = [];
    const limit = Number(req.query.limit);
    if (limit > states.length)
        res.send(`limit is greater than ${states.length}`);
    if (!limit) {
        res.send(states);
    }
    else {
        for (let i = 0; i < limit; i++) {
            limitedStates.push(states[i]);
        }
        res.send(limitedStates);
    }
}));
/**Get a state by name */
app.get("/state", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const states = data_1.StateData;
    const namequery = capitalizeStr(req.query.name);
    const returnedData = states.filter((st) => st.name === namequery);
    res.send(returnedData[0]);
}));
/**Get a state by code  */
app.get("/state/code", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const states = data_1.StateData;
    const code = (_a = req.query.code) === null || _a === void 0 ? void 0 : _a.toString().toLocaleUpperCase();
    const returnedData = states.filter((st) => st.code === code);
    res.status(200).send(returnedData[0]);
}));
/**Get state by LGA */
app.get("/state/lga", (req, res) => {
    const states = data_1.StateData;
    const all_lga = states.map((st) => st.lgas);
    const lga = req.query.lga;
    if (!lga) {
        res.send(all_lga);
    }
    else {
        const returnedData = getLGA(lga);
        res.send(returnedData);
    }
});
//Get specific State LGA current count 
app.get("/:state/totalLga", (req, res) => {
    const states = data_1.StateData;
    const namequery = capitalizeStr(req.params.state);
    const returnedData = states.filter((st) => st.name === namequery);
    res.json({
        "Total Local Government": returnedData[0].lgas.length
    });
});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App is listening on port ${port}`));
