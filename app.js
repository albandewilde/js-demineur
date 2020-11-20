( () => {
    MINES_NUMBER = 10
    NUMBER_OF_LINES = 15
    NUMBER_OF_COLUMNS = 10
    const Tile = ((isMined, x, y) => {
        return {
            isMined: () => isMined, // determines if box is mined
            x: () => x, // position x of the box
            y: () => y, // position y of the box
            displayHint: (box, tiles) => {
                let nbMines = 0
                for (let y = -1; y < 2; y++) {
                    for (let x = -1; x < 2; x++) {
                        const searchedY = Math.min(Math.max(y, 0), NUMBER_OF_COLUMNS - 1)
                        const searchedX = Math.min(Math.max(x, 0), NUMBER_OF_LINES - 1)
                        if (tiles[searchedY * NUMBER_OF_COLUMNS + searchedX].isMined()) {
                            nbMines++
                        } 
                    }
                }
                box.textContent = nbMines.toString()
            }
        }
    })

    let app = document.getElementById('app')
    app.style.width = '100%'
    app.style.height = '100%'
    app.style.display = 'flex'
    app.style.justifyContent = 'center'
    
    let mines_place = []
    for (let idx = 0; idx < MINES_NUMBER; idx++) {
        mines_place.push([Math.floor(Math.random()*NUMBER_OF_COLUMNS), Math.floor(Math.random() * NUMBER_OF_LINES)])
    }

    let table = document.createElement('table')
    app.appendChild(table)

    let board = []
    let tiles = []
    for(let i = 0; i < NUMBER_OF_COLUMNS; i++) {
        let row = []
        const line = document.createElement('tr')
        table.appendChild(line)
        
        for(let j = 0; j < NUMBER_OF_LINES; j++) {
            // Build the tile
            let isMined = false
            for (m of mines_place) {
                if (m[0] === i && m[1] === j) {
                    isMined = true
                    break
                }
            }

            const t = Tile(isMined, false, j, i)
            row.push(t)
            tiles.push(t)
            // Build the html table
            const box = document.createElement('td')
            box.style.height = '30px'
            box.style.width = '30px'
            const b = document.createElement("button")
            b.style.height = '30px'
            b.style.width = '30px'
            b.style.userSelect = 'none'
            box.appendChild(b)
            line.appendChild(box)
        }
        board.push(row)
    }
    
    let t = document.getElementsByTagName("td")
    for (let idx = 0; idx < t.length; idx++) {
        t[idx].firstElementChild.addEventListener('click', () => {
            const b = board[Math.floor(idx/NUMBER_OF_LINES)][idx-Math.floor(idx/NUMBER_OF_COLUMNS)*NUMBER_OF_LINES]
            b.displayHint(t[idx], tiles)
        })
    }
})()