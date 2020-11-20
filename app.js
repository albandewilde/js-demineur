(() => {
    MINES_NUMBER = 15
    NUMBER_OF_LINES = 15
    NUMBER_OF_COLUMNS = 10

    const startGame = () => {
        let minesweeper = Minesweeper(NUMBER_OF_COLUMNS, NUMBER_OF_LINES, MINES_NUMBER)

        let app = document.getElementById('app')

        let icon = document.createElement("img")
        icon.src = "images/happy.png"
        icon.addEventListener("click", () => restartGame())
        icon.addEventListener("mousedown", () => icon.src = "images/happy_pushed.png")
        icon.addEventListener("mouseup", () => icon.src = "images/happy.png")
        app.appendChild(icon)

        let br = document.createElement("br")
        app.appendChild(br)
        app.appendChild(br)
        app.appendChild(br)

        let table = document.createElement('table')
        app.appendChild(table)

        for(let lineIdx = 0; lineIdx < minesweeper.getHeight(); lineIdx++) {
            const line = document.createElement('tr')
            table.appendChild(line)

            for(let columnIdx = 0; columnIdx < minesweeper.getWidth(); columnIdx++) {
                const box = document.createElement('td')

                const img = document.createElement("img")
                img.src = "images/tile.png"
                img.addEventListener("mousedown", () => icon.src = "images/suspense.png")
                img.addEventListener("mouseup", () => icon.src = "images/happy.png")
                img.addEventListener('click', () => {
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

                        box.innerHTML = `<img src=${source}>`;
                    } else {
                        if (minesweeper.gameWon()) {
                            icon.src = "images/win.png"
                        } else {
                            icon.src = "images/dead.png"
                        }
                    }
                })

                box.appendChild(img)
                line.appendChild(box)
            }
        }
    }

    const restartGame = () => {
        app = document.getElementById("app")
        app.innerHTML = ""
        startGame()
    }

    startGame()
})()
