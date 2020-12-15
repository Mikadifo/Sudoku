export const createTiles = (tiles, region) => {
    if (tiles < 1) return

    let tile = document.createElement('div')
    tile.className = 'tile'
    region.appendChild(tile)

    createTiles(tiles - 1, region)
}

export const createBoard = (regions, board) => {
    if (regions < 1) return

    let region = document.createElement('div')
    region.className = 'region'
    board.appendChild(region)

    createTiles(9, region)
    createBoard(regions - 1, board)
}
