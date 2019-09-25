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
            //listItems[i].className = 'show';  //add class here
            listItems[i].classList.add("show");  //add class here
            match = userGuess;
        }
    }
    return match;
}


//Event listener
const keyboard = document.getElementById('qwerty');
// const score = document.querySelector('#scoreboard ol');
const score = document.getElementById('scoreboard');
const hearts = document.querySelector('.tries');

keyboard.addEventListener('click', (event) => {
    if (event.target.tagName == 'BUTTON') {
        event.target.className = 'chosen';
    }
    let results = checkLetter(event.target.textContent);
    if (event.target.textContent !== results) {
        //score.removeChild(hearts);
        //score.style.display = 'none';

        const ol = document.getElementById('userScore');
        const li = ol.firstElementChild;
        ol.removeChild(li);
        missed += 1;
    
        // const li = score.lastElementChild;
        // score.removeChild(li);  
    }
    checkWin();
});


//checkWin function

//const classShow = document.querySelectorAll('.chosen');
//const classLetter = document.querySelectorAll('.chosen');
//const classLetter = document.querySelectorAll('ul li');
function checkWin() {
    const classLetter = document.querySelectorAll('.letter');
    const classShow = document.querySelectorAll('.show');
    for(let i = 0; i < classLetter.length; i++) {
       if (classLetter.length == classShow.length) { 
            overlay.className = 'win';
            overlay.style.display = 'flex';
            overlay.textContent = "You won!";
        } 
    }
    if (missed > 4) {
        overlay.className = 'lose';
        overlay.style.display = 'flex';
        overlay.textContent = "Sorry, you lost";
    }  
}
// checkWin();
//called with every keypress

