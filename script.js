import { personaMapRoyal } from './PersonaDataRoyal.js';

function getUserPersona(callback){
  var userPersona = prompt('Enter your guess: ');
  callback(userPersona)
}

const types = ['Physical', 'Gun', 'Fire', 'Ice', 'Electric', 'Wind', 'Psychic', 'Nuclear', 'Bless', 'Curse']
function selectRandomPersona(data) {
  const personaNames = Object.keys(data);
  const randomIndex = Math.floor(Math.random() * personaNames.length);
  return personaNames[randomIndex];

}

function displayPersonaName(){
    const randomPersona = selectRandomPersona(personaMapRoyal);
    const personaNameElement = document.getElementById('personaName')

    if (personaNameElement){
        personaNameElement.textContent = randomPersona;
    } else{
        console.error('Element with id "personaName" not found.');
    }
}

displayPersonaName();