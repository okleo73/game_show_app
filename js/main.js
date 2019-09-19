const qwerty = document.getElementById('qwerty');
const phraseId = document.getElementById('phrase');
let missed = 0;
const phrases = ['what you talkin bout willis', 'born to run', 'imageine', 'let it be', 'yesterday'];
const overlay = document.getElementById('overlay');
const btnReset = document.querySelector('.btn__reset');

btnReset.addEventListener('click', () => {
  overlay.style.display = 'none';
})

function getRandomPhraseAsArray(arr) {
    const randomPhrase = phrases[(parseInt(Math.random() * phrases.length))];
    const splitRandomPhrase = randomPhrase.split('');
    return splitRandomPhrase;
}
//console.log(getRandomPhraseAsArray(phrases));

//Game display
function addPhraseToDisplay() {
    //let userInput = [ ];
    const phraseArray = getRandomPhraseAsArray(phrases);
    for(let i = 0; i < phraseArray.length; i++) {
        const li = document.createElement('li');
        const ul = document.querySelector('ul');
        ul.appendChild(li);
        li.textContent = phraseArray[i];
        if (phraseArray[i] === ' ') {
            li.className = 'space';
        } else {
             li.className = 'letter';
        }
    }
    console.log(phraseArray); 
}
addPhraseToDisplay();
//all characters have the class letters applied, other than the appendChild.



