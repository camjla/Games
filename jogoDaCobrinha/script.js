let canvas = document.getElementById("snake");
let context = canvas.getContext("2d"); /*contexto ele desenha oq vai ser o desenho se será no plano 2d ou 3d e afins/" */
let box = 32; /*tamanho de cada quadrado  */
let snake = [];
snake[0] = {
    x: 8*box,
    y: 8* box
} /* tamanho da cobrinha */
let direction ="down"; //direção da cobrinha
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box, //math.random retorna um numero aleatorio até 1
    y: Math.floor(Math.random() * 15 + 1 ) * box//math.floor tira a parte flutuante ou seja o 0.
}

//função que cria o background
function criarBG()
{
    context.fillStyle = "lightgreen"; /* cor da cobrinha*/ 
    context.fillRect(0, 0, 16 * box, 16 * box); /* desenha onde vai acontecer o jogo, fill rect trabalha em 4 paramentros X,Y altura e largura */

}
/* a snake será um array de coordenadas*/
//função que cria a cobra

function criarCobrinha ()
{
    for(i=0; i < snake.length; i++) /* ? */
    {
        context.fillStyle = "pink";/* cor da cobra*/
        context.fillRect(snake[i].x , snake[i].y, box, box);/* tamanho da cobra*/
    }
}

function drawFood() //criar comidinha
{
    context.fillStyle = "green";
    context.fillRect(food.x, food.y, box, box);//definir coordenadas
}

document.addEventListener('keydown', update);// pega o evento de clique dos teclado

function update (event){
    if(event.keyCode == 37 && direction != "right") direction = "left";//a direção n pode ser oposta da 37, os num sao as teclas
    if(event.keyCode == 38 && direction != "down") direction = "down";
    if(event.keyCode == 39 && direction != "left") direction= "right"; //pesquisar mais sobre
    if(event.keyCode == 40 && direction != "up") direction = "up";
}

//Função que inicia o jogo /movimento
function iniciarJogo()
{
    if(snake[0].x > 15 * box && direction =="right")snake[0].x =0;// se a cabeça dela for maior q 15 vezes o tamanho do box, se ela ultrapassar isso , ela sai da tela
    if(snake[0].x < 0 && direction == "left")snake[0].x= 16 * box;
    if(snake[0].y > 15 * box && direction == "up")snake[0].y=0;
    if(snake[0].y < 0 && direction == "down")snake[0].y = 16 *box;

    for (i= 1; i < snake.length; i++)
    {
        if(snake[0].x==snake[i].x && snake[0].y == snake[i].y)
        {
            clearInterval(jogo); //para a função jogo e da um alet de gameover
            alert('Game Over :c');
        }
    }

    criarBG()
    criarCobrinha ();
    drawFood();


    let snakeX = snake[0].x;
    let snakeY = snake[0].y;//posicao zero

    //criar coordenadas.
    if( direction =="right") snakeX +=box; //a cada vez q for a direita aumenta mais um bloco
    if( direction =="left") snakeX -=box; //para a esquerda diminui para dar a ilusão de que vai para a esquerda
    if( direction =="up") snakeY += box;
    if( direction =="down") snakeY -= box;
    
    //definir  aleatoriedade da frutinha e do tamanho da cobra
    if(snakeX != food.x || snakeY != food.y)
    {
        snake.pop();

    }
    else
    {
       food.x =  Math.floor(Math.random() * 15 + 1) * box;
       food.y = Math.floor(Math.random() * 15 + 1 ) * box;
    }


    let newHead = //nova cabeça para a cobra
    {
        x: snakeX,
        y: snakeY,

    }
    snake.unshift(newHead);
}
let jogo =setInterval(iniciarJogo, 100); //passa o intervalo de cem mili segundos, dá continuidade sem travar.
