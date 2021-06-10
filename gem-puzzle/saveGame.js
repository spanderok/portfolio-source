let saves = document.querySelectorAll('.saves');
let saveBtns = document.querySelectorAll('#save_button');
let loadBtns = document.querySelectorAll('#load_button');
let savesListItem = document.querySelectorAll('.saves');

let collectionSavedGames;

//console.log(saveBtns);

//создадим сохранение рейтинга, если его нет
let returnTop10Pays = JSON.parse(localStorage.getItem("top10")) //достали из storage и спарсим его обратно в объект
if (returnTop10Pays === null) {
    top10Pays = [];
    let serialTop10Pays = JSON.stringify(top10Pays);
    localStorage.setItem("top10", serialTop10Pays);
    
};
 


//создадим объект для всех сохраненных игр, если его нет 
let returnСollectionSavedGames = JSON.parse(localStorage.getItem("SavedGames"));
if (returnСollectionSavedGames === null) {
    collectionSavedGames = {
        //[saveKey]: savedGame 
    }; 
    let serialCollectionSavedGames = JSON.stringify(collectionSavedGames);
    localStorage.setItem("SavedGames", serialCollectionSavedGames);

    
};

//функция загрузки значения ячейки сохраненной игры
function loaderValueSave(number) {
    let returnValue = JSON.parse(localStorage.getItem(`SavedValue ${number}`)) //достали из storage и спарсим его обратно в объект
    saves[number].innerHTML = returnValue; // запись соответствующего значения в сообтветствующую ячейку
    
}
loaderValueSave(0);
loaderValueSave(1);
loaderValueSave(2);

//console.log(collectionSavedGames);


//функция сохранения
 function saveGame(index) {
    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth();
    let hours = today.getHours();
    let minutes = today.getMinutes();
    let seconds = today.getSeconds();
    let saveKey = `date:${day}.${month+1} lokal time: ${hours}:${minutes}:${seconds}`;
    
    //console.log('индекс нажатой кнопки',index);
    console.log('массив целс перд сохранением',cells);
     let saveKeyOld = saves[index].textContent; 
     //console.log("старый ключ", saveKeyOld);

     let savedGame = {
        min: minutes, 
        sec: seconds,
        timePlay: currentTime,
        minplay: min,
        secPlay: sec,
        counts: count,
        cellsOrder: cells
     };

     let returnСollectionSavedGames = JSON.parse(localStorage.getItem("SavedGames")) //достали из storage и спарсим его обратно в объект
     delete returnСollectionSavedGames[saveKeyOld];
     returnСollectionSavedGames[saveKey]=savedGame;

     let serialCollectionSavedGames = JSON.stringify(returnСollectionSavedGames);
     localStorage.setItem("SavedGames", serialCollectionSavedGames);
     saves[index].innerHTML = saveKey;

     //сохранение значения ячейки 
     let serialsaveKey = JSON.stringify(saveKey);
     localStorage.setItem(`SavedValue ${index}`, serialsaveKey);

    
   
 };
 //saveGame();
 
 

 //функция загрузки игры
 function loadGame(index) {
    let key = saves[index].textContent;
        console.log('load key',key);
    let returnСollectionSavedGames = JSON.parse(localStorage.getItem("SavedGames"));
    savedGame = returnСollectionSavedGames[key];
      console.log('saved game',savedGame);

      //убираем пример с картинкой
      let imageExample = document.querySelector('.image-example');
      imageExample.style.width = 0 + 'px';
      imageExample.style.height = 0 + 'px';
  
    

 //обнулили время действующее
    stop();
     
     currentTime = 0;
     time.textContent = `time: ${currentTime}`;

 //достаем время игры из сохранения
     min = savedGame.minplay;
     sec = savedGame.secPlay;
     currentTime = savedGame.timePlay;
     time.textContent = `time: ${currentTime}`;
     //console.log('saved game time',currentTime);
     start();

  //обнулили счетчик действующий
     count = 0;
     counter.textContent = `counts: ${count}`;

  //достаем счетчик из сохранения
    count = savedGame.counts;
    counter.textContent = `counts: ${count}`;


    clearField();
     empty = {
        value: 0,
        top: 0,
        left: 0
    };

  //достали массив ячеек из сохранения
    cells = savedGame.cellsOrder;
    empty = savedGame.cellsOrder[0];
  //console.log('ячейка empty после загрузки', empty);


    for (let i=1; i <= 15; i++) {
        const element = cells[i];
        const cell = document.createElement('div');
        const value = element.value;
        cell.className = 'cell';
        cell.innerHTML = element.value;
        field.append(cell);
        cell.style.left = `${element.left * cellSize}px`;
        cell.style.top = `${element.top * cellSize}px`;
        element.element = cell;
      
    
        cell.addEventListener('click', () => {
           move(i);
        });
    }
    //скрыли меню
    overlay.classList.add("hidden");
    savedGamesMenu.classList.add("hidden");
 }

 //узнаем index нажатой кнопки save
for (var i = 0, len = saveBtns.length; i < len; i++)
{  
    (function(index){
        saveBtns[i].onclick = function(){
            //console.log(index) ;
            saveGame(index);
        }    
    })(i);
}
 //узнаем index нажатой кнопки load
 for (var i = 0, len = loadBtns.length; i < len; i++)
 {  
     (function(index){
        loadBtns[i].onclick = function(){
             
             //console.log(index) ;
             loadGame(index);
         }    
     })(i);
 }

//  let arrSave = Array.prototype.slice.call( saveBtns );
//  arrSave.map(i => i.addEventListener('click', () => {
//  //console.log('2');
// } ));




