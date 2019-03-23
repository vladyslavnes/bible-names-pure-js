/*
    var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false)

    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
        this.receivedEvent('deviceready')
    },

    // Update DOM on a Received Event
    receivedEvent: function (event) {
        if (event === 'deviceready') {
        main()
        }
    }
    }

    app.initialize()
*/

// dummy vars
const names = 'Аарон, Авель, Авигея, Елисавета, Авирон, Ахимелех, Адам, Ахав, Асаф, Вениамин, Вооз, Каин, Дафан, Давид, Дина, Вартимей, Ева, Илия, Гедеон, Голиаф, Есфирь, Авакум, Исав, Елисей, Анна, Иезекииль, Агарь, Хам, Иезекия, Осия, Исаак, Исаия, Иаков, Иафет, Иессей, Иов, Иоав, Иеремия, Иохаведа, Иона, Иосиф, Иисус Навин, Иотам, Корей, Лот, Манассия, Миха, Мириам, Мордехай, Нееман, Наеминь, Ной, Рахиль, Раав, Ревекка, Руфь, Соломон, Самсон, Самуил, Симеон, Левий, Мафусал, Иуда, Даниил, Иисус Христос, Мария, Иуда Искариотский, Пётр, Симон Киренеянин, Филипп, Варфоломей, Фома, Симон Зилот, Иаков Алфеев, Иаков Зеведеев, Иоанн, Захария, Симеон, Иоанн Креститель, Ирод, Тит, Тимофей, Никодим, Сила, Марфа, Лазарь, Керенгаппух, Емима, Мария, Вениамин, Енох, Гиезий, Иосиф из Ариматеи, Марк, Мария, Тавифа'.split(', ')

class Router {
  constructor () {
    this.screens = ['new-game', 'add-players', 'name-card', 'leaderboard', 'about-project']
    this.currentScreen = 'new-game'
  }

  setScreen (newScreen) {
    document.querySelector(`#${this.currentScreen}`).style.display = 'none'
    document.querySelector(`#${newScreen}`).style.display = 'flex'
    this.currentScreen = newScreen
  }
}

class Store {
  constructor (data) {
    this.names = data
  }

  getRandomName () {
    return this.names[Math.floor(Math.random() * this.names.length)]
  }

  removeName (nameToRemove) {
    this.names.splice(this.names.indexOf(nameToRemove), 1)
  }

  isEmpty () {
    return this.names.length === 0
  }
}

class Players {
  constructor (players) {
    this.players = players.map(name => ({name, score: 0}))
    this.index = 0
  }

  scorePlayer (score) {
    this.players[this.index++].score += score
    if (this.index === this.players.length) {
      this.index = 0
    }
  }

  getCurrentPlayer () {
    return this.players[this.index]
  }
}

function showLeaderboard (players) {
  window.router.setScreen('leaderboard')

  let leadersTable = ''
  for (const player of players.players) {
    leadersTable += `
    <tr>
      <td>${player.score}</td>
      <td>${player.name}</td>
    </tr>`
  }

  document.getElementById('leaders-table').innerHTML = leadersTable
}

function generateCard (names, players) {
  if (names.isEmpty()) {
    showLeaderboard(players)
  }

  const player = players.getCurrentPlayer().name
  const name = names.getRandomName()

  document.getElementById('player').innerText = `${player}, расскажи про`
  document.getElementById('name').innerText = name

  document.getElementById('score-player').onclick = () => {
    players.scorePlayer(1)
    names.removeName(name)
    generateCard(names, players)
  }

  document.getElementById('fail-player').onclick = () => {
    players.scorePlayer(0)
    generateCard(names, players)
  }
}

document.getElementById('replay').addEventListener('click', () => {
  window.router.setScreen('new-game')
  main()
})

function main () {
  window.router = new Router()
  const store = new Store(names)
  window.router.setScreen('new-game')

  let players = null

  document.getElementById('start-new').addEventListener('click', () => {
    window.router.setScreen('add-players')
  })

  document.getElementById('inp-players').addEventListener('keyup', event => {
    document.getElementById('players-names-str').innerText = event.target.value
  })

  document.getElementById('begin-cards').onclick = () => {
    const value = document.getElementById('inp-players').value
    players = new Players(value.split(',').map(s => s.trim()))
    window.router.setScreen('name-card')
    generateCard(store, players)
  }
}

main()
