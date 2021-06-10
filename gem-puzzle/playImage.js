let btnPlayImage = document.getElementById('play_image');


btnPlayImage.addEventListener('click', () => {

    let imageExample = document.querySelector('.image-example');
    imageExample.style.backgroundImage = "url('assets/images/example.jpg')";
    imageExample.style.width = 400 + 'px';
    imageExample.style.height = 400 + 'px';
    imageExample.innerHTML = "<span style='color: white;'>EXAMPLE</span>";


//отрисовка ячеек
overlay.classList.add("hidden");
main.classList.add("hidden");

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
   // ${value}
    const left = i % 4;
    const top = (i - left) / 4;

    cells.push({
        value: value,
        left: left,
        top: top,
        element: cell
    });

    cell.style.backgroundImage = "url('assets/images/"+value+".jpg')";

    cell.style.left = `${left*cellSize}px`;
    cell.style.top = `${top*cellSize}px`;

    field.append(cell);

    cell.addEventListener('click', () => {
       move(i);
    });
}
});