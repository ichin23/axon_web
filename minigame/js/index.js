import EnemyController from "./EnemyController.js"
import Player from "./Player.js"
import BulletController from "./BulletController.js"

const canvas = document.getElementById("game")
const ctx = canvas.getContext('2d')

canvas.width = 600;
canvas.height = 600;

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
        ctx.font = "70px Arial"
        ctx.fillText(text, canvas.width/textOffset, canvas.height/2)

        ctx.font = "20px Arial"
        ctx.fillText("Pressione (r) para recomeçar", canvas.width/3.4, canvas.height/2+50)
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

setInterval(game, 1000/60)

document.addEventListener('keydown', (event)=>{
    if(isGameOver && event.code==='KeyR'){
        isGameOver=false
        didWin=false

        playerBulletController.reset()
        enemyBulletController.reset()
        enemyController.reset()
    }
})