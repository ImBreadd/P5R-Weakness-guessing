//import { personaMapRoyal } from './PersonaDataRoyal.js';

const types = ['Physical', 'Gun', 'Fire', 'Ice', 'Electric', 'Wind', 'Psychic', 'Nuclear', 'Bless', 'Curse']
let selectedPersona = "";
let selectedPersonaElems = "";

//Putting affinities into guessing categories
const weakClass = ['wk']
const neutralClass = ['-']
const strongClass = ['rs']
const mightyClass = ['rp', 'ab', 'nu']

const personaNames = Object.keys(personaMapRoyal);

function selectRandomPersona(personaList) {
  const randomIndex = Math.floor(Math.random() * personaList.length);
  return personaList[randomIndex];
}

function testingLog(){
    const randomPersona = selectRandomPersona(personaNames);
    selectedPersona = randomPersona;
    console.log(selectedPersona);
    console.log(selectedPersonaElems);
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

    if (userGuessInput){

        const userGuessValue = userGuessInput;
        const correctAnswer = selectedPersona;
        console.log(userGuessInput);
        if (userGuessValue == correctAnswer){

            resultElement.textContent = "Correct!";
            resultElement.style.color = "green";

        }else{
            resultElement.textContent = "Wrong!"
            resultElement.style.color = "red"
        }
    }
}

function autoComplete(input){
    if (input == ''){
        return []
    }
    var reg = new RegExp("^" + input, "i");
    var returnFilter = personaNames.filter(function(term){

        return term.match(reg);
    });
    console.log(returnFilter);
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

    testingLog();

    const form = document.querySelector('form');
    if (form){
        form.addEventListener('submit', compareGuess);
    }
});

