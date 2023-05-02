let canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");
let animate;
const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight;
canvas.width = canvasWidth;
canvas.height = canvasHeight;

let isMenu = true;

let background = new Image();
background.src = "space.png";
let background_y = 0;

let spawnCD = 120;
let asteroidCD = 360;
let minibossCD = 1800;

let player_img = new Image();
player_img.src = "player1_loop.png";

let enemy_img = new Image();
enemy_img.src = "enemy1.png";

let asteroid_img = new Image();
asteroid_img.src = "Asteroid_1.png";

let miniboss_img = new Image();
miniboss_img.src = "miniboss1.png";


let player = new playerChar((canvasWidth / 2) - 32, (canvasHeight / 2) - 32, 64, 64, player_img);
let enemies = [];
let asteroids = [];
let player_projectiles = player.projectiles;
let enemy_projectiles = [];

let playerPoints = 0;
let playerHp = player.hp;

let playerUI = document.getElementById("playerui");
let pointUI = document.getElementById("points");
let HPUI = document.getElementById("hp");
let gameoverUI = document.getElementById("gameover");
let retryUI = document.getElementById("riprova");
let mainUI = document.getElementById("mainmenu");
let mainmenuPosition = -100;
mainUI.style.top = mainmenuPosition + "%";
let playUI = document.getElementById("play");

retryUI.addEventListener("click", event => {
    console.log(event);
    player.hp = 3;
    enemies = [];
    enemy_projectiles = [];
    player.x = (canvasWidth / 2) - 32;
    player.y = (canvasHeight / 2) - 32;
    playerHp = player.hp;
    player.projectiles = [];
    playerPoints = 0;
    gameoverUI.style.display = "none";
    spawnCD = 120;
    asteroidCD = 360;
    minibossCD = 1800;
})

playUI.addEventListener("click", event => {
    isMenu = false;
})


function animation() {
    c.clearRect(0, 0, canvasWidth, canvasHeight);
    animate = requestAnimationFrame(animation);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    if (mainmenuPosition !== 0) {
        mainmenuPosition += 0.5;
        mainUI.style.top = mainmenuPosition + "%";
    }
    loopBackground();
    if (!isMenu) {
        if (playerHp > 0) {
            mainUI.style.display = "none";
            playerUI.style.display = "flex";
            console.log(spawnCD)
            enemySpawn();
            asteroidSpawn();
            minibossSpawn();
            player.draw();
            player.controls();
            player_projectiles = player.projectiles;
            playerHp = player.hp;
        
            pointUI.innerText = "PUNTI: " + playerPoints;
            HPUI.style.width = playerHp === 3 ? "100%" : playerHp === 2 ? "64%" : playerHp === 1 ? "33%" : "0%";
            HPUI.style.backgroundColor = playerHp === 3 ? "green" : playerHp === 2 ? "yellow" : playerHp === 1 ? "red" : "red";
        } else {
            gameoverUI.style.display = "flex";
        }
    } else {
        mainUI.style.display = "flex";
        playerUI.style.display = "none";
    }

}

function loopBackground() {
    c.drawImage(background, 0, background_y, canvasWidth, canvasHeight);
    c.drawImage(background, 0, background_y - canvasHeight, canvasWidth, canvasHeight);
    background_y += 1;
    if (background_y >= canvasHeight) {
        background_y = 0;
    }
}

function enemySpawn() {
    spawnCD--;
    if (spawnCD <= 0) {
        let maxX = Math.random() * (canvasWidth - 64);
        enemies.push(new BaseEnemy(maxX, -50, 64, 64, 1, 100, enemy_img))
        spawnCD = 120;
    }

    enemies = enemies.filter(e => e.hp > 0);
    enemies.forEach(e => {
        e.draw();
        e.move();
    })

    asteroidSpawn();
    enemyCollision();
}

function enemyCollision() {
    let playerAssets = [player, ...player_projectiles];
    let enemiesAssets = [...enemies, ...enemy_projectiles];
    enemiesAssets = enemiesAssets.filter(e => e.hp > 0);
    for (let i = 0; i < playerAssets.length; i++) {
        const pA = playerAssets[i];
        for (let j = 0; j < enemiesAssets.length; j++) {
            const enemy = enemiesAssets[j];
            if (enemy.projectiles) {
                enemy_projectiles = enemy.projectiles;
            }
            if (
                enemy.x < pA.x + pA.w &&
                enemy.x + enemy.w > pA.x &&
                enemy.y < pA.y + pA.h &&
                enemy.h + enemy.y > pA.y
              ) {
                if (pA.hp) {
                    pA.hp--;
                    console.log("enemy HIT", enemy);
                }
                enemy.hp--;
                if (enemy.hp === 0 && enemy.points) {
                    playerPoints += enemy.points;
                }
                if (enemy.hp === 0 && enemy.projectiles) {
                    enemy.projectiles = [];
                    enemy_projectiles = enemy.projectiles;
                }
            }
        }
    }

    enemies = enemies.filter(e => e.x < (canvasWidth + 200) && e.y < (canvasHeight + 200));
    enemy_projectiles = enemy_projectiles.filter(e => e.x < (canvasWidth + 200) && e.y < (canvasHeight + 200));
}

function asteroidSpawn() {
    asteroidCD--;
    if (asteroidCD <= 0) {
            let maxX = Math.random() * (canvasWidth - 64);
            let asteroid = new Asteroid(maxX, -50, 64, 64, 9999, 10000, asteroid_img);
            if (maxX < (canvasWidth / 2)) {
                asteroid.direction = 1;
            }
            if (maxX > (canvasWidth / 2)) {
                asteroid.direction = -1;
            }
            if (maxX === (canvasWidth / 2)) {
                asteroid.direction = 0;
            }
            enemies.push(asteroid);
        asteroidCD = 180;
    }
}

function minibossSpawn() {
    minibossCD--;
    if (minibossCD <= 0) {
        let spawnPosition = Math.round(Math.random()) === 0 ? 0 - 128 : canvasWidth + 128;
        let miniboss = new Miniboss(spawnPosition, 120, 128, 84, 20, 1000, miniboss_img);
        miniboss.speed = spawnPosition < 0 ? 3 : -3;
        enemies.push(miniboss);
        minibossCD = 1800;
    }
}

animation();