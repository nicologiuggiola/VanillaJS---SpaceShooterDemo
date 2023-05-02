class Projectile extends GameObject{

    constructor(x, y, w, h){
        super(x, y, w, h);
        this.speed = 15;
        this.hp = 1;
    }

    draw(){
        c.fillStyle = "#0077ff";
        c.fillRect(this.x, this.y, this.w, this.h);
    }

    move(){
        this.y = this.y - this.speed;
    }
}