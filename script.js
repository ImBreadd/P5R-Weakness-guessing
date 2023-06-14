function getUserPersona(callback){
  var userPersona = prompt('Enter your guess: ');
  callback(userPersona)
}

function selectRandomPersona(data) {
  const personaNames = Object.keys(data);
  const randomIndex = Math.floor(Math.random() * personaNames.length);
  const randomPersonaName = personaNames[randomIndex];
  const randomPersonaData = data[randomPersonaName];

  return {
    name: randomPersonaName,
    data: randomPersonaData
  };
}

function displayElements(persona){
  const elementBox = document.querySelector('.element-box ');
  const elems = persona.data.elems;

  elems.forEach((elem) => {
    const element = document.createElement('div');
    element.classList.add('element');
    element.textContent = elem;
    elementBox.appendChild(element);
  })
}

function displayGuessBoxes(selectedPersona){
  const guessBox = document.querySelector('.guess-box');
  const elems = Array.from(selectedPersona.data.elems);
  
  elems.forEach(() => {
    const guessInput = document.createElement('input');
    guessInput.type = 'text';
    guessInput.classList.add('guess-input');
    guessBox.appendChild(guessInput);
  });
}

function comparePersonas(actual, guess, index) {
  const actualElems = actual.data.elems;
  const guessElem = guess.trim().toLowerCase();
  const elementBoxes = document.querySelectorAll('.element');
  const elementBox = elementBoxes[index];

  if (actualElems[index].toLowerCase() === guessElem) {
    elementBox.classList.add('correct-guess');
    return true;
  } else {
    elementBox.classList.add('incorrect-guess');
    setTimeout(() => {
      elementBox.classList.remove('incorrect-guess');
    }, 1000);
    return false;
  }
}

function moveFocusToNextInput(guessInputs, currentIndex) {
  const nextIndex = currentIndex + 1;

  if (nextIndex < guessInputs.length) {
    const nextInput = guessInputs[nextIndex];
    nextInput.focus();
  }
}

function setupGuessInputEventListeners(guessInputs) {
  guessInputs.forEach((input, index) => {
    input.addEventListener('keydown', (event) => {
      const key = event.key;

      if (key === 'Enter') {
        event.preventDefault();

        const guessValue = input.value.trim();
        const isGuessCorrect = comparePersonas(selectedPersona, guessValue, index);

        if (isGuessCorrect){
          input.disabled = true;
        }else {
            input.value = ''
        }
        moveFocusToNextInput(guessInputs, index);

      }else if(key ==='Tab'){
        event.preventDefault();
        moveFocusToNextInput(guessInputs, index)
      }
    });
  });
}

function giveUp(){
  const guessBox = document.querySelector('.guess-box');
  guessBox.innerHTML = '';
  displayGuessBoxes(selectedPersona);
  const guessInputs = document.querySelectorAll('.guess-input');
  setupGuessInputEventListeners(guessInputs);
  const topElementBox = document.querySelector('.element-box .element:first-child');
  topElementBox.style.visibility = 'visible';
}


const selectedPersona = selectRandomPersona(personaMapRoyal);

const personaNameElement = document.getElementById('persona-name');
personaNameElement.textContent = selectedPersona.name;
displayElements(selectedPersona);
displayGuessBoxes(selectedPersona);

const guessInputs = document.querySelectorAll('.guess-input');
setupGuessInputEventListeners(guessInputs);

const giveUpButton = document.getElementById('.give-up-button');
giveUpButton.addEventListener('click', giveUp);