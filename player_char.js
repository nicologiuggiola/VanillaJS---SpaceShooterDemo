class playerChar extends GameObject {

    constructor(x, y, w, h, imgUrl){
        super(x, y, w, h, imgUrl);
        this.speed = 8;
        this.hp = 3;
        this.controller = {};
        this.projectiles = [];
        this.offset = 10;
        this.autoAttackCD = 10;
    }

    draw(){
        this.projectiles = this.projectiles.filter(p => p.y > 0);
        this.projectiles = this.projectiles.filter(p => p.hp > 0);
        this.projectiles.forEach(p => {
            p.draw();
            p.move();
        })
        super.draw();
    }


    controls() {
        this.autoAttackCD--;
        document.onkeydown = (keyEvent => {
            if (keyEvent.key === " " && !this.controller[keyEvent.key]) {
                this.autoAttackCD = 10;
                this.baseAttack();
            }
            this.controller[keyEvent.key] = true;
        })

        document.onkeyup = (keyEvent => {
            this.controller[keyEvent.key] = false;
        })

        for (const key in this.controller) {
            if (key.includes("Left") && this.controller[key]) {
                this.x = this.x > 0 ? this.x - this.speed : 0;
            }
            if (key.includes("Right") && this.controller[key]) {
                this.x = (this.x + this.w) < window.innerWidth ? this.x + this.speed : window.innerWidth - this.w;
            }
            if (key.includes("Up") && this.controller[key]) {
                this.y = this.y > 0 ? this.y - this.speed : 0;
            }
            if (key.includes("Down") && this.controller[key]) {
                this.y = (this.y + this.h) < window.innerHeight ? this.y + this.speed : window.innerHeight - this.h;
            }

            if (key === " " && this.controller[key] && this.autoAttackCD <= 0) {
                console.log("LOL");
                this.baseAttack();
                this.autoAttackCD = 10;
            }
        }
    }

    baseAttack(){
        this.offset = this.offset === 10 ? -5 : 10;
        this.projectiles.push(new Projectile(this.x + (this.w / 2) - this.offset, this.y, 2.5, 15));
    }
}