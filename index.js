console.log('Apareceu');

let frames = 0;
const som_hit = new Audio();
som_hit.src = './efeitos/hit.wav'
const sprites =  new Image();
sprites.src = '/sprites.png'

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

function fazcolisao(flappybird, chao){
    const flappybirdy = flappybird.y + flappybird.altura;
    const chaoy = chao.y;

    if (flappybirdy >= chaoy) {
        return true
    }
    return false
}

const planoDeFundo = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 102,
    x: 0,
    y: canvas.height - 102,
    desenha() {
      contexto.fillStyle = '#70c5ce';
      contexto.fillRect(0,0, canvas.width, canvas.height)
  
      contexto.drawImage(
        sprites,
        planoDeFundo.spriteX, planoDeFundo.spriteY,
        planoDeFundo.largura, planoDeFundo.altura,
        planoDeFundo.x, planoDeFundo.y,
        planoDeFundo.largura, planoDeFundo.altura,
      );
  
      contexto.drawImage(
        sprites,
        planoDeFundo.spriteX, planoDeFundo.spriteY,
        planoDeFundo.largura, planoDeFundo.altura,
        (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y,
        planoDeFundo.largura, planoDeFundo.altura,
      );
    },
  };

  function criaFlappyBird() {
    const flappybird = {
        spriteX: 0, 
        spriteY: 0,
        largura:33, 
        altura: 24,
        x: 10, 
        y: 0,
        pulo: 4.6,
        pula() {
            flappybird.velocidade = - flappybird.pulo
        },
        gravidade: 0.25,
        velocidade:0,
        atualiza(){
            if (fazcolisao(flappybird, globais.chao)) 
            {
                som_hit.play();

                setTimeout (() => {
                    mudaParaTela(Telas.INICIO)
                }, 500)
                return
            }
        flappybird.velocidade = flappybird.velocidade + flappybird.gravidade;
        
        flappybird.y = flappybird.y + flappybird.velocidade;   
        },
        movimentos: [
            { spriteX: 0, spriteY: 0, },
            { spriteX: 0, spriteY: 26, },
            { spriteX: 0, spriteY: 52, },
        ],
        frameAtual: 0,
        atualizaOFrameAtual() {
            const baseDoIncremento = 1;
            const incremento = baseDoIncremento + flappybird.frameAtual;
            const baseRepeticao = flappybird.movimentos.length;
            flappybird.frameAtual = incremento % baseRepeticao
        },
        
        desenha() {
            flappybird.atualizaOFrameAtual();
            const { spriteX, spriteY } = flappybird.movimentos[flappybird.frameAtual];

            contexto.drawImage(
                sprites,
                spriteX, spriteY,
                flappybird.largura, flappybird.altura,
                flappybird.x, flappybird.y,  
                flappybird.largura, flappybird.altura,      
            )
        }
    }

    return flappybird
  }





function criaChao() {
    const chao = {
        spriteX: 0, 
        spriteY: 610,
        largura: 224, 
        altura: 40,
        x: 0, 
        y: canvas.height - 40,
        atualiza() {
            const movimentoDoChao = 1;
            const repeteEm = chao.largura / 2;
            const movimentacao = chao.x - movimentoDoChao;

            chao.x = movimentacao % repeteEm;
        },
    
        desenha() {
            contexto.drawImage(
                sprites,
                chao.spriteX, chao.spriteY,
                chao.largura, chao.altura,
                chao.x, chao.y,  
                chao.largura, chao.altura,      
            )
            
            contexto.drawImage(
                sprites,
                chao.spriteX, chao.spriteY,
                chao.largura, chao.altura,
                (chao.x + chao.largura), chao.y,  
                chao.largura, chao.altura,      
            )
    
        }
    }
    return chao;
}




const mensagemGetReady = {
    sX:134,
    sY: 0,
    w: 174,
    h: 150,
    x: (canvas.width / 2 )- 174/2,
    y: 0,
    desenha() {
        contexto.drawImage(
        sprites,
        mensagemGetReady.sX, mensagemGetReady.sY,
        mensagemGetReady.w, mensagemGetReady.h,
        mensagemGetReady.x, mensagemGetReady.y,
        mensagemGetReady.w, mensagemGetReady.h,
        );
    }
}


//
//[Telas]
//
const globais = {};
let telaAtiva = {};
function mudaParaTela(novaTela) {
    telaAtiva = novaTela;

    if (telaAtiva.inicializa) {
        telaAtiva.inicializa();
    }
}

const Telas = {
    INICIO:{
        inicializa(){
            globais.flappybird = criaFlappyBird();
            globais.chao = criaChao();
        },
        desenha() {
        planoDeFundo.desenha();
        globais.chao.desenha();
        globais.flappybird.desenha();
        mensagemGetReady.desenha();
        },

        click() {
        mudaParaTela(Telas.JOGO)            
        },

        atualiza() {
        globais.chao.atualiza();
        }
    }
}

Telas.JOGO = {
    desenha() {
        planoDeFundo.desenha();
        globais.chao.desenha();
        globais.flappybird.desenha();
    },

    click() {
        globais.flappybird.pula();
    },

    atualiza() {
        globais.flappybird.atualiza();
        globais.chao.atualiza();

    }
}



function loop() {
    
    telaAtiva.desenha()
    telaAtiva.atualiza()

    frames = frames + 1;
    requestAnimationFrame(loop);


}
 
window.addEventListener('click', function () {
    if (telaAtiva.click) 
    {
        telaAtiva.click()
    }
})

mudaParaTela(Telas.INICIO)

loop()