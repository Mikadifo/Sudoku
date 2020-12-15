import { createBoard } from './boardGenerationFunctions.js'

window.addEventListener('load', () => {
    const board = document.getElementById('board')
    createBoard(9, board)
})


