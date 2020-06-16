export function updateScore(GAME_SCORE, FOOD_SCORE) {
  GAME_SCORE += FOOD_SCORE
  return GAME_SCORE
}

export function drawScore(scoreTable, GAME_SCORE, GAME_LVL) {
  scoreTable.classList.add('score')
  scoreTable.innerHTML = `Score: ${GAME_SCORE} \n Level: ${GAME_LVL}`
}
