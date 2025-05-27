// Variáveis globais para controle da rotação do cubo
let cubeRotationX = -20; // ângulo inicial
let cubeRotationY = 30;  // ângulo inicial

// Função para rotacionar o cubo nas setas do teclado
function rotateCubeX(degrees) {
  cubeRotationX += degrees;
  document.getElementById('cube').style.transform = `rotateX(${cubeRotationX}deg) rotateY(${cubeRotationY}deg)`;
}
function rotateCubeY(degrees) {
  cubeRotationY += degrees;
  document.getElementById('cube').style.transform = `rotateX(${cubeRotationX}deg) rotateY(${cubeRotationY}deg)`;
}

// Listener para teclado
document.addEventListener('keydown', function(event) {
  switch(event.key) {
    case 'ArrowUp':
      rotateCubeX(-15);
      break;
    case 'ArrowDown':
      rotateCubeX(15);
      break;
    case 'ArrowLeft':
      rotateCubeY(-15);
      break;
    case 'ArrowRight':
      rotateCubeY(15);
      break;
  }
});


// Função para rotacionar o cubo em X
function rotateCubeX(degrees) {
  cubeRotationX += degrees;
  document.getElementById('cube').style.transform = `rotateX(${cubeRotationX}deg) rotateY(${cubeRotationY}deg)`;
}

// Função para rotacionar o cubo em Y
function rotateCubeY(degrees) {
  cubeRotationY += degrees;
  document.getElementById('cube').style.transform = `rotateX(${cubeRotationX}deg) rotateY(${cubeRotationY}deg)`;
}

// Ordem das faces do cubo
const facesOrder = ['front','back','right','left','top','bottom'];

// Cores de cada face inicial
const faceColors = {
  front: 'red',
  back: 'orange',
  right: 'green',
  left: 'blue',
  top: 'yellow',
  bottom: 'White'
};

// Objeto que mantém o estado do cubo: cada face com 9 peças (cores)
let cube = {};

// Função para inicializar o cubo com cores padrão
function init() {
  // Para cada face, preenche com 9 cores iguais
  facesOrder.forEach(face => {
    cube[face] = Array(9).fill(faceColors[face]);
  });
  render(); // Desenha o cubo atualizado
}

// Função para desenhar o cubo na tela
function render() {
  // Para cada face
  facesOrder.forEach(face => {
    const faceDiv = document.querySelector(`.face[data-face="${face}"]`);
    faceDiv.innerHTML = ''; // Limpa peças anteriores
    // Cria e adiciona cada peça com a cor correspondente
    cube[face].forEach(color => {
      const btn = document.createElement('button');
      btn.style.backgroundColor = color; // Cor da peça
      faceDiv.appendChild(btn); // Adiciona na face
    });
  });
}

// Função para resetar o cubo ao estado inicial
function reset() {
  init(); // Re-inicia o cubo
}

// Função que executa o movimento escolhido
function move(mov) {
  switch (mov) {
    case 'U': rotateU(true); break;      // Rotação da camada superior horário
    case "U'": rotateU(false); break;    // Anti-horário
    case 'D': rotateD(true); break;      // Camada inferior horário
    case "D'": rotateD(false); break;
    case 'L': rotateL(true); break;      // Lado esquerdo horário
    case "L'": rotateL(false); break;
    case 'R': rotateR(true); break;      // Lado direito horário
    case "R'": rotateR(false); break;
    case 'F': rotateF(true); break;      // Face frontal horário
    case "F'": rotateF(false); break;
    case 'B': rotateB(true); break;      // Face de trás horário
    case "B'": rotateB(false); break;
  }
  render(); // Atualiza visual
}

// Função que rotaciona uma face
function rotateFace(face, clockwise) {
  const f = cube[face]; // Pega a face
  if (clockwise) {
    // Rotação horário: troca posições na matriz
    cube[face] = [
      f[6], f[3], f[0],
      f[7], f[4], f[1],
      f[8], f[5], f[2]
    ];
  } else {
    // Rotação anti-horário
    cube[face] = [
      f[2], f[5], f[8],
      f[1], f[4], f[7],
      f[0], f[3], f[6]
    ];
  }
}

// Cada uma das funções abaixo rotaciona uma camada específica do cubo
// E troca as cores das peças das faces adjacentes de acordo

// Rotaciona a camada superior (U)
function rotateU(clockwise) {
  rotateFace('top', clockwise); // Rotaciona a face superior
  // Rotaciona as bordas das faces front, right, back, left
  if (clockwise) {
    const temp = [...cube['front'].slice(0,3)]; // Guarda a linha superior da frente
    // Move linha superior da esquerda para frente
    cube['front'].splice(0,3, ...cube['left'].slice(0,3));
    // Move linha superior de trás para esquerda
    cube['left'].splice(0,3, ...cube['back'].slice(0,3));
    // Move linha superior da direita para trás
    cube['back'].splice(0,3, ...cube['right'].slice(0,3));
    // Coloca a linha guardada na frente na direita
    cube['right'].splice(0,3, ...temp);
  } else {
    // Movimento anti-horário: faz o movimento inverso
    const temp = [...cube['front'].slice(0,3)];
    cube['front'].splice(0,3, ...cube['right'].slice(0,3));
    cube['right'].splice(0,3, ...cube['back'].slice(0,3));
    cube['back'].splice(0,3, ...cube['left'].slice(0,3));
    cube['left'].splice(0,3, ...temp);
  }
}

// Rotaciona a camada inferior (D)
function rotateD(clockwise) {
  rotateFace('bottom', clockwise);
  if (clockwise) {
    const temp = [...cube['front'].slice(6,9)]; // Linha inferior da frente
    // Troca linha inferior da frente pela da direita
    cube['front'].splice(6,3, ...cube['right'].slice(6,9));
    // Da direita para trás
    cube['right'].splice(6,3, ...cube['back'].slice(6,9));
    // Da trás para esquerda
    cube['back'].splice(6,3, ...cube['left'].slice(6,9));
    // Esquerda para frente
    cube['left'].splice(6,3, ...temp);
  } else {
    const temp = [...cube['front'].slice(6,9)];
    cube['front'].splice(6,3, ...cube['left'].slice(6,9));
    cube['left'].splice(6,3, ...cube['back'].slice(6,9));
    cube['back'].splice(6,3, ...cube['right'].slice(6,9));
    cube['right'].splice(6,3, ...temp);
  }
}

// Rotaciona a camada esquerda (L)
function rotateL(clockwise) {
  rotateFace('left', clockwise);
  if (clockwise) {
    // Troca as colunas esquerda das faces front, top, back, bottom
    const temp = [cube['front'][0], cube['front'][3], cube['front'][6]];
    // Frente para baixo
    cube['front'][0] = cube['bottom'][0];
    cube['front'][3] = cube['bottom'][3];
    cube['front'][6] = cube['bottom'][6];

    // Baixo para trás
    cube['bottom'][0] = cube['back'][8];
    cube['bottom'][3] = cube['back'][5];
    cube['bottom'][6] = cube['back'][2];

    // Trás para cima
    cube['back'][8] = cube['top'][8];
    cube['back'][5] = cube['top'][5];
    cube['back'][2] = cube['top'][2];

    // Cima para frente
    cube['top'][8] = temp[0];
    cube['top'][5] = temp[1];
    cube['top'][2] = temp[2];
  } else {
    // Movimento anti-horário
    const temp = [cube['front'][0], cube['front'][3], cube['front'][6]];
    cube['front'][0] = cube['top'][8];
    cube['front'][3] = cube['top'][5];
    cube['front'][6] = cube['top'][2];

    cube['top'][8] = cube['back'][8];
    cube['top'][5] = cube['back'][5];
    cube['top'][2] = cube['back'][2];

    cube['back'][8] = cube['bottom'][0];
    cube['back'][5] = cube['bottom'][3];
    cube['back'][2] = cube['bottom'][6];

    cube['bottom'][0] = temp[0];
    cube['bottom'][3] = temp[1];
    cube['bottom'][6] = temp[2];
  }
}

// Rotaciona a camada direita (R)
function rotateR(clockwise) {
  rotateFace('right', clockwise);
  if (clockwise) {
    // Troca as colunas direita das faces front, top, back, bottom
    const temp = [cube['front'][2], cube['front'][5], cube['front'][8]];
    // Frente para cima
    cube['front'][2] = cube['top'][2];
    cube['front'][5] = cube['top'][5];
    cube['front'][8] = cube['top'][8];

    // Cima para trás
    cube['top'][2] = cube['back'][6];
    cube['top'][5] = cube['back'][3];
    cube['top'][8] = cube['back'][0];

    // Trás para baixo
    cube['back'][6] = cube['bottom'][8];
    cube['back'][3] = cube['bottom'][5];
    cube['back'][0] = cube['bottom'][2];

    // Baixo para frente
    cube['bottom'][8] = temp[0];
    cube['bottom'][5] = temp[1];
    cube['bottom'][2] = temp[2];
  } else {
    // anti-horário
    const temp = [cube['front'][2], cube['front'][5], cube['front'][8]];
    cube['front'][2] = cube['bottom'][8];
    cube['front'][5] = cube['bottom'][5];
    cube['front'][8] = cube['bottom'][2];

    cube['bottom'][8] = cube['back'][6];
    cube['bottom'][5] = cube['back'][3];
    cube['bottom'][2] = cube['back'][0];

    cube['back'][6] = cube['top'][2];
    cube['back'][3] = cube['top'][5];
    cube['back'][0] = cube['top'][8];

    cube['top'][2] = temp[0];
    cube['top'][5] = temp[1];
    cube['top'][8] = temp[2];
  }
}

// Rotaciona a face frontal (F)
function rotateF(clockwise) {
  rotateFace('front', clockwise);
  if (clockwise) {
    // Armazena a linha inferior da parte superior
    const temp = [cube['top'][6], cube['top'][7], cube['top'][8]];
    // Move a coluna esquerda da esquerda para a linha inferior da superior
    cube['top'][6] = cube['left'][8];
    cube['top'][7] = cube['left'][5];
    cube['top'][8] = cube['left'][2];

    // Move a linha inferior da inferior para a coluna direita
    cube['left'][2] = cube['bottom'][2];
    cube['left'][5] = cube['bottom'][1];
    cube['left'][8] = cube['bottom'][0];

    // Linha inferior da inferior para a coluna esquerda
    cube['bottom'][0] = cube['right'][6];
    cube['bottom'][1] = cube['right'][3];
    cube['bottom'][2] = cube['right'][0];

    // Coluna direita da direita para a linha inferior da superior
    cube['right'][0] = temp[0];
    cube['right'][3] = temp[1];
    cube['right'][6] = temp[2];
  } else {
    // Movimento anti-horário
    const temp = [cube['top'][6], cube['top'][7], cube['top'][8]];
    // Coluna direita para cima
    cube['top'][6] = cube['right'][0];
    cube['top'][7] = cube['right'][3];
    cube['top'][8] = cube['right'][6];

    // Coluna direita para baixo
    cube['right'][0] = cube['bottom'][2];
    cube['right'][3] = cube['bottom'][1];
    cube['right'][6] = cube['bottom'][0];

    // Linha inferior da inferior para a coluna esquerda
    cube['bottom'][0] = cube['left'][8];
    cube['bottom'][1] = cube['left'][5];
    cube['bottom'][2] = cube['left'][2];

    // Coluna esquerda para a linha superior
    cube['left'][2] = temp[2];
    cube['left'][5] = temp[1];
    cube['left'][8] = temp[0];
  }
}

// Rotaciona a face de trás (B)
function rotateB(clockwise) {
  rotateFace('back', clockwise);
  if (clockwise) {
    // Armazena a linha superior da face top
    const temp = [cube['top'][0], cube['top'][1], cube['top'][2]];

    // Move a coluna direita da face direita para a linha superior da top
    cube['top'][0] = cube['right'][2];
    cube['top'][1] = cube['right'][5];
    cube['top'][2] = cube['right'][8];

    // Linha superior da top para a coluna direita da direita
    cube['right'][2] = cube['bottom'][8];
    cube['right'][5] = cube['bottom'][7];
    cube['right'][8] = cube['bottom'][6];

    // Linha inferior da bottom para a coluna esquerda da esquerda
    cube['bottom'][6] = cube['left'][0];
    cube['bottom'][7] = cube['left'][3];
    cube['bottom'][8] = cube['left'][6];

    // Coluna esquerda da esquerda para a linha superior da top
    cube['left'][0] = temp[2];
    cube['left'][3] = temp[1];
    cube['left'][6] = temp[0];
  } else {
    // Movimento anti-horário
    const temp = [cube['top'][0], cube['top'][1], cube['top'][2]];

    // Coluna esquerda para cima
    cube['top'][0] = cube['left'][6];
    cube['top'][1] = cube['left'][3];
    cube['top'][2] = cube['left'][0];

    // Coluna esquerda para baixo
    cube['left'][0] = cube['bottom'][6];
    cube['left'][3] = cube['bottom'][7];
    cube['left'][6] = cube['bottom'][8];

    // Linha inferior da bottom para a coluna direita da direita
    cube['bottom'][6] = cube['right'][8];
    cube['bottom'][7] = cube['right'][5];
    cube['bottom'][8] = cube['right'][2];

    // Coluna direita para cima
    cube['right'][2] = temp[0];
    cube['right'][5] = temp[1];
    cube['right'][8] = temp[2];
  }
}

// Inicializa o cubo ao carregar
init();