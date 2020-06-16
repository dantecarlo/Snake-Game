import {
  updateSnake,
  drawSnake,
  getSnakeHead,
  snakeIntersection,
} from './snake.js'
import { updateFood, drawFood } from './food.js'
import { outsideGrid } from './grid.js'
import { drawScore } from './score.js'

let gameOver = false
let lastRenderTime = 0
let GAME_SCORE = 0
let EXPANSION_RATE = 1
let GAME_LVL = 1
let SNAKE_SPEED = 5
let FOOD_SCORE = 5
let last_level = GAME_LVL

const gameBoard = document.getElementById('game-board')
const scoreTable = document.getElementById('score-table')

function checkDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}

let scoreLvl
function update() {
  scoreLvl = updateFood(GAME_SCORE, EXPANSION_RATE, FOOD_SCORE, GAME_LVL)
  GAME_SCORE = scoreLvl[0]
  GAME_LVL = scoreLvl[1]
  updateSnake()
  checkDeath()
}

function draw() {
  gameBoard.innerHTML = ''
  drawScore(scoreTable)
  drawSnake(gameBoard)
  drawFood(gameBoard)
  drawScore(scoreTable, GAME_SCORE, GAME_LVL)
}

function main(currentTime) {
  if (gameOver) {
    if (
      confirm(
        `Good Job! Your Score is ${GAME_SCORE}, Press ok to Try Again ;)'`
      )
    ) {
      window.location = '/'
    }
    return
  }

  window.requestAnimationFrame(main)
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
  if (last_level !== GAME_LVL) {
    SNAKE_SPEED += 5
    EXPANSION_RATE += EXPANSION_RATE
    FOOD_SCORE += FOOD_SCORE
  }
  last_level = GAME_LVL

  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return

  lastRenderTime = currentTime
  update()
  draw()
}

window.requestAnimationFrame(main)
