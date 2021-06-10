// Переменные для времени
const time = document.querySelector('.timer');
let sec = 0;
let min = 0;
let currentTime = 0;
let stopToggle = true;

// Запустить таймер
function start() {
    window.timerId = window.setInterval(() => {
        if (sec > 58) {
            sec = 0;
            min ++;
        } else {
            sec ++;
        }
        sec < 10 ? sec = '0' + sec : sec;
        currentTime = min + ':' + sec
        time.textContent = `time: ${currentTime}`;
    }, 1000);
    stopToggle = false;
}


// Остановить таймер
function stop() {
    window.clearInterval(window.timerId);
    stopToggle = true;
}