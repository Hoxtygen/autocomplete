# Autocomplete



## How to run the App
* clone the repo. 
* open a terminal on your PC, run `git clone https://github.com/Hoxtygen/autocomplete.git`
* `cd` into the project folder and run `npm install`
* run `npm start`
* open a browser and navigate to `localhost:3000`
* type in starwars character into the autocomplete input


## Note
The project makes use of the starwars character data for autocompletion. Data can be fetched in 2 ways
* locally using local starwars data.
* Using the [starwars API](https://swapi.dev/api/people/).

Two change handlers are provided;
* handleChange makes use of [starwars API](https://swapi.dev/api/people/).
* localHandleChange makes use of local starwars data.

To switch betweent these 2 use either as the handleChange prop on the `<AutoComplete />` component in the `<Home />` component present in the `views` directory


## Part 2
Answers to theoretical question can be found in [here](https://github.com/Hoxtygen/autocomplete/blob/develop/part2/answers.md)
