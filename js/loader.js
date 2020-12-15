import { createBoard, addRegionIds, fillBoard } from './boardGenerationFunctions.js'

window.addEventListener('load', () => {
    const board = document.getElementById('board')

    createBoard(9, board)
    addRegionIds('region', 0)
    fillBoard(board)
})


