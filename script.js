//import { personaMapRoyal } from './PersonaDataRoyal.js';

const types = ['Physical', 'Gun', 'Fire', 'Ice', 'Electric', 'Wind', 'Psychic', 'Nuclear', 'Bless', 'Curse']
let selectedPersona = "";
let selectedPersonaElems = "";
let previousGuesses = [];

//Putting affinities into guessing categories
const classes = {
    weak: ['wk'],
    neutral: ['-'],
    strong: ['rs'],
    mighty: ['rp', 'ab', 'nu']
}

const personaNames = Object.keys(personaMapRoyal);

function selectRandomPersona(personaList) {
  const randomIndex = Math.floor(Math.random() * personaList.length);
  return personaList[randomIndex];
}

const categorise = (value) => {
    for (const [category, items] of Object.entries(classes)){
        if (items.includes(value)){
            return category;
        }
    }
    return "unknown";
}

function main(){
    const randomPersona = selectRandomPersona(personaNames);
    selectedPersona = randomPersona;

    const selectedPersonaValues = personaMapRoyal[selectedPersona];
    selectedPersonaElems = selectedPersonaValues["elems"];

    selectedElems = selectedPersonaElems.map(categorise);
    console.log(selectedPersona);
    console.log(selectedElems);

}

function compareGuess(){

    //Prevents refresh when entering a guess
    event.preventDefault();

    const userGuessInput = document.getElementById('userGuessSuggest').value;
    let resultElement = document.getElementById('result');

    if (!resultElement){
        resultElement = document.createElement('div');
        resultElement.id = 'result';
        document.body.appendChild(resultElement);
    }

    if (previousGuesses.includes(userGuessInput)){
        //console.log("Already guessed");
        return null;
    }else{
        if (userGuessInput){

            const userGuessValue = userGuessInput;
            const correctAnswer = selectedPersona;
            //console.log(userGuessInput);
            if (userGuessValue == correctAnswer){

                resultElement.textContent = "Correct!";
                resultElement.style.color = "green";

            }else{
                resultElement.textContent = "Wrong!"
                resultElement.style.color = "red"
                compareElems(userGuessValue);
            }
        }
    }

}

function compareElems(userGuess){

    var guessPersonaValues = personaMapRoyal[userGuess];
    var guessPersonaElems = guessPersonaValues["elems"];
    const guessElems = guessPersonaElems.map(categorise);

    console.log(guessElems);
    let compareMap = [];

    guessElems.forEach((item, i) => {
        console.log(guessElems[i]);
            if (guessElems[i] === selectedElems[i]){
                if (guessElems[i] === "mighty"){
                    console.log(guessPersonaElems[i]);
                    console.log(selectedPersonaElems[i]);
                    if (guessPersonaElems[i] === selectedPersonaElems[i]){
                        compareMap.push("True")
                    }else{
                        compareMap.push("Partial")
                    }
                }else{
                    compareMap.push("True");
                }

            }else{
                compareMap.push("False");
            }
    });
    console.log(compareMap);
    previousGuesses.push(userGuess);
    console.log(previousGuesses);
}

//Auto-suggest Persona
function autoComplete(input){
    if (input == ''){
        return []
    }
    var reg = new RegExp("^" + input, "i");
    var returnFilter = personaNames.filter(function(term){

        return term.match(reg);
    });
    //console.log(returnFilter);
    return returnFilter;
}

function showResults(val){
        let select = document.getElementById("userGuess");
        select.innerHTML = '';

        let terms = autoComplete(val);

        for (let i = 0; i < terms.length; i++){
        let option = document.createElement("option");
        option.value = terms[i];
        option.textContent = terms[i];
        select.appendChild(option);
        }
}


document.addEventListener("DOMContentLoaded", () => {

    main();

    const form = document.querySelector('form');
    if (form){
        form.addEventListener('submit', compareGuess);
    }
});

