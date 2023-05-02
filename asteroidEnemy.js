class Asteroid extends BaseEnemy{
    
    constructor(x, y, w, h, hp, points, imgUrl){
        super(x, y, w, h, hp, points, imgUrl);
        this.direction = 0;
        this.speed = Math.random() * 5;
    }

    move(){
        this.x = this.x + this.direction;
        super.move();
    }
}