class Miniboss extends BaseEnemy{

    constructor(x, y, w, h, hp, points, imgUrl){
        super(x, y, w, h, hp, points, imgUrl);
        this.speed = 2;
        this.projectiles = [];
        this.attackCD = 30;
    }

    draw(){
        this.attackCD--;
        // c.fillStyle = "#0077ff";
        // c.fillRect(this.x, this.y, this.w, this.h);
        super.draw();

        this.projectiles = this.projectiles.filter(p => p.hp > 0);
        if (this.hp <= 0) {
            this.projectiles = [];
        }
        this.projectiles.forEach(p => {
            p.draw();
            p.move();
        })

        if (this.attackCD <= 0) {
            this.baseAttack();
            this.attackCD = 60;
        }
    }

    move(){
        this.x = this.x + this.speed;
    }

    baseAttack(){
        let offsetX =( Math.random() * this.w) + this.x;
        let projectile = new Projectile(this.x, this.y + this.h, 2.5, 15);
        let projectile1 = new Projectile(this.x +this.w, this.y + this.h, 2.5, 15);
        projectile.speed = -15;
        projectile1.speed = -15;
        this.projectiles.push(projectile);
        this.projectiles.push(projectile1);
    }
}