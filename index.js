console.log('Apareceu');

const sprites =  new Image();
sprites.src = '/sprites.png'

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

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

const flappybird = {
    spriteX: 0, 
    spriteY: 0,
    largura:33, 
    altura: 24,
    x: 10, 
    y: 0,
    gravidade: 0.25,
    velocidade:0,
    atualiza(){
    flappybird.velocidade = flappybird.velocidade + flappybird.gravidade;
    
    flappybird.y = flappybird.y + flappybird.velocidade;   
    },
    desenha() {
        contexto.drawImage(
            sprites,
            flappybird.spriteX, flappybird.spriteY,
            flappybird.largura, flappybird.altura,
            flappybird.x, flappybird.y,  
            flappybird.largura, flappybird.altura,      
        )
    }
}


const chao = {
    spriteX: 0, 
    spriteY: 610,
    largura: 224, 
    altura: 40,
    x: 0, 
    y: canvas.height - 40,
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

let telaAtiva = {};
function mudaParaTela(novaTela) {
    telaAtiva = novaTela
}

const Telas = {
    INICIO:{
        desenha() {
        planoDeFundo.desenha();
        chao.desenha();
        flappybird.desenha();
        mensagemGetReady.desenha();
        },

        click() {
        mudaParaTela(Telas.JOGO)            
        },

        atualiza() {

        }
    }
}

Telas.JOGO = {
    desenha() {
        planoDeFundo.desenha();
        chao.desenha();
        flappybird.desenha();
    },
    atualiza() {
    flappybird.atualiza();
    }
}



function loop() {
    
    telaAtiva.desenha()
    telaAtiva.atualiza()

    
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