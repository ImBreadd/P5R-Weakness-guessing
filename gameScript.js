import React, { useState, useEffect } from "react";
import personaMapRoyal from "./PersonaDataRoyal";

const types = ["Physical", "Gun", "Fire", "Ice", "Electric", "Wind", "Psychic", "Nuclear", "Bless", "Curse"];

const classes = {
    weak: ["wk"],
    neutral: ["-"],
    strong: ["rs"],
    mighty: ["rp", "ab", "nu"],
};

const personaNames = Object.keys(personaMapRoyal);

const selectRandomPersona = (personaList) => {
    const randomIndex = Math.floor(Math.random() * personaList.length);
    return personaList[randomIndex];
};

const categorise = (value) => {
    for (const [category, items] of Object.entries(classes)) {
        if (items.includes(value)) {
            return category;
        }
    }
    return "unknown";
};

const PersonaGame = () => {
    const [selectedPersona, setSelectedPersona] = useState("");
    const [selectedElems, setSelectedElems] = useState([]);
    const [previousGuesses, setPreviousGuesses] = useState([]);
    const [guess, setGuess] = useState("");
    const [comparisonResults, setComparisonResults] = useState([]);
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        const persona = selectRandomPersona(personaNames);
        setSelectedPersona(persona);
        const elems = personaMapRoyal[persona]["elems"].map(categorise);
        setSelectedElems(elems);
    }, []);

    const handleGuess = (event) => {
        event.preventDefault();
        if (previousGuesses.includes(guess)) return;
        if (!guess) return;

        setPreviousGuesses([...previousGuesses, guess]);
        if (guess === selectedPersona) {
            setComparisonResults(["Correct!"]);
        } else {
            compareElems(guess);
        }
    };

    const compareElems = (userGuess) => {
        const guessElems = personaMapRoyal[userGuess]["elems"].map(categorise);
        let compareMap = guessElems.map((elem, i) =>
        elem === selectedElems[i] ? "True" : "False"
        );
        setComparisonResults(compareMap);
    };

    const handleInputChange = (event) => {
        const value = event.target.value;
        setGuess(value);
        setSuggestions(
            personaNames.filter((name) => name.toLowerCase().startsWith(value.toLowerCase()))
        );
    };

    return (
<div>
<h1>Persona Guessing Game</h1>
<form onSubmit={handleGuess}>
<input
type="text"
value={guess}
onChange={handleInputChange}
list="personaSuggestions"
/>
<datalist id="personaSuggestions">
{suggestions.map((name) => (
<option key={name} value={name} />
))}
</datalist>
<button type="submit">Submit</button>
</form>
<div>
<h2>Previous Guesses:</h2>
<ul>
{previousGuesses.map((guess, index) => (
<li key={index}>{guess}</li>
))}
</ul>
</div>
<div>
<h2>Comparison Results:</h2>
{comparisonResults.map((result, index) => (
<p key={index}>{result}</p>
))}
</div>
<div>
<h2>Selected Persona: {selectedPersona}</h2>
<h3>Elemental Affinities:</h3>
<div>
{types.map((type, index) => (
<div key={index}>
{type}: {selectedElems[index] || "Unknown"}
</div>
))}
</div>
</div>
</div>
);
};

export default PersonaGame;
