import { onSnake, expandSnake } from './snake.js'
import { randomGridPosition } from './grid.js'
import { updateScore } from './score.js'

let food = randomGridPosition()
let lvlUp = 10
function getRandomFoodPosition() {
  let newFoodPosition
  while (newFoodPosition == null || onSnake(newFoodPosition)) {
    newFoodPosition = randomGridPosition()
  }
  return newFoodPosition
}

export function updateFood(GAME_SCORE, EXPANSION_RATE, FOOD_SCORE, GAME_LVL) {
  if (onSnake(food)) {
    GAME_SCORE = updateScore(GAME_SCORE, FOOD_SCORE)
    expandSnake(EXPANSION_RATE)
    food = getRandomFoodPosition()
    if (GAME_SCORE % lvlUp === 0) {
      ++GAME_LVL
      lvlUp *= 1.25
    }
    return [GAME_SCORE, GAME_LVL]
  }
  return [GAME_SCORE, GAME_LVL]
}

export function drawFood(gameBoard) {
  const foodElement = document.createElement('div')
  foodElement.style.gridRowStart = food.y
  foodElement.style.gridColumnStart = food.x
  foodElement.classList.add('food')
  gameBoard.appendChild(foodElement)
}
