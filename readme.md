# A Nigerian states, code and LGA's Api 

This Api was built using [Express & TypeScript](https://Express.com)
It is strictly for educational purposes. Thank you for stopping by.

###### Get Request  
> https://nigerian-states-and-lga.vercel.app/

###### Queries
* limit: returns only a selected number of states
> https://nigerian-states-and-lga.vercel.app/?limit={number}
* name: returns state specified in query
> https://nigerian-states-and-lga.vercel.app/state/?name={name_of_state}
* code: returns a state by their code
> https://nigerian-states-and-lga.vercel.app/state/code/?code={code}
> code is the first and second letter of a state in caps
* lga: returns all of a state by lga
> https://nigerian-states-and-lga.vercel.app/state/lga/?lga={lga}
* capital: returns all of a state by capital
> https://nigerian-states-and-lga.vercel.app/state/capital/?capital={capital}
* region: returns all state that matches region query
> example of region query: Southeast or Southwest
> https://nigerian-states-and-lga.vercel.app/state/region/?region={region}

###### Routes
- https://nigerian-states-and-lga.vercel.app/nigeria
> returns some information for nigeria 

- https://nigerian-states-and-lga.vercel.app/statename/totalLga
> returns the total Lga in specified state
