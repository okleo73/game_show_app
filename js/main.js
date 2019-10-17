const qwerty = document.getElementById('qwerty');
const phraseId = document.getElementById('phrase');
let missed = 0;
const phrases = ['come together', 'hello goodbye', 'imageine', 'let it be', 'yesterday'];
const overlay = document.getElementById('overlay');
const btnReset = document.querySelector('.btn__reset');
let username = prompt(`Pick a username!`);
alert(`Hello ${username}, nice to see you. Please click the start game button to start a game of Beetle's Song trivia!`);
let wins = 0;
let loss = 0;

//listens for the start button to be clicked at the start of the game
btnReset.addEventListener('click', () => {
  overlay.style.display = 'none';
})

//returns random phrase from array
const getRandomPhraseAsArray = arr => {
    const randomPhrase = phrases[(parseInt(Math.random() * phrases.length))];
    const splitRandomPhrase = randomPhrase.split('');
    return splitRandomPhrase;
}

//adds phrases to the display
const addPhraseToDisplay = () => {
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
}
addPhraseToDisplay();

//checks if letter is in the phrase
const checkLetter = userGuess => {
    let phraseList = document.getElementById('phrase');
    let listItems = phraseList.querySelectorAll('li');
    let match = null;
    for (let i = 0; i < listItems.length; i++) {
        if (userGuess == listItems[i].textContent) {
            listItems[i].classList.add("show"); 
            match = userGuess;
        }
    }
    return match;
}

const keyboard = document.getElementById('qwerty');
const score = document.getElementById('scoreboard');
const hearts = document.querySelector('.tries');

const gameReset = () => {
    //adds try again button to win/lose screen
    let selectorStart = document.querySelector('#overlay');
    let tryAgainBttn = document.createElement('a');
    tryAgainBttn.innerHTML = "Play again?";
    tryAgainBttn.className = "try-again-bttn";
    tryAgainBttn.style.color = "white";
    selectorStart.append(tryAgainBttn);

    //hides win/loss screen
    let titleGame = document.querySelector('.try-again-bttn');
    titleGame.addEventListener('click', () => {
        overlay.style.display = 'none';
    });

    //removes phrase from display
    let phraseList = document.querySelector('ul');
    let phraseListItems = document.querySelectorAll('.letter, .space');
    for(let i = 0; i < phraseListItems.length; i++) {
        phraseList.removeChild(phraseListItems[i]);
    }
    
    //adds new phrase to the display
    addPhraseToDisplay();

    //restarts on-screen keyboard
    let disabledKeyboard = document.querySelectorAll('button');
    for (let i = 0; i < disabledKeyboard.length; i++) {
        disabledKeyboard[i].removeAttribute('disabled');
        disabledKeyboard[i].classList.remove('chosen'); //removes background-color of elements with class chosen
        disabledKeyboard[i].style.removeProperty('background-color'); //removes background-color of elements with orange background color
    }

    //restarts hearts
    let heartsReset = document.querySelectorAll('.hide-hearts');
    for (let i=0; i < heartsReset.length; i++) {
        heartsReset[i].classList.add("tries"); 
        heartsReset[i].style.display = 'inline-block';
        heartsReset[i].classList.remove('hide-hearts');
    }
    missed=0;

    let oldScore = document.querySelector('#banner p');
    // let banners2 = document.getElementById('banner');
    // let banners2 = document.querySelector('.header');
    // let oldScore = banners2.firstElementChild;
    // banners2.removechild(oldScore);
    oldScore.remove();
}

let totalScore = document.createElement('p');
let banners = document.querySelector('#banner');
totalScore.textContent = `Wins:${wins}  Loss:${loss}`;

banners.append(totalScore);
//checks if game is won
const checkWin = () => {
    const classLetter = document.querySelectorAll('.letter');
    const classShow = document.querySelectorAll('.show');

    let totalScore = document.createElement('p');
    let banners = document.querySelector('#banner');
    totalScore.textContent = `Wins:${wins}  Loss:${loss}`;
    if (classLetter.length == classShow.length) {
        overlay.className = 'win';
        overlay.style.display = 'flex';
        overlay.textContent = `Congrats ${username}, You won!`;
        wins++;

        // totalScore.textContent = `Wins:${wins}  Loss:${loss}`;
        banners.append(totalScore);
        gameReset();

    } 
    if (missed > 4) {
        overlay.className = 'lose';
        overlay.style.display = 'flex';
        overlay.textContent = `Sorry ${username}, try again next time`;
        loss++;
     
        // totalScore.textContent = `Wins:${wins}  Loss:${loss}`;
        banners.append(totalScore);
        gameReset();
        
    }  
}

//listens for keyboard clicks
keyboard.addEventListener('click', (event) => {
    if (event.target.tagName == 'BUTTON') {
        event.target.className = 'chosen';
        event.target.disabled = 'true';
    
        let results = checkLetter(event.target.textContent);
        if (event.target.textContent !== results) {
            // const ol = document.getElementById('userScore');
            // const li = ol.firstElementChild;
            // ol.removeChild(li);

            let hearts = document.querySelector('.tries');
            hearts.className = ' ';
            hearts.classList.add("hide-hearts"); 
            hearts.style.display = "none";

            missed += 1; 
            event.target.style.backgroundColor = "orange";
            
        }
    }
    checkWin();
});


// let totalScore = document.createElement('p');
// let banners = document.querySelector('#banner');
// totalScore.textContent = `Wins:${wins}  Loss:${loss}`;
// totalScore.textContent = 'Wins:'+ wins + 'Loss:' + loss 'Best: ';
// totalScore.add
// banner.append(totalScore);
// banners.append(totalScore);

// var scoreText;
// var game = new Phaser.Game(480, 320, Phaser.AUTO, null, {preload: preload, create: create, update: update});
// let score2 = 0;
// scoreText = game.add.text(5, 5, 'Points: 0', { font: '18px Arial', fill: '#0095DD' });

