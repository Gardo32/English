'use client'

import React, { useRef, useEffect, useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { useGameLogic } from '@/lib/useGameLogic'
import { drawGame } from '@/lib/drawGame'

const CHARACTER_IMAGE = '/char.png'
const OBJECT_IMAGES = [
  '/20bhd.jpg',
  '/barrel.png',
  '/pearl.png',
]
const BACKGROUND_IMAGE = '/Designer (3).png'

export default function Game() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [gameStarted, setGameStarted] = useState(false)
  const [showNameDialog, setShowNameDialog] = useState(false)
  const [showGameOverDialog, setShowGameOverDialog] = useState(false)
  const [playerName, setPlayerName] = useState('')

  const [canvasSize, setCanvasSize] = useState({ width: window.innerWidth, height: window.innerHeight })

  const { gameState, startGame, moveLeft, moveRight, updateGame } = useGameLogic(canvasSize.width, canvasSize.height)

  const gameLoop = useCallback((time: number) => {
    if (!gameStarted) return
    updateGame(time)
    requestAnimationFrame(gameLoop)
  }, [gameStarted, updateGame])

  useEffect(() => {
    const resizeCanvas = () => {
      setCanvasSize({ width: window.innerWidth, height: window.innerHeight })
    }
    window.addEventListener('resize', resizeCanvas)
    return () => window.removeEventListener('resize', resizeCanvas)
  }, [])

  useEffect(() => {
    let frameId: number
    if (gameStarted) {
      frameId = requestAnimationFrame(gameLoop)
    }
    return () => cancelAnimationFrame(frameId)
  }, [gameStarted, gameLoop])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    const render = () => {
      drawGame(context, gameState, CHARACTER_IMAGE, OBJECT_IMAGES, BACKGROUND_IMAGE)
      requestAnimationFrame(render)
    }

    render()
  }, [gameState, canvasSize])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') moveLeft()
      if (e.key === 'ArrowRight') moveRight()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [moveLeft, moveRight])

  useEffect(() => {
    if (gameState.timeLeft <= 0 && gameStarted) {
      setGameStarted(false)
      setShowGameOverDialog(true)
    }
  }, [gameState.timeLeft, gameStarted])

  const handleStartGame = useCallback(() => {
    setShowNameDialog(true)
  }, [])

  const handleNameSubmit = useCallback(() => {
    if (playerName.trim()) {
      setShowNameDialog(false)
      startGame()
      setGameStarted(true)
    }
  }, [playerName, startGame])

  const handleRetry = useCallback(() => {
    setShowGameOverDialog(false)
    setShowNameDialog(true)
  }, [])

  return (
    <div className="fixed inset-0 bg-gray-900 flex items-center justify-center">
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        className="block"
      />
      
      <Dialog open={!gameStarted && !showNameDialog && !showGameOverDialog} onOpenChange={() => {}}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>2D Catcher Game</DialogTitle>
            <DialogDescription>
              Catch as many objects as you can in 20 seconds!
            </DialogDescription>
          </DialogHeader>
          <Button onClick={handleStartGame}>Start Game</Button>
        </DialogContent>
      </Dialog>

      <Dialog open={showNameDialog} onOpenChange={setShowNameDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter Your Name</DialogTitle>
            <DialogDescription>
              Please enter your name to start the game.
            </DialogDescription>
          </DialogHeader>
          <Input
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Your Name"
          />
          <DialogFooter>
            <Button onClick={handleNameSubmit}>Start Game</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showGameOverDialog} onOpenChange={setShowGameOverDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Game Over!</DialogTitle>
            <DialogDescription>
              {playerName}, your final score is: {gameState.score}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-between mt-4">
            <Button onClick={handleRetry}>Play Again</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}