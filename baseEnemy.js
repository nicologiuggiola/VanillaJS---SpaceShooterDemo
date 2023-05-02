class BaseEnemy extends GameObject{
    constructor(x, y, w, h, hp, points, imgUrl){
        super(x, y, w, h, imgUrl);
        this.speed = 3;
        this.hp = hp;
        this.points = points;
    }

    move(){
        this.y = this.y + this.speed;
    }
}