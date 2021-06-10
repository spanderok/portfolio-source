const field = document.querySelector('.field');
const cellSize = 100;
const newGameButton = document.getElementById('new_game');
const finishedGameButton = document.querySelector('.finished-game');
let count = 0; 
const counter = document.querySelector('.counter');//счетчик ходов
 //console.log(finishedGameButton);

let empty = {
    value: 16,
    top: 0,
    left: 0
};

let cells = [];
cells.push(empty);


//звук
function sound() {
    let audio = new Audio(); // Создаём новый элемент Audio
    audio.src = "assets/sounds/hrus-kosti-vo-vremja-pereloma.mp3"; // Указываем путь к звуку "клика"
    //audio.autoplay = true; // Автоматически запускаем
    audio.play();
};

function move(index) {
    const cell = cells[index];
    const leftDiff = Math.abs(empty.left - cell.left);
    const topDiff = Math.abs(empty.top - cell.top);

    if (leftDiff + topDiff > 1) {
        return;
    }

    cell.element.style.left = `${empty.left*cellSize}px`;
    cell.element. style.top = `${empty.top*cellSize}px`;

    const emptyLeft = empty.left;
    const emptyTop = empty.top;
    empty.left = cell.left;
    empty.top = cell.top;
    cell.left = emptyLeft;
    cell.top = emptyTop;

    count++;
    counter.textContent = `counts: ${count}`;

    sound();
    const isFinished = cells.every(cell => {
      return cell.value === cell.top * 4 + cell.left +1;
      
    });

    if (isFinished) {
        if (count !== 0) {
            //берем из локал
            let returnTop10Pays = JSON.parse(localStorage.getItem("top10")) //достали из storage и спарсим его обратно в объект
         
             returnTop10Pays.push(count); // добавляем текущий результат ходов
             top10Saved (returnTop10Pays); // сортируем и оставляем 10 лучших
         
              //закидываем в локал назад
              let serialtop10Pays = JSON.stringify(top10Pays);
              localStorage.setItem("top10", serialtop10Pays);
         
           };

        setTimeout(()=>alert(`Ура! Вы решили головоломку за ${currentTime} и ${count} ходов`),5);
    }

}

  let numbers = [...Array(15).keys()]
     .sort(() => Math.random() - 0.5);

//проверка на решаемость

 function check() {
    for (var kDisorder = 0, i = 1, len = numbers.length-1; i < len; i++)
      for (var j = i-1; j >= 0; j--) if (numbers[j] > numbers[i]) kDisorder++;
      console.log(kDisorder);
      
          if (kDisorder % 2 === 1) {
        numbers.sort(() => Math.random() - 0.5);
        check();
        //console.log(numbers);
      } else {
        //console.log('2ok');
        //console.log(kDisorder);
      }
    //return numbers;
};

check();

for (let i=1; i <= 15; i++) {
    const cell = document.createElement('div');
    const value = numbers[i-1] + 1;
    cell.className = 'cell';
    cell.innerHTML = value ;

    const left = i % 4;
    const top = (i - left) / 4;

    cells.push({
        value: value,
        left: left,
        top: top,
        element: cell
    });

    
    cell.style.left = `${left*cellSize}px`;
    cell.style.top = `${top*cellSize}px`;

    field.append(cell);

    cell.addEventListener('click', () => {
       move(i);
    });
}
//кнопка new game
function clearField() {
let cell = document.querySelectorAll('.cell');

 cell.forEach(element => {
    element.remove();
 });
};



newGameButton.addEventListener("click", reset);


function reset() {
    overlay.classList.add("hidden");
    main.classList.add("hidden");

     //убираем пример с картинкой
     let imageExample = document.querySelector('.image-example');
     imageExample.style.width = 0 + 'px';
     imageExample.style.height = 0 + 'px';

     sec = 0;
     min = 0;
     currentTime = 0;
     time.textContent = `time: ${currentTime}`;
     start();

    clearField();
     empty = {
        value: 16,
        top: 0,
        left: 0
    };
    
     cells = [];
    cells.push(empty);

    count = 0;
    counter.textContent = `counts: ${count}`;


    numbers = [...Array(15).keys()]
     .sort(() => Math.random() - 0.5);

     check();

    for (let i=1; i <= 15; i++) {
        const cell = document.createElement('div');
        const value = numbers[i-1] + 1;
        cell.className = 'cell';
        cell.innerHTML = value ;
    
        const left = i % 4;
        const top = (i - left) / 4;
    
        cells.push({
            value: value,
            left: left,
            top: top,
            element: cell
        });
    
        cell.style.left = `${left*cellSize}px`;
        cell.style.top = `${top*cellSize}px`;
    
        field.append(cell);
    
        cell.addEventListener('click', () => {
           move(i);
        });
    }
}

//функия завершения игры
function finishedGame() {
    //остановка времени
    stop();

    //сортировка по порядку
    numbers.sort(function (a, b) {
    return a - b;
    });

    //очистка поля
    clearField();
    empty = {
        value: 16,
        top: 0,
        left: 0
    };
    
     cells = [];
    cells.push(empty);
    
    
   //отрисовка нового поля
  for (let i=0; i <= 14; i++) {
    const cell = document.createElement('div');
    const value = numbers[i] + 1;
    cell.className = 'cell';
    cell.innerHTML = value ;

    //const left = (i+1) - 1;
    //const top = (i+1) % 4;

    const left = i % 4;
    const top = (i - left) / 4;

    cells.push({
        value: value,
        left: left,
        top: top,
        element: cell
    });

    cell.style.left = `${left*cellSize}px`;
    cell.style.top = `${top*cellSize}px`;

    field.append(cell);


    cell.addEventListener('click', () => {
       move(i+1);
    });
  }

};

//кнопка завершения игры
finishedGameButton.addEventListener('click', () => {
    finishedGame();

             //для рейтинга топ 10
    
   

  if (count !== 0) {
   //берем из локал
   let returnTop10Pays = JSON.parse(localStorage.getItem("top10")) //достали из storage и спарсим его обратно в объект

    returnTop10Pays.push(count); // добавляем текущий результат ходов
    top10Saved (returnTop10Pays); // сортируем и оставляем 10 лучших

     //закидываем в локал назад
     let serialtop10Pays = JSON.stringify(top10Pays);
     localStorage.setItem("top10", serialtop10Pays);

  };

   

    setTimeout(()=>alert(`Ура! Вы решили головоломку за ${currentTime} и ${count} ходов`),5);

 });
