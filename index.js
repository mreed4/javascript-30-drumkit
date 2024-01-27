import { keys } from "./keys.js";

const keysContainer = document.querySelector(".keys");

keys.forEach((key) => {
  const keyElement = document.createElement("div");
  const kbdElement = document.createElement("kbd");
  const spanElement = document.createElement("span");

  keyElement.classList.add("key");

  kbdElement.textContent = key.key;

  spanElement.classList.add("sound");
  spanElement.textContent = key.sound;

  keyElement.appendChild(kbdElement);
  keyElement.appendChild(spanElement);

  const sound = new Audio(`./sounds/${key.sound}.wav`);

  keyElement.addEventListener("click", () => {
    sound.currentTime = 0;
    sound.play();
    keyElement.classList.add("playing");
  });

  keyElement.addEventListener("transitionend", () => {
    keyElement.classList.remove("playing");
  });

  keysContainer.appendChild(keyElement);
});

window.addEventListener("keydown", playSound);

function playSound(event) {
  const sounds = {
    A: "clap",
    S: "hihat",
    D: "kick",
    F: "openhat",
    G: "boom",
    H: "ride",
    J: "snare",
    K: "tom",
    L: "tink",
  }[event.key.toUpperCase()];

  const sound = new Audio(`./sounds/${sounds}.wav`);
  const keys = document.querySelectorAll(".key");

  if (!sound) return;

  sound.currentTime = 0;
  sound.play();

  keys.forEach((key) => {
    if (key.children[0].textContent === event.key.toUpperCase()) {
      key.classList.add("playing");
    }
  });
}
