let raqueteLeft, raqueteRight;
let bola;

let pontosLeft = 0;
let pontosRight = 0;

let gameState = "parado";
let vencedor = "nenhum";

function setup() {
    createCanvas(800, 800);

    raqueteLeft = createSprite(20, 400, 10, 100);
    raqueteRight = createSprite(780, 400, 10, 100);

    raqueteLeft.shapeColor = "white";
    raqueteRight.shapeColor = "white";

    bola = createSprite(400, 400, 10, 10);
    bola.shapeColor = "white";
}

function draw() {
    background("#081214");

    const edges = createEdgeSprites();

    if (gameState === "parado") {
        textSize(48);
        fill("white");
        textFont("Courier New");
        text("PRESSIONE PARA INICIAR", 90, 360);
        text(pontosLeft, 60, 60);
        text(pontosRight, 740, 60);

    } else if (gameState === "start") {
        // bola.setVelocity(random(-5, -7), random(4, 6));
        bola.velocityX = round(random(-5, -7));
        bola.velocityY = round(random(4, 6));
        gameState = "playing";

    } else if (gameState === "playing") {

        textSize(48);
        fill("white");
        textFont("Courier New");
        text(pontosLeft, 60, 60);
        text(pontosRight, 740, 60);


        raqueteLeft.y = bola.y;
        raqueteRight.y = mouseY;

        if (raqueteRight.y < 50) {
            raqueteRight.y = 50;
        }

        if (raqueteRight.y > 740) {
            raqueteRight.y = 740;
        }

        if (raqueteLeft.y < 50) {
            raqueteLeft.y = 50;
        }

        if (raqueteLeft.y > 740) {
            raqueteLeft.y = 740;
        }

        for (var i = 0; i < 800; i = i + 40) {
            stroke("white");
            line(400, i, 400, i + 20);
        }

        bola.bounceOff(edges[2]);
        bola.bounceOff(edges[3]);
        bola.bounceOff(raqueteLeft);
        bola.bounceOff(raqueteRight);

        if (bola.x > 800) {
            pontosLeft++;
            bola.velocityX = 0;
            bola.velocityY = 0;
            bola.x = 400;
            bola.y = 400;
            gameState = "parado";
        }

        if (bola.x < 0) {
            pontosRight++;
            bola.velocityX = 0;
            bola.velocityY = 0;
            bola.x = 400;
            bola.y = 400;
            gameState = "parado";
        }

        if (pontosLeft == 10) {
            gameState = "end";
            vencedor = "left";
        }

        if (pontosRight == 10) {
            gameState = "end";
            vencedor = "right";
        }

    } else if (gameState == "end") {
        if (vencedor == "left") {
            textSize(48);
            fill("white");
            textFont("Courier New");
            text("VOCÊ PERDEU :(", 85, 180);
            
        } else if (vencedor == "right") {
            textSize(48);
            fill("white");
            textFont("Courier New");
            text("VOCÊ VENCEU!!", 80, 180);
        }
    }

    if(keyDown("space")){
        if (gameState === "parado") {
            gameState = "start";
        }
    }

    drawSprites();
}

// function mousePressed() {
//     if (gameState === "parado") {
//         gameState = "start";
//     }
// }