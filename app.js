(() => {
    MINES_NUMBER = 15
    NUMBER_OF_LINES = 15
    NUMBER_OF_COLUMNS = 10
    let minesweeper = Minesweeper(NUMBER_OF_COLUMNS, NUMBER_OF_LINES, MINES_NUMBER)

    let app = document.getElementById('app')
    app.style.width = '100%'
    app.style.height = '100%'
    app.style.display = 'flex'
    app.style.justifyContent = 'center'
    
    let table = document.createElement('table')
    app.appendChild(table)
    
    for(let lineIdx = 0; lineIdx < minesweeper.getHeight(); lineIdx++) {
        const line = document.createElement('tr')
        table.appendChild(line)
        
        for(let columnIdx = 0; columnIdx < minesweeper.getWidth(); columnIdx++) {
            const box = document.createElement('td')
            box.style.height = '30px'
            box.style.width = '30px'
            box.style.textAlign = 'center'
            box.style.userSelect = 'none'

            const b = document.createElement("button")
            b.style.height = '30px'
            b.style.width = '30px'
            b.style.userSelect = 'none'

            b.addEventListener('click', () => {
                const tile = minesweeper.discover(columnIdx, lineIdx)
                if(!minesweeper.gameover()) {
                    let source = ''

                    switch(tile.minesAround) {
                        case 8:
                            source = 'images/åtta.png'
                            break
                        case 7:
                            source = 'images/sju.png'
                            break
                        case 6:
                            source = 'images/sex.png'
                            break
                        case 5:
                            source = 'images/fem.png'
                            break
                        case 4:
                            source = 'images/fyra.png'
                            break
                        case 3:
                            source = 'images/tre.png'
                            break
                        case 2:
                            source = 'images/två.png'
                            break
                        case 1:
                            source = 'images/ett.png'
                            break
                        default:
                            source = 'images/noll.png'
                            break
                    }

                    box.innerHTML = `<img src=${source} />`;
                } else {
                    while(app.firstChild) {
                        app.removeChild(app.firstChild)
                    }

                    if(minesweeper.gameWon()) {
                        const wonText = document.createElement('h1')
                        wonText.textContent = 'You won !'
                        wonText.style.fontSize = '40px'

                        const happy = document.createElement('img')
                        happy.src = 'images/happy.png'
                        
                        app.appendChild(wonText)
                        app.appendChild(happy)
                    } else {                        
                        const gameOverText = document.createElement('h1')
                        gameOverText.textContent = 'Game Over !'
                        gameOverText.style.fontSize = '40px'

                        const dead = document.createElement('img')
                        dead.src = 'images/dead.png'
                        
                        app.appendChild(gameOverText)
                        app.appendChild(dead)
                    }
                }
            })
            
            box.appendChild(b)
            line.appendChild(box)
        }
    }
})()