'use client'

import { useState, useCallback, useRef } from 'react'

interface GameObject {
  x: number
  y: number
  width: number
  height: number
  imageIndex: number
}

interface GameState {
  character: GameObject
  objects: GameObject[]
  score: number
  timeLeft: number
}

export function useGameLogic(gameWidth: number, gameHeight: number) {
  const gameStateRef = useRef<GameState>({
    character: { x: gameWidth / 2 - 75, y: gameHeight - 150, width: 150, height: 150, imageIndex: 0 },
    objects: [],
    score: 0,
    timeLeft: 20,
  })

  const [gameState, setGameState] = useState<GameState>(gameStateRef.current)
  const lastUpdateTimeRef = useRef<number | null>(null)

  const startGame = useCallback(() => {
    gameStateRef.current = {
      character: { x: gameWidth / 2 - 75, y: gameHeight - 150, width: 150, height: 150, imageIndex: 0 },
      objects: [],
      score: 0,
      timeLeft: 20,
    }
    lastUpdateTimeRef.current = null
    setGameState(gameStateRef.current)
  }, [gameWidth, gameHeight])

  const moveLeft = useCallback(() => {
    gameStateRef.current.character.x = Math.max(0, gameStateRef.current.character.x - 30)
    setGameState({ ...gameStateRef.current })
  }, [])

  const moveRight = useCallback(() => {
    gameStateRef.current.character.x = Math.min(
      gameWidth - gameStateRef.current.character.width,
      gameStateRef.current.character.x + 30
    )
    setGameState({ ...gameStateRef.current })
  }, [gameWidth])

  const updateGame = useCallback(
    (currentTime: number) => {
      if (lastUpdateTimeRef.current === null) {
        lastUpdateTimeRef.current = currentTime
        return
      }

      const deltaTime = (currentTime - lastUpdateTimeRef.current) / 1000
      lastUpdateTimeRef.current = currentTime

      if (gameStateRef.current.timeLeft <= 0) return

      // Update falling objects
      gameStateRef.current.objects = gameStateRef.current.objects
        .map((obj) => ({ ...obj, y: obj.y + 300 * deltaTime }))
        .filter((obj) => obj.y < gameHeight)

      // Add new objects
      if (Math.random() < 0.05) {
        gameStateRef.current.objects.push({
          x: Math.random() * (gameWidth - 50),
          y: 0,
          width: 50,
          height: 50,
          imageIndex: Math.floor(Math.random() * 3),
        })
      }

      // Detect collisions
      const collidedObjects = gameStateRef.current.objects.filter(
        (obj) =>
          obj.x < gameStateRef.current.character.x + gameStateRef.current.character.width &&
          obj.x + obj.width > gameStateRef.current.character.x &&
          obj.y < gameStateRef.current.character.y + gameStateRef.current.character.height &&
          obj.y + obj.height > gameStateRef.current.character.y
      )

      gameStateRef.current.objects = gameStateRef.current.objects.filter(
        (obj) => !collidedObjects.includes(obj)
      )

      // Update score and timer
      gameStateRef.current.score += collidedObjects.length
      gameStateRef.current.timeLeft = Math.max(0, gameStateRef.current.timeLeft - deltaTime)

      setGameState({ ...gameStateRef.current })
    },
    [gameHeight, gameWidth]
  )

  return { gameState, startGame, moveLeft, moveRight, updateGame }
}
