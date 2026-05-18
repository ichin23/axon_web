export default class Player {

    rightPressed = false
    leftPressed  = false
    shootPressed = false

    constructor (canvas, velocity, bulletController){
        this.canvas = canvas;
        this.velocity = velocity;
        this.bulletController = bulletController
        this.x =this.canvas.width/2;
        this.y = this.canvas.height - 75;
        this.width = 50;
        this.height = 48;
        this.image = new Image()
        this.image.src = "/img/ship.png"

        document.addEventListener("keydown", this.keydown)
        document.addEventListener("keyup", this.keyup)

        document.getElementById("ui-controls").addEventListener('touchstart', (e)=>{
            if (e.target.tagName !== 'INPUT') {
                e.preventDefault();
                if (e.target === button) {
                    this.bulletController.shoot(this.x+this.width/2, this.y, this.canvas.width<576 ? 3 : 4, 10)
                }
            }
        }, {passive: false})

        document.getElementById("inputMoveController").addEventListener('input', (ev)=>{
            //console.log(`Left: ${this.leftPressed} | Right: ${this.rightPressed} | ${ev.target.value===-1}`)
            if(ev.target.value==-1){
                this.leftPressed=true
            }
            if(ev.target.value==1){
                this.rightPressed=true
            }
            if(ev.target.value==0){
                this.rightPressed=false
                this.leftPressed=false
            }
        })

        document.getElementById("inputMoveController").addEventListener('touchmove', (e)=>{ e.stopPropagation() }, {passive: true})
        document.getElementById("inputMoveController").addEventListener('touchend', (ev)=>{
            ev.target.value = 0
            this.rightPressed=false
            this.leftPressed=false
        })

        document.getElementById("btnShoot").addEventListener('touchstart', ()=>{
            this.shootPressed=true
        })

        document.getElementById("btnShoot").addEventListener('touchend', ()=>{
            this.shootPressed=false
        })
    }

    draw(ctx){
        if(this.shootPressed){
            this.bulletController.shoot(this.x+this.width/2, this.y, this.canvas.width<576 ? 3 : 4, 10)
        }
        this.move()
        this.collideWithWalls()
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    }

    collideWithWalls(){
        if(this.x < 0){
            this.x = 0;
        }

        if(this.x > this.canvas.width - this.width){
            this.x = this.canvas.width - this.width
        }
    }

    move(){
        if(this.rightPressed){
            this.x += this.velocity
        }else if(this.leftPressed){
            this.x+= -this.velocity 
        }
    }

    reset(){
        this.x =this.canvas.width/2 - this.width/2;
        this.y = this.canvas.height - 75;
    }

    keydown = event =>{
        //console.log(event.code)
        if(event.code == 'ArrowRight'){
            this.rightPressed=true
        }
        if(event.code == 'ArrowLeft'){
            this.leftPressed = true
        }

        if(event.code == 'Space'){
            this.shootPressed = true
        }
    }

    keyup = event =>{
        if(event.code == 'ArrowRight'){
            this.rightPressed=false
        }
        if(event.code == 'ArrowLeft'){
            this.leftPressed = false
        }
        if(event.code == 'Space'){
            this.shootPressed = false
        }
    }
}