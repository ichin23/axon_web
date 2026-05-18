import EnemyController from "./EnemyController.js"
import Player from "./Player.js"
import BulletController from "./BulletController.js"

const canvas = document.getElementById("game")
const ctx = canvas.getContext('2d')

const htmlElement = document.documentElement;
const bodyElement = document.body;

const width = Math.max(
  htmlElement.clientWidth,
  htmlElement.scrollWidth,
  htmlElement.offsetWidth,
  bodyElement.scrollWidth,
  bodyElement.offsetWidth
);

const height = Math.max(
  htmlElement.clientHeight,
  htmlElement.scrollHeight,
  htmlElement.offsetHeight,
  bodyElement.scrollHeight,
  bodyElement.offsetHeight
);

if(width < 568){
    canvas.width = width - 20
    canvas.height = height - 150
}else if(width<600){
    canvas.width = width
    canvas.height = height   
}else{
    canvas.width = 600;
    canvas.height = 600;
}

const background = new Image()
background.src = "/img/space.webp"

const playerBulletController = new BulletController(canvas, 10, "blue", true)
const enemyBulletController = new BulletController(canvas, 4, "red", false)
const enemyController = new EnemyController(canvas, enemyBulletController, playerBulletController)
const player = new Player(canvas, 3, playerBulletController)

let isGameOver = false;
let didWin = false

function game(){
    checkGameOver();
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
    displayGameOver()
    if(!isGameOver){
        enemyBulletController.draw(ctx)
        player.draw(ctx)
        enemyController.draw(ctx)
        playerBulletController.draw(ctx)
    }
}

function displayGameOver(){
    if(isGameOver){
        let text = didWin ? "Você venceu!" : "Game over";
        let textOffset = 5;

        ctx.fillStyle = "white";
        if(canvas.width<600){
            ctx.font = "40px Arial"
            ctx.fillText(text, canvas.width/textOffset, canvas.height/2)
            ctx.font = "15px Arial"
            ctx.fillText("Pressione o botão para recomeçar", canvas.width/5.1, canvas.height/2+50)
        }else{
            ctx.font = "70px Arial"
            ctx.fillText(text, canvas.width/textOffset, canvas.height/2)
            ctx.font = "20px Arial"
            ctx.fillText("Pressione (r) para recomeçar", canvas.width/4.5, canvas.height/2+50)
        }

    }
}

function checkGameOver(){
    if(isGameOver) return;

    if(enemyBulletController.collideWith(player)){
        isGameOver = true
    }

    if(enemyController.collideWith(player)){
        isGameOver = true
    }

    if(enemyController.enemyRows.length === 0){
        didWin=true;
        isGameOver=true
    }
}

function resetGame(){
    isGameOver=false
    didWin=false

    playerBulletController.reset()
    enemyBulletController.reset()
    enemyController.reset()
    player.reset()
}

setInterval(game, 1000/60)

document.getElementById("btnShoot").addEventListener('touchstart', ()=>{
    if(isGameOver){
        resetGame()
    }
})

document.addEventListener('keydown', (event)=>{
    if(isGameOver && event.code==='KeyR'){
        resetGame()
    }
})

