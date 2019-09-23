const qwerty = document.getElementById('qwerty');
const phraseId = document.getElementById('phrase');
let missed = 0;
const phrases = ['what you talkin bout willis', 'born to run', 'imageine', 'let it be', 'yesterday'];
const overlay = document.getElementById('overlay');
const btnReset = document.querySelector('.btn__reset');

btnReset.addEventListener('click', () => {
  overlay.style.display = 'none';
})

const getRandomPhraseAsArray = (arr) => {
    const randomPhrase = phrases[(parseInt(Math.random() * phrases.length))];
    const splitRandomPhrase = randomPhrase.split('');
    return splitRandomPhrase;
}
 //console.log(getRandomPhraseAsArray(phrases));

//Game display
function addPhraseToDisplay() {
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
    //console.log(phraseArray); 
}
addPhraseToDisplay();

//Letter check
function checkLetter(userGuess) {
    let phraseList = document.getElementById('phrase');
    let listItems = phraseList.querySelectorAll('li');
    //let listItemsClass = document.getElementsByClassName('letters');
    let match = null;
    for (let i = 0; i < listItems.length; i++) {
        //let listItemsClass = listItems.getElementsByClassName('letters')[i]; 
        if (userGuess == listItems[i].textContent) {
            listItems[i].className = 'show'; 
            match = userGuess;
        }
    }
    return match;
}


//Event listener
const keyboard = document.getElementById('qwerty');
const score = document.getElementById('scoreboard');
const hearts = document.querySelector('.tries');

keyboard.addEventListener('click', (event) => {
    if (event.target.tagName == 'BUTTON') {//stumped
        event.target.className = 'chosen';
    }
    let results = checkLetter();
    if (results == event.target.textContent) {
        //score.removeChild(hearts);
        score.style.display = 'none';
    }
});






