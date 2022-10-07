"use strict"

const dino = document.querySelector(".dino")
const dinoImg = document.querySelector("#dino-img")
const cactus = document.querySelectorAll(".cactus-img")
const scoreElement = document.querySelector("#score")
const highScoreElement = document.querySelector("#high-score")
let score = 0
let highScore = 0
let scoreUpIntervalValue = 100
let scoreUpInterval = setInterval(scoreUp, 100)

function dinoMove() {
  if (dino.classList.contains("jump")) {
    return
  }
  dino.classList.add("jump")
  setTimeout(() => {
    dino.classList.remove("jump")
  }, 1000)
}

function scoreUp() {
  if (score % 100 === 0 && score !== 0) {
    scoreUpIntervalValue -= 10
    clearInterval(scoreUpInterval)
    scoreUpInterval = setInterval(scoreUp, scoreUpIntervalValue)
  }
  score++
  scoreElement.textContent = score
}

function highScoreUp() {
  if (score > highScore) {
    highScore = score
    highScoreElement.textContent = highScore
  }
}

setInterval(dinoCactusCrash, 100)

function dinoCactusCrash() {
  cactus.forEach(element => {
    let propertyTop = parseInt(window.getComputedStyle(dino).getPropertyValue("margin-top"))
    let propertyLeft = parseInt(window.getComputedStyle(element).getPropertyValue("margin-left"))
    if (propertyLeft < 90 && propertyTop >= 150 && (propertyTop > propertyLeft)) {
      clearInterval(scoreUpInterval)
      highScoreUp()
      score = 0
      scoreElement.textContent = score
      scoreUpIntervalValue = 100
      scoreUpInterval = setInterval(scoreUp, 100)
      confirm("Game Over! Play again?").then(() => {
        scoreUpInterval = setInterval(scoreUp, 100)
      })
    }
  });
}

document.addEventListener("keyup", dinoMove)