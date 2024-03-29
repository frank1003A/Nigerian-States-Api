//imports
import express, { Express, Request, Response } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { StateData } from "./utils/data";
import State from "./models/State";
dotenv.config();

const app: Express = express();

//middlewares
app.use(cors())

//capitalize first letter of any query to fit data model
const capitalizeStr = (str: string): string => {
  let orr_str = str;
  let new_str = ""
  let dash = str.indexOf("-")
  let rep = orr_str.charAt(0).toUpperCase();
  //
  new_str = orr_str.replace(orr_str[0], rep)
  let rep_dash = new_str.charAt(dash + 1).toUpperCase();
  //
  if (dash) {
    new_str = new_str.replace(new_str[dash + 1], rep_dash);
  } 
  return new_str;
};

// get lga that match query
const getLGA = (lga: string) => {
  const states: State[] = StateData;
  let mappedLgas = states.filter((st) => {
    let capLga = capitalizeStr(lga);
    return st.lgas.includes(capLga);
  });
  return mappedLgas;
};

/**
 * returns all the states, codes and LGA's
 * /<states query>/?limit=number returns only selected number of states, codes and LGA's
 */
app.get("/", async (req: Request, res: Response) => {
  let states = StateData;
  let limitedStates: State[] = [];
  const limit = Number(req.query.limit);
  if (limit > states.length) res.send(`limit is greater than ${states.length}`)
  if (!limit) {
    res.send(states);
  } else {
    for (let i = 0; i < limit; i++) {
      limitedStates.push(states[i]);
    }
    res.send(limitedStates);
  }
});

/**Get a state by name */
app.get("/state", async (req: Request, res: Response) => {
  const states = StateData;
  const namequery = capitalizeStr(req.query.name as string);
  const returnedData = states.filter((st) => st.name === namequery);
  res.send(returnedData[0]);
});

/**Get a state by code  */
app.get("/state/code", async (req: Request, res: Response) => {
  const states = StateData;
  const code = req.query.code?.toString().toLocaleUpperCase();
  const returnedData = states.filter((st) => st.code === code);
  res.status(200).send(returnedData[0]);
});

/**Get state by LGA */
app.get("/state/lga", (req: Request, res: Response) => {
  const states = StateData;
  const all_lga = states.map((st) => st.lgas);
  const lga = req.query.lga as string;
  if (!lga) {
    res.send(all_lga);
  } else {
    const returnedData = getLGA(lga);
    res.send(returnedData);
  }
});

/**Get state by capital */
app.get("/state/capital", (req: Request, res: Response) => {
  const states = StateData;
  const capital = capitalizeStr(req.query.capital as string);
  const returnedData = states.filter(st => st.capital === capital)
  res.send(returnedData[0]);
})

//Get specific State LGA current count 
// /<states query>/totalLga returns the total number LGA's for a state
app.get("/:state/totalLga", (req: Request, res: Response) => {
  const states = StateData;
  const namequery = capitalizeStr(req.params.state);
  const returnedData = states.filter((st) => st.name === namequery);
  res.json({
    "Total Local Government": returnedData[0].lgas.length
  })
})

//Get only states in a specific region 
app.get("/state/region", (req: Request, res: Response) => {
  const states = StateData;
  const region = capitalizeStr(req.query.region as string);
  const returnedData: any = states.filter((st) => st.direction === region);
  res.send(returnedData);
})

app.get("/nigeria", (req: Request, res: Response) => {
  const states = StateData;
  let nonCapitalStates = states.filter(st => st.capital === undefined)
  let capital = states.filter(st => st.isCapital === true)

  //
  let totalLga = states.reduce((acc, cur) => acc + cur.lgas.length || 0, 0)

  res.json({
    "Country": "Nigeria",
    "No of States": `${nonCapitalStates.length} states and capital`,
    "Capital": capital[0].name,
    "Total Local Government": totalLga
  })
})

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App is listening on port ${port}`));

module.exports = app