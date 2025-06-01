let level = 1
function newLevel() {
    getLevel(1).then(l => {
        level = l
        document.querySelector(".gameInput").value = `Уровень ${level}`
        let generator = seededRandom(level);

        cards = ["bigMoon", "bigHeart", "bigEarth", "bigCircle", "bigSettings", "bigSmile", "bigMoon", "bigHeart", "bigEarth", "bigCircle", "bigSettings", "bigSmile"]

        document.querySelector(".all-game-items").innerHTML = '';

        shuffle(cards, generator).forEach(c => {
            document.querySelector(".all-game-items").innerHTML +=
                `
    <button cardName="${c}" class="card"><img src="img/${c}.png" alt=""></button>
    `
        });


        buttons = document.querySelectorAll(".card")
        pairs = 0

        buttons.forEach(b => {
            b.onclick = () => {
                selected = document.querySelector(".selected")
                if (selected && selected != b && b.getAttribute("cardName") == selected.getAttribute("cardName")) {
                    b.style = `opacity:0; pointer-events:none;`;
                    selected.style = `opacity:0; pointer-events:none;`;
                    pairs += 1
                }
                buttons.forEach(button => {
                    button.classList.remove("selected")
                });
                b.classList.add("selected")
                if (pairs >= 6) {
                    document.querySelector(".all-game-items").innerHTML = '<h1>Вы прошли уровень!!</h1>';
                }
            }
        });
    })
}

document.querySelector(".continueBtn").onclick = () => {
    if (pairs >= 6) {
        level = level + 1
        saveGame(1, level).then(json => {
            console.log(json);
            window.location.reload()
        })
    }
}

newLevel()