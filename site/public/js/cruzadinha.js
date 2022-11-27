var cruzadinha = [
    ['x','x','x','x','2','x','x','x','x','x','x','x','x','x','x'],
    ['x','x','x','x','i','x','x','x','x','x','x','x','x','x','x'],
    ['x','x','4','t','o','p','x','x','x','x','x','x','x','x','x'],
    ['x','x','x','x','n','x','3','x','x','x','x','x','x','x','x'],
    ['x','x','x','x','i','x','y','x','x','x','x','x','x','x','x'],
    ['1','e','s','p','a','d','a','q','u','e','b','r','a','d','a'],
    ['x','x','x','x','x','x','s','x','x','x','x','x','x','x','x'],
    ['x','x','x','x','x','x','u','x','x','x','x','x','x','x','x'],
    ['5','l','u','t','a','d','o','r','x','x','x','x','x','x','x']
];

var div = document.getElementById("cruzadinha");
var contadorId = 0;
for(var l = 0; l <= 8; l++){
    for(var c = 0; c <= 14; c++){
        var posicao = cruzadinha[l][c];
      
        if(posicao == '1' || posicao == '2' || posicao == '3' || posicao == '4' || posicao == '5'){
            var button = document.createElement("button")
            button.className = "btnNumero"
            button.innerHTML = posicao;
            div.appendChild(button);
        } else if(posicao != 'x'){
            var input = document.createElement("input");
            input.className = "ipt_normal";
            input.id = `a${contadorId}`;
            input.setAttribute("maxlength", "1");
            div.appendChild(input);
            contadorId++;
        } else{
            var input = document.createElement("input");
            input.className = "ipt_vazia";
            div.appendChild(input);
        }
        if(c == 14){
            div.innerHTML += `<br>`
        }
    }
}

function validarResposta(){
    if(a7.value + a8.value + a9.value + a10.value + a11.value + a12.value + a13.value + a14.value + a15.value + a16.value + a17.value + a18.value + a19.value + a20.value == "espadaquebrada"){
        resp1.setAttribute("style", "color: yellow")
        resp1.innerHTML = "ESPADA QUEBRADA"
    }else{
        resp1.setAttribute("style", "color: red")
        resp1.innerHTML = "RESPOSTA ERRADA"
    }

    if(a0.value + a2.value + a4.value + a5.value + a10.value == "ionia"){
        resp2.setAttribute("style", "color: yellow")
        resp2.innerHTML = "IONIA";
    } else{
        resp2.setAttribute("style", "color: red")
        resp2.innerHTML = "RESPOSTA ERRADA"
    }

    if(a6.value + a12.value + a21.value + a22.value + a28.value == "yasuo"){
        resp3.setAttribute("style", "color: yellow");
        resp3.innerHTML = "YASUO"
    } else{
        resp3.setAttribute("style", "color: red");
        resp3.innerHTML = "RESPOSTA ERRADA"
    }

    if(a1.value + a2.value + a3.value == "top"){
        resp4.setAttribute("style", "color: yellow");
        resp4.innerHTML = "TOP"
    } else{
        resp4.setAttribute("style", "color: red");
        resp4.innerHTML = "RESPOSTA ERRADA"
    }

    if(a23.value + a24.value + a25.value + a26.value + a27.value + a28.value + a29.value == "lutador"){
        resp5.setAttribute("style", "color: yellow");
        resp5.innerHTML = "LUTADOR"
    } else{
        resp5.setAttribute("style", "color: red");
        resp5.innerHTML = "RESPOSTA ERRADA"
    }
}