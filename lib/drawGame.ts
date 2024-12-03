import { GameState } from './useGameLogic'

export function drawGame(
  ctx: CanvasRenderingContext2D,
  gameState: GameState,
  characterImage: string,
  objectImages: string[],
  backgroundImage: string
) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

  // Draw background
  const bgImg = new Image()
  bgImg.src = backgroundImage
  ctx.drawImage(bgImg, 0, 0, ctx.canvas.width, ctx.canvas.height)

  // Draw character
  const characterImg = new Image()
  characterImg.src = characterImage
  ctx.drawImage(
    characterImg,
    gameState.character.x,
    gameState.character.y,
    gameState.character.width,
    gameState.character.height
  )

  // Draw objects
  gameState.objects.forEach((obj) => {
    const objectImg = new Image()
    objectImg.src = objectImages[obj.imageIndex]
    ctx.drawImage(objectImg, obj.x, obj.y, obj.width, obj.height)
  })

  // Draw score
  ctx.font = '24px Arial'
  ctx.fillStyle = 'white'
  ctx.fillText(`Score: ${gameState.score}`, 10, 90)

  // Draw timer
  ctx.fillText(`Time: ${Math.ceil(gameState.timeLeft)}s`, 10, 120)
}