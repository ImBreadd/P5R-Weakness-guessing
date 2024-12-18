function getUserPersona(callback){
  var userPersona = prompt('Enter your guess: ');
  callback(userPersona)
}

types = ['Physical', 'Gun', 'Fire', 'Ice', 'Electric', 'Wind', 'Psychic', 'Nuclear', 'Bless', 'Curse']
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
