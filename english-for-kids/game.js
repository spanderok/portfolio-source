import{cards} from './cards.js';
import{ResultPage} from './categories.js'

export function game(cardsRendered, currentCategory) {
const repeatBtn = document.querySelector('.start-btn');
const errorsField = document.querySelector('.errors-field');
const correctField = document.querySelector('.correct-field');
    
let numbers = [] 
numbers = [...Array(8).keys()]
.map(x => x)
.sort(() => Math.random() - 0.5);

let i = 0;
let resultGame = [];

function playWord(i) {
    if (i === 8) {
        const audio = new Audio('./audio/success.mp3');
        setTimeout(()=> {audio.play()},1000);
        const result = new ResultPage(resultGame);
        result.showResultGame()
    } else {
        const audio = new Audio(cards[currentCategory][numbers[i]].audioSrc)
        setTimeout(()=> {audio.play()},1000)
    }
}

playWord(i)

    cardsRendered.forEach(element => {
        element.addEventListener('click', function selectCardsHandler() {
            const currentCard = cards[currentCategory].indexOf(cards[currentCategory][numbers[i]]);

            if (+element.id === currentCard) {
                const audio = new Audio('./audio/correct.mp3');
                audio.play();
                i++;
                playWord(i);
                element.style.filter = 'grayscale(90%) blur(3px)';
                element.classList.remove('cards');
                element.classList.add('cards-selected');
                element.removeEventListener('click', selectCardsHandler);
                correctField.insertAdjacentHTML('afterbegin', '<img src="./img/star-win.svg" alt="star">');
                resultGame.push(1);
                cards[currentCategory][currentCard].clicksCorrectPlayMode++;
                console.log(cards[currentCategory][currentCard].clicksCorrectPlayMode);
            } else {
                const audio = new Audio('./audio/error.mp3');
                audio.play();
                errorsField.insertAdjacentHTML('beforeend', '<img src="./img/star.svg" alt="star">');
                resultGame.push(0);
                cards[currentCategory][currentCard].clicksErrorPlayMode++;
                console.log(cards[currentCategory][currentCard].clicksErrorPlayMode);
            }
        })
    })

    repeatBtn.addEventListener('click', function repeatBtnEventHandler() {
        playWord(i);
    })
}

