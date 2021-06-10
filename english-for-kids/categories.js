import {categories} from './cards.js';
import {cards, addParamCards} from './cards.js';
import {trainMode} from './modesGame.js';
import {game} from './game.js';
import {rewriteLocalStorage} from './cards.js';
import {sortStatistic} from './statistic.js';

const mainPage = document.getElementById("main");
const menuWrapper = document.querySelector(".wrapper__menu");
const checkbox = document.querySelector(".wrapper__checkbox");
export let statePage = {
  state: true,
  currentCategory: null,
  mainPage: true
}


export class CategoriesCards {
    constructor(name) {
      this.name = name;
    }

    createCategoriesListMenu() {
      function getMenuList () {
        let fragment = new DocumentFragment();
        let ul = document.createElement('ul');
      
        for(let i=0; i<=9; i++) {
          const categoryName = categories[i];
          let li = document.createElement('li');
          li.className = "wrapper__menu-item";
          !i? li.append("Main Page") : i === 9 ? li.append("Statistic") : li.append(categoryName);
          
          ul.append(li);

          li.addEventListener("click", function() {
            if (i === 9) {
              const statistic = new Statistic();
              statistic.createStatisticPage(categories, cards);
              rewriteLocalStorage()
              sortStatistic()
              checkbox.checked = false;
            } else {
              !i? statePage.mainPage = true : statePage.mainPage = false
              loadPage(i);
              checkbox.checked = false;
            }

          })
        }

        fragment.append(ul)
        return fragment;
      }
      menuWrapper.append(getMenuList())
      }

    createCategoriesCards() {
      function getMainPageContent() {
        let fragment = new DocumentFragment();
        let ul = document.createElement('ul');
        for(let i=0; i<=7; i++) {
            const categoryName = categories[i];
            const cardImg = cards[i][0].image;
          let li = document.createElement('li');
          li.className = "cards";
          li.insertAdjacentHTML('afterbegin', `<img class="cards-img" src="./${cardImg}" alt=""><h2>${categoryName}</h2>`);
          ul.append(li);
          li.addEventListener('click',   function() {
            statePage.mainPage = false;
            loadPage(i)
          });
        }
        fragment.append(ul)
        return fragment;
      }
      mainPage.append(getMainPageContent())
    }
  }


  export class CategoryPage {
    constructor(cards) {
      this.cards = cards;
    }
    createTrainCards(category) {
      function getCategoryPageContent() {
        
        let fragment = new DocumentFragment();
        let ul = document.createElement('ul');

        for(let i=0; i<=7; i++) {
          const cardWord = cards[category][i].word;
          const cardTranslation = cards[category][i].translation;
          const cardImg = cards[category][i].image;
          const cardSound = cards[category][i].audioSrc;

        let li = document.createElement('li')
        li.className = "cards";

        let front = document.createElement('div');
        front.className = "front-side-card"
        front.insertAdjacentHTML('afterbegin', `<img class="cards-img" src="./${cardImg}" alt=""><h2>${cardWord}</h2>`);
        const flipCard = document.createElement("img");
        flipCard.src = './img/rotate.svg';
        flipCard.alt = 'flip icon';
        flipCard.className = "flip-card-img";
        front.append(flipCard);
        li.append(front);

        let back = document.createElement('div');
        back.className = "back-side-card";  
        back.insertAdjacentHTML('afterbegin', `<img class="cards-img" src="./${cardImg}" alt=""><h2>${cardTranslation}</h2>`);
        li.append(back);

        ul.append(li);

        flipCard.addEventListener('click', function() {
          front.style.transform = "rotateY(180deg)";
          back.style.transform = "rotateY(360deg)";
        })

        ul.addEventListener('mouseover', function() {
          if (event.target === ul) {
            front.style.transform = "rotateY(0deg)";
            back.style.transform = "rotateY(180deg)";
          }
        })

        li.addEventListener('click', function() {
          const pronunciation =  new Audio(cardSound);
          pronunciation.play();
          const currentCard = cards[category][i];
          currentCard.clicksTrainMode++;
        })        
      }
        fragment.append(ul)
        return fragment;
      }
      mainPage.append(getCategoryPageContent())
    }

    createPlayCards(category) {
      let cardsRendered = [];
      function getCategoryPageContent() {
        
        let fragment = new DocumentFragment();
        let ul = document.createElement('ul');

        for(let i=0; i<=7; i++) {
          const cardWord = cards[category][i].word;
          const cardTranslation = cards[category][i].translation;
          const cardImg = cards[category][i].image;
          const cardSound = cards[category][i].audioSrc;

        let li = document.createElement('li')
        li.className = "cards";
        li.style.height = "170px"

        let front = document.createElement('div');
        front.className = "front-side-card"
        front.insertAdjacentHTML('afterbegin', `<img class="cards-img" src="./${cardImg}" alt="">`);

        li.append(front);
        ul.append(li);
        li.setAttribute('id', i);
          cardsRendered.push(li);
      }
        fragment.append(ul)
        return fragment;
      }
      
      mainPage.append(getCategoryPageContent());
      const gameController = document.createElement('div');
      gameController.className = "game-controller";
      const startBtn = document.createElement('button');
      startBtn.className = "start-btn";
      startBtn.insertAdjacentText('afterbegin', 'Start')
      gameController.append(startBtn);
      const errorsField = document.createElement('div');
      errorsField.className = 'errors-field'
      const correctField = document.createElement('div');
      correctField.className = 'correct-field'

      gameController.prepend(errorsField);
      gameController.append(correctField);
      mainPage.append(gameController);

      startBtn.addEventListener('click', function startBtnEventHandler() {
        game(cardsRendered, category);
        startBtn.removeEventListener('click', startBtnEventHandler)
        startBtn.innerHTML = '';
        startBtn.insertAdjacentText('afterbegin', 'Repeat');
      });
    }
  }

  export class ResultPage {
    constructor(result) {
      this.result = result;
    }

    showResultGame() {
      const background = document.createElement('div');
      background.className = "result-page";
      const imageResult = document.createElement('img');
      background.append(imageResult);
      const body = document.querySelector('body');
      body.prepend(background);
      statePage.mainPage = true;
      if (this.result.includes(0)) {
          const errorsCount = this.result.filter(e=>e===0).length;
          imageResult.src = "./img/failure.jpg";
          imageResult.alt = "sad emoji";
          const errors = document.createElement('p');
          errors.innerText = `Errors: ${errorsCount}`;
          errors.className = "errors";
          background.prepend(errors);

      } else {
          imageResult.src = "./img/success.jpg";
          imageResult.alt = "happy emoji";
      }
      setTimeout(() => {
        loadPage();
        background.remove();
      }, 4000)

    }
  }

  export class Statistic {
    constructor() {

    }

    createStatisticPage(categories, cards) {
      mainPage.innerHTML = '';
      mainPage.style.display = 'flex';
      mainPage.style.flexDirection = 'column';
      const statisticContainer = document.createElement('div');
      statisticContainer.className = "statistic-container";
      const table = document.createElement('table');
      const buttonContainer = document.createElement('div');
      buttonContainer.className = 'wrapper-btn';
      mainPage.prepend(buttonContainer);
      const repeatWordsBtn = document.createElement('button');
      buttonContainer.prepend(repeatWordsBtn);
      repeatWordsBtn.className = 'repeat-words-btn';
      repeatWordsBtn.insertAdjacentText('afterbegin', 'Repeat difficult words');
      const resetStatisticBtn = document.createElement('button');
      resetStatisticBtn.className = 'reset-statistic-btn';
      resetStatisticBtn.insertAdjacentText('afterbegin', 'Reset');
      buttonContainer.prepend(resetStatisticBtn);

      function getStatisticContent() {
        let fragment = new DocumentFragment();

        const header = document.createElement('tr');
        header.insertAdjacentHTML('afterbegin', '<th>Category</th><th>Word</th><th>Translation</th><th>Clicks</th><th>Correct</th><th>Errors</th><th>% correct</th>');
        table.prepend(header);
        for (let i = 0; i <= 7; i++) {
          for (let j = 0; j <= 7; j++) {
            const tr = document.createElement('tr');
            let percentErrors;
            (+cards[i][j].clicksErrorPlayMode === 0)? percentErrors = 0 : percentErrors = Math.floor(+(cards[i][j].clicksCorrectPlayMode) / +(cards[i][j].clicksErrorPlayMode)  * 100)
            tr.insertAdjacentHTML('afterbegin', `<td>${categories[i]}</td><td>${cards[i][j].word}</td><td>${cards[i][j].translation}</td><td>${cards[i][j].clicksTrainMode}</td><td>${cards[i][j].clicksCorrectPlayMode}</td><td>${cards[i][j].clicksErrorPlayMode}</td><td>${percentErrors}</td>`);
            table.append(tr);
          }
        }
        fragment.append(table)
        return fragment;

      }
      mainPage.append(getStatisticContent());

      repeatWordsBtn.addEventListener('click', function() {

        const repeatPage = new difficultWordsPage();
        repeatPage.createDifficultCards()
      })

      resetStatisticBtn.addEventListener('click', function() {
        localStorage.clear();
        addParamCards();
        mainPage.innerHTML = '';
        const statistic = new Statistic();
            statistic.createStatisticPage(categories, cards);
            sortStatistic()
      })
    }
}

//=======================================================
export class difficultWordsPage {
  constructor(cards) {
    this.cards = cards;
  }
  createDifficultCards(category) {
    function getDifficultWordsPageContent() {
      
      let fragment = new DocumentFragment();
      let ul = document.createElement('ul');

      for(let i=0; i<=7; i++) {
        const cardWord = cards[category][i].word;
        const cardTranslation = cards[category][i].translation;
        const cardImg = cards[category][i].image;
        const cardSound = cards[category][i].audioSrc;

      let li = document.createElement('li')
      li.className = "cards";

      let front = document.createElement('div');
      front.className = "front-side-card"
      front.insertAdjacentHTML('afterbegin', `<img class="cards-img" src="./${cardImg}" alt=""><h2>${cardWord}</h2>`);
      const flipCard = document.createElement("img");
      flipCard.src = './img/rotate.svg';
      flipCard.alt = 'flip icon';
      flipCard.className = "flip-card-img";
      front.append(flipCard);
      li.append(front);

      let back = document.createElement('div');
      back.className = "back-side-card";  
      back.insertAdjacentHTML('afterbegin', `<img class="cards-img" src="./${cardImg}" alt=""><h2>${cardTranslation}</h2>`);
      li.append(back);

      ul.append(li);

      flipCard.addEventListener('click', function() {
        front.style.transform = "rotateY(180deg)";
        back.style.transform = "rotateY(360deg)";
      })

      ul.addEventListener('mouseover', function() {
        if (event.target === ul) {
          front.style.transform = "rotateY(0deg)";
          back.style.transform = "rotateY(180deg)";
        }
      })

      li.addEventListener('click', function() {
        const pronunciation =  new Audio(cardSound);
        pronunciation.play();
        const currentCard = cards[category][i];
        currentCard.clicksTrainMode++;
      })        
    }
      fragment.append(ul)
      return fragment;
    }
    
    mainPage.append(getDifficultWordsPageContent())
  }
}

//========================================================

  const mainPageContent = new CategoriesCards()
  mainPageContent.createCategoriesCards()
  mainPageContent.createCategoriesListMenu()


  const gamePageContent = new CategoryPage(cards)


  export function loadPage(category) {
    statePage.currentCategory = category;
    mainPage.innerHTML = '';
    statePage.mainPage? mainPageContent.createCategoriesCards() : trainMode? gamePageContent.createTrainCards(statePage.currentCategory) : gamePageContent.createPlayCards(statePage.currentCategory)
  }

  window.addEventListener('click', function(e){  
        if (checkbox.checked) {
      if (!menuWrapper.contains(e.target) && !checkbox.contains(e.target)){
          checkbox.checked = false;
          }
      } 
    });

