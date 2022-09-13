const dino = document.querySelector('.dino');
const background = document.querySelector('.background');

let isJumping = false; //para saber se esta pulando ou nao
let isGameOver = false;
let position = 0; //para saber se o dino está pulando para dar ou n gameover

function handleKeyUp(event) {
  if (event.keyCode === 32) { //keycode 32 é o espaço
    if (!isJumping) { //!é a negativa ou seja ficará verddadeiro
      jump();
    }
  }
}

function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 150) {
      // Descendo
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } 
        else {
          position -= 20;
          dino.style.bottom = position + 'px';
        }
      }, 20);
    } else {
      // Subindo
      position += 20;
      dino.style.bottom = position + 'px';
    }
  }, 20);
}

function createCactus() {
  const cactus = document.createElement('div');
  let cactusPosition = 1000; //posição que o cactus fica
  let randomTime = Math.random() * 5000; //serve para realizar arredondamento, gera um num aleatorio que será a aleatoridade que irá gerar um novo cacto

  if (isGameOver) return;

  cactus.classList.add('cactus'); //cria o cactus
  background.appendChild(cactus); //adiciona um
  cactus.style.left = cactusPosition + 'px';

  let leftTimer = setInterval(() => {
    if (cactusPosition < -60) {
      // Saiu da tela, para fazer desaparecer
      clearInterval(leftTimer);
      background.removeChild(cactus);
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) { //se o cacto n saiu da tela (por isso maior que 0), e a posicão tem que estar -60 pois 60 é o tamanho do dino , se o pulo tiver acima do cacto o jogo continua, se não, gameover
      // Game over
      clearInterval(leftTimer);
      isGameOver = true;
      document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>';
    } else {
      cactusPosition -= 10; //velocidade q se mexe para a esquerda> demora virar, se for +20 vai aumentar a dificuldade do jogo.
      cactus.style.left = cactusPosition + 'px';
    }
  }, 20);

  setTimeout(createCactus, randomTime);//tipo um espelho que invoca a criação de um novo cacto
}

createCactus(); //aparece um cactus
document.addEventListener('keyup', handleKeyUp);