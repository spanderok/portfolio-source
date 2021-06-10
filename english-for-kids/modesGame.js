import {statePage, loadPage} from './categories.js';

export let trainMode = true;
const trainPlaySwitcher = document.querySelector("switcher");

function trainPlaySwitch() {
    const toggle = document.querySelector(".toggle");
    const textSwitcher = document.querySelector(".switcher-text");


    if (trainMode) {
        toggle.classList.add("play");
        toggle.classList.remove("train");
        trainMode = false;
        textSwitcher.textContent = "Play";

    } else {
        toggle.classList.add("train");
        toggle.classList.remove("play");
        trainMode = true;
        textSwitcher.textContent = "Train";
    }
    loadPage(statePage.currentCategory)
}

trainPlaySwitcher.addEventListener("click", trainPlaySwitch);

export {trainPlaySwitch};