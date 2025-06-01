function seededRandom(seed) {
  let value = seed;
  return function () {
    value = (value * 1103515245 + 12345) % 2 ** 31;
    return value / 2 ** 31;
  };
}


function shuffle(arr, gen) {
  let newArr = [...arr];
  for (let i = newArr.length - 1; i > 0; i--) {
    let j = Math.floor(gen() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}



let user = localStorage.getItem("code")

const server = "https://efe1c681-7996-4362-9ac7-10a0c75487be-00-3tl5cwt07j0nu.spock.replit.dev"

if (!!user) {
  fetch(`${server}/getName`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      "code": user
    })
  }).then(r => r.json()).then(data => {
    try {
      document.querySelector(".loginInput").value = data.name
      document.querySelector(".login-title").innerHTML = `Привет, друг! Выбери игру и начни своё приключение!`
    } catch (error) {
      
    }

  })
}

try {
  document.querySelector(".loginBtn").onclick = () => {
    localStorage.setItem("code", document.querySelector(".loginInput").value)
    window.location.reload()
  }
} catch (error) {
  
}

async function getLevel(game) {

  if (!!user) {
    const response = await fetch(`${server}/getLevel`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        "code": user,
        "game": game
      })
    })
    const json = await response.json()
    return json.level

  }else{
    return 1
  }
}

async function saveGame(game, level) {
  if (!!user) {
    const response = await fetch(`${server}/setLevel`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        "code": user,
        "game": game,
        "level":level
      })
    })
    const json = await response.json()
    return json.level

  }else{
    return 1
  }
}