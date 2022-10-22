const game = new RockPaperScissors(3)

//Seleciona os botões
const btnRock = document.getElementById('rock')
const btnPaper = document.getElementById('paper')
const btnScissors = document.getElementById('scissors')
const btnStart = document.getElementById('start')
const btnReset = document.getElementById('reset')
const btnAudio = document.getElementById('audio')

//Seleciona áreas da pontuação e da escolha
const displayPlayerScore = document.querySelector('.player-score span')
const displayCpuScore = document.querySelector('.cpu-score span')
const displayPlayerChoice = document.querySelector('.player-choice')
const displayCpuChoice = document.querySelector('.cpu-choice')

//Seleciona menssagens de feddback
const userWon = document.querySelector('.user-won')
const cpuWon = document.querySelector('.cpu-won')
const tieGame = document.querySelector('.tie-game')
const endMessage = document.querySelector('.end-message')

//Seleciona os audios
const bgAudio = document.getElementById('game-bg-audio')
const winAudio = document.getElementById('win-audio')
const loseAudio = document.getElementById('lose-audio')
const tieAudio = document.getElementById('tie-audio')
let audioActive = true

//Habilita os botões de escolha
function startGame() {
    btnRock.removeAttribute('disabled')
    btnPaper.removeAttribute('disabled')
    btnScissors.removeAttribute('disabled')
    if(audioActive) {
        bgAudio.play() 
    }
}

//Desabilita os botões de escolha
function disableButtons() {
    btnRock.setAttribute('disabled', true)
    btnPaper.setAttribute('disabled', true)
    btnScissors.setAttribute('disabled', true)
}

function displayChoiceImage(element, choice) {
    element.innerHTML = ''
    const image = document.createElement('img')
    image.setAttribute('alt', `${choice} icon`)
    image.setAttribute('src', `./assets/img/${choice}.svg`)
    element.appendChild(image)
}

function checkWinner() {
    if(game.roundWinner === 'player') {
        winAudio.currentTime = 0
        winAudio.play()
        displayPlayerChoice.classList.add('animate-blink')
    } else if (game.roundWinner === 'cpu') {
        loseAudio.currentTime = 0
        loseAudio.play()
        displayCpuChoice.classList.add('animate-blink')
    } else {
        tieAudio.currentTime = 0
        tieAudio.play()
        displayPlayerChoice.classList.add('animate-blink')
        displayCpuChoice.classList.add('animate-blink')
    }

    if(game.checkGameOver()) {
        disableButtons()
        endMessage.style.display = 'block'

        if(game.gameWinner === 'player') {
            userWon.style.display = 'block'
        } else if (game.gameWinner === 'cpu') {
            cpuWon.style.display = 'block'
        } else {
            tieGame.style.display = 'block'
        }

        }
    }


//Função que inicia um novo round
function playGame(event) {
    removeBlink()
    const button = event.currentTarget
    const choice = button.getAttribute('id')
    const round = game.play(choice)

    displayChoiceImage(displayPlayerChoice, choice)
    displayChoiceImage(displayCpuChoice, round.cpuChoice)

    displayPlayerScore.innerHTML = round.playerPoints
    displayCpuScore.innerHTML = round.cpuPoints

    checkWinner()
}

function removeBlink() {
    displayPlayerChoice.classList.remove('animate-blink')
    displayCpuChoice.classList.remove('animate-blink')
}

function resetGame() {
    game.reset()
    endMessage.style.display = 'none'
    userWon.style.display = 'none'
    cpuWon.style.display = 'none'
    tieGame.style.display = 'none'
    displayPlayerScore.innerHTML = game.playerPoints
    displayCpuScore.innerHTML = game.cpuPoints
    removeBlink()
}

//Configura volume dos audios
bgAudio.volume = .15
winAudio.volume = .3
loseAudio.volume = .3
tieAudio.volume = .3

function changeAudio() {
    if(audioActive) {
        bgAudio.pause()
        audioActive = false
        btnAudio.innerHTML = 'Music OFF'
    } else {
        bgAudio.play()
        audioActive = true
        btnAudio.innerHTML = 'Music ON'
    }
}

btnAudio.onclick = changeAudio
btnStart.onclick = startGame
btnReset.onclick = resetGame

//Seleciona os botões de escolha
const choiceBtns = document.getElementsByClassName('choice-button')
for(let button of choiceBtns) {
    button.onclick = playGame
}


