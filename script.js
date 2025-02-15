import { personaMapRoyal } from './PersonaDataRoyal.js';

const types = ['Physical', 'Gun', 'Fire', 'Ice', 'Electric', 'Wind', 'Psychic', 'Nuclear', 'Bless', 'Curse']
let selectedPersona = "";
let selectedPersonaElems = "";

//Putting affinities into guessing categories
const weakClass = ['wk']
const neutralClass = ['-']
const strongClass = ['rs']
const mightyClass = ['rp', 'ab', 'nu']

function selectRandomPersona(data) {
  const personaNames = Object.keys(data);
  const randomIndex = Math.floor(Math.random() * personaNames.length);
  return personaNames[randomIndex];

}

function displayPersonaName(){
    const randomPersona = selectRandomPersona(personaMapRoyal);
    selectedPersona = randomPersona;
    selectedPersonaElems = personaMapRoyal[selectedPersona].elems;
    const personaNameElement = document.getElementById('personaName')

    if (personaNameElement){
        personaNameElement.textContent = randomPersona;
    } else{
        console.error('Element with id "personaName" not found.');
    }
}

function compareAffinities(){

}


function compareGuess(){
    event.preventDefault();

    const userGuessInput = document.getElementById('userGuess')
    let resultElement = document.getElementById('result');

    if (!resultElement){
        resultElement = document.createElement('div');
        resultElement.id = 'result';
        document.body.appendChild(resultElement);
    }

    if (userGuessInput){

        const userGuessValue = userGuessInput.value.trim().toLowerCase();
        const correctAnswer = selectedPersona.toLowerCase();

        if (userGuessValue == correctAnswer){

            resultElement.textContent = "Correct!";
            resultElement.style.color = "green";

        }else{
            resultElement.textContent = "Wrong!"
            resultElement.style.color = "red"
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    displayPersonaName();

    const form = document.querySelector('form');
    if (form){
        form.addEventListener('submit', compareGuess);
    }
});

