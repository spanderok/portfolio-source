let buttonMenu = document.getElementById('menu');
let overlay = document.getElementById('overlay');
let main = document.getElementById('main');
let btnSavedGames = document.getElementById('saved_games');
let savedGamesMenu = document.querySelector('#saved_games_menu');
let btnBestScores = document.getElementById('best_scores');
let bestScoresMenu = document.getElementById('best_scores_menu');
let btnRules = document.getElementById('rules');
let rulesMenu = document.getElementById('rules_menu');
let btnsGoback = document.getElementsByClassName('go_back');
let itemsBestScore = document.querySelectorAll('.best-score-li');



 //console.log(saves[1]);

//вызов меню
buttonMenu.addEventListener('click', () => {
    overlay.classList.toggle('hidden');
    main.classList.toggle('hidden');
    
    if(overlay.classList.contains('hidden')) {
        start();
    }else{
        stop();
    }

    closeOpenMenu(savedGamesMenu);
    closeOpenMenu(bestScoresMenu);
    closeOpenMenu(rulesMenu);

    function closeOpenMenu (secondaryMenu) {
    if(secondaryMenu.classList.contains('hidden')) {
        return;
    }else{
        secondaryMenu.classList.add('hidden');
        main.classList.toggle('hidden');
    }
   }
 });

 //функция скрытия-открытия вторичного меню
 function toggleHidden (xmenu) {
    main.classList.toggle('hidden');
    xmenu.classList.toggle('hidden');
 };
//кнопка saved games
 btnSavedGames.addEventListener('click', () =>  toggleHidden (savedGamesMenu));
 

 //кнопка best scores
 btnBestScores.addEventListener('click', () => {
let returnTop10Pays = JSON.parse(localStorage.getItem("top10")) //достали из storage и спарсим его обратно в объект

     for (let i = 0; i <= 9; i++) {
         if (returnTop10Pays[i] !== undefined) {
            itemsBestScore[i].innerHTML = `number of moves: ${returnTop10Pays[i]}`;
         } else {
            itemsBestScore[i].innerHTML = "no result yet"
         };
        
     };


     toggleHidden(bestScoresMenu);
 });

//кнопка rules menu
btnRules.addEventListener('click', () => toggleHidden(rulesMenu));

let arr = Array.prototype.slice.call( btnsGoback );
arr.map(i => i.addEventListener('click', () => {
    main.classList.remove('hidden');

    closeSecondaryMenu(savedGamesMenu);
    closeSecondaryMenu(bestScoresMenu);
    closeSecondaryMenu(rulesMenu);

    function closeSecondaryMenu(secondaryMenu) {
        if (secondaryMenu.classList.contains('hidden')) {
            return;
        } else {
            secondaryMenu.classList.add('hidden');
        }
    }

} ));


