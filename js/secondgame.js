let level = 1
function newLevel() {
    getLevel(2).then(l => {
        level = l
        document.querySelector(".gameInput").value = `Уровень ${level}`
        let generator = seededRandom(level);

        numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]


        document.querySelector(".all-game-items").innerHTML = '';

        shuffle(numbers, generator).forEach(e => {
            document.querySelector(".all-game-items").innerHTML +=
                `
    <button class="number-button gameBtn" number="${e}" id="button${e}">${e}</button>
    `
        });

        pressed = [0]

        buttons = document.querySelectorAll(".number-button")

        buttons.forEach(b => {
            b.onclick = () => {
                if (b.getAttribute("number") == pressed[pressed.length - 1] + 1) {
                    b.style = `opacity:0;`;
                    pressed.push(parseInt(b.getAttribute("number")))
                }
                if (pressed[pressed.length - 1] == 10) {
                    document.querySelector(".all-game-items").innerHTML = '<h1>Вы прошли уровень!!</h1>';
                }
            }
        });
    })
}

document.querySelector(".continueBtn").onclick = () => {
    if (pressed[pressed.length - 1] == 10) {
        level = level + 1
        saveGame(2, level).then(json => {
            console.log(json);
            window.location.reload()
        })
    }
}

newLevel()