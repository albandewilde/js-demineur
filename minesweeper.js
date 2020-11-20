const randomInt = (lowest, highest) => {
    return Math.floor(Math.random() * (highest - lowest))
}

const Tile = (isMined, x, y) => {
    return {
        "isMined": isMined,
        "location": [x, y],
        "discovered": false,
        "minesAround": 0,
    }
}

const Minesweeper = (width, height, nbMines) => {
    let isGameOver = false
    let isWon = false
    // Generate mines places
    minesPlace = []
    for (let idx = 0; idx < nbMines; idx++) {
        // Possible mines at the same place
        minesPlace.push([randomInt(0, width), randomInt(0, height)])
    }

    // Create field of mines
    let field = []
    for (let y = 0; y < height; y++) {
        let line = []
        for (let x = 0; x < width; x++) {
            let tile = Tile(false, x, y)
            for (mine of minesPlace) {
                // Check if the tile is mined
                if (mine[0] === x && mine[1] === y) {
                    tile.isMined = true
                }
                // Count mines around
                if (mine[0]-1 === x && mine[1]-1 === y) {    // The mine is on top left
                    tile.minesAround++
                }
                if (mine[0] === x && mine[1]-1 === y) {      // The mine is on top
                    tile.minesAround++
                }
                if (mine[0]+1 === x && mine[1]-1 === y) {    // The mine is on top right
                    tile.minesAround++
                }
                if (mine[0]-1 === x && mine[1] === y) {      // The mine is on left
                    tile.minesAround++
                }
                if (mine[0]+1 === x && mine[1] === y) {      // The mine is on right
                    tile.minesAround++
                }
                if (mine[0]-1 === x && mine[1]+1 === y) {    // The mine is on bottom left
                    tile.minesAround++
                }
                if (mine[0] === x && mine[1]+1 === y) {      // The mine is on bottom
                    tile.minesAround++
                }
                if (mine[0]+1 === x && mine[1]+1 === y) {    // The mine is on bottom right
                    tile.minesAround++
                }
            }
            line.push(tile)
        }
        field.push(line)
    }

    const discover = (x, y) => {
        tile = field[y][x]
        tile.discover = true
        
        if(tile.isMined) isGameOver = true
        else checkIfWon()

        return field[y][x]
    }

    const checkIfWon = () => {
        if (!field.flatMap(e => e).find(t => !t.discovered && !t.isMined)) {
            isGameOver = true
            isWon = true
        }
    }

    return {
        getTiles: () => field,
        getWidth: () => width,
        getHeight: () => height,
        getNbMines: () => nbMines,
        discover: (x, y) => discover(x, y),
        gameover: () => isGameOver,
        gameWon: () => isWon
    }
}