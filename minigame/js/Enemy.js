
export default class Enemy {

    constructor(canvas, x, y, imageNumber) {
        this.x = x;
        this.y = y;
        this.width = Math.min(48, canvas.width/15);
        this.height = Math.min(48, (canvas.width/15)*0.9);

        this.image = new Image()
        this.image.src = `/img/alien${imageNumber}.png`
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    }

    move(xVelocity, yVelocity){
        this.x+=xVelocity
        this.y+=yVelocity
    }

    collideWith(sprite){
        if(
            this.x + this.width > sprite.x &&
            this.x < sprite.x + sprite.width && 
            this.y + this.height > sprite.y &&
            this.y < sprite.y + sprite.height
        ){
            return true
        }
        return false;
    }
}