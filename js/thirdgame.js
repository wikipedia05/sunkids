let level = 1
function newLevel() {
    getLevel(3).then(l => {
        level = l
        document.querySelector(".gameInput").value = `Уровень ${level}`
        let generator = seededRandom(level);

        animals = ['chick', 'dog', 'cat', 'fox']
        houses = ['egg', 'doghouse', 'cathome', 'street']


        document.querySelector(".game-grid-block").innerHTML = '';

        shuffledAnimals = shuffle(animals, generator)
        shuffledHouses = []
        shuffledAnimals.forEach(an => {
            shuffledHouses.push(houses[animals.indexOf(an)])
        });
        shuffledHouses = shuffle(shuffledHouses, generator)



        for (let index = 0; index < 4; index++) {
            document.querySelector(".game-grid-block").innerHTML += `
        <button animal="${shuffledAnimals[index]}" class="card"><img src="img/${shuffledAnimals[index]}.png" alt=""></button>
        <button animal="${animals[houses.indexOf(shuffledHouses[index])]}" class="card"><img src="img/${shuffledHouses[index]}.png" alt=""></button>
        `
        }



        buttons = document.querySelectorAll(".card")
        pairs = 0

        buttons.forEach(b => {
            b.onclick = () => {
                selected = document.querySelector(".selected")
                if (selected && selected != b && b.getAttribute("animal") == selected.getAttribute("animal")) {
                    b.style = `opacity:0; pointer-events:none;`;
                    selected.style = `opacity:0; pointer-events:none;`;
                    pairs += 1
                }
                buttons.forEach(button => {
                    button.classList.remove("selected")
                });
                b.classList.add("selected")
                if (pairs >= 4) {
                    document.querySelector(".game-grid-block").innerHTML = '<h1>Вы прошли уровень!!</h1>';
                }
            }
        });
    })
}

document.querySelector(".continueBtn").onclick = () => {
    if (pairs >= 4) {
        
        level = level + 1
        saveGame(3, level).then(json => {
            console.log(json);
            window.location.reload()
        })
    }
}

newLevel()