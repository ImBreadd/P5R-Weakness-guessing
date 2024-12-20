function getUserPersona(callback){
  var userPersona = prompt('Enter your guess: ');
  callback(userPersona)
}

types = ['Physical', 'Gun', 'Fire', 'Ice', 'Electric', 'Wind', 'Psychic', 'Nuclear', 'Bless', 'Curse']
function selectRandomPersona(data) {
  const personaNames = Object.keys(data);
  const randomIndex = Math.floor(Math.random() * personaNames.length);
  return personaNames[randomIndex];

}

document.addEventListener("DOMContentLoaded", () => {
    const randomPersonName = selectRandomPersona(PersonaDataRoyal);
    document.getElementById("display-box").innerText = `Random Persona: ${randomPersonaName}`;
})