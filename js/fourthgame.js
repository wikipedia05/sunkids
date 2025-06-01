let level = 1
function newLevel() {
    let correct = false
    getLevel(4).then(l => {
        level = l
        document.querySelector(".gameInput").value = `Уровень ${level}`
        let generator = seededRandom(level);


        document.querySelector(".all-game-items").innerHTML = '';

        count = parseInt(generator() * 9) + 1

        for (let i = 0; i < count; i++) {
            document.querySelector(".all-game-items").innerHTML +=
                `
        <img src="img/bigApple.png" alt="">
        `
        }

        document.querySelector(".game-numbers-block").innerHTML = ``
        answers = [count, parseInt(generator() * 9) + 1, parseInt(generator() * 9) + 1]
        answers = shuffle(answers, generator)
        answers.forEach(a => {
            document.querySelector(".game-numbers-block").innerHTML += `<button ${a == count ? 'class="correct"' : ""}><img src="img/number${a}.png" alt=""></button>`
        });


        document.querySelector(".correct").onclick = () => {
            document.querySelector(".all-game-items").innerHTML = '<h1>Вы прошли уровень!!</h1>';
            correct = true
        }
        
    })
    document.querySelector(".continueBtn").onclick = () => {
        if (correct) {
            level = level + 1
            saveGame(4, level).then(json=>{
                console.log(json);
                window.location.reload()
            })
            
        }
    }
}


newLevel()


