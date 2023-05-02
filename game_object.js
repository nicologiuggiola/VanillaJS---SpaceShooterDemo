class GameObject {

    constructor(x, y, w, h, imgUrl){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.imgUrl = imgUrl;
    }

    draw(){
        // c.fillStyle = "red";
        // c.fillRect(this.x, this.y, this.w, this.h);
        c.drawImage(this.imgUrl, this.x, this.y, this.w, this.h);
    }
}