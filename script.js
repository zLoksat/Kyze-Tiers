const senhaAdmin = "RankedPvP67@";

const senhaTester = "TesterPvP67@";


let tipoUsuario = "";

let modoAtual = "Overall";



const tierPoints = {

    HT1:60,
    LT1:45,

    HT2:30,
    LT2:20,

    HT3:10,
    LT3:6,

    HT4:4,
    LT4:3,

    HT5:2,
    LT5:1

};





const modeIcons = {

    Vanilla:"imagens/vanilla.png",

    Sword:"imagens/sword.png",

    SMP:"imagens/smp.png",

    NethPot:"imagens/neth_pot.png",

    "Diamond Pot":"imagens/pot.png",

    Mace:"imagens/mace.png"

};







const loginBox=document.getElementById("loginBox");

const testerBox=document.getElementById("testerBox");

const addBox=document.getElementById("addBox");

const adminPanel=document.getElementById("adminPanel");



const adminLogin=document.getElementById("adminLogin");

const testerLogin=document.getElementById("testerLogin");

const adminButton=document.getElementById("adminButton");



const overallPage=document.getElementById("overallPage");

const tierPage=document.getElementById("tierPage");



const overallList=document.getElementById("overallList");

const tierGrid=document.getElementById("tierGrid");



const search=document.getElementById("search");









adminLogin.onclick=function(){

    loginBox.classList.remove("hidden");

};





function closeLogin(){

    loginBox.classList.add("hidden");

}





function login(){


    let senha=document.getElementById("password").value;


    if(senha===senhaAdmin){


        tipoUsuario="admin";


        adminLogin.classList.add("hidden");

        testerLogin.classList.add("hidden");


        adminButton.classList.remove("hidden");


        closeLogin();


    }else{


        alert("Senha incorreta!");

    }


}








testerLogin.onclick=function(){

    testerBox.classList.remove("hidden");

};





function closeTester(){

    testerBox.classList.add("hidden");

}







function loginTester(){


    let senha=document.getElementById("testerPassword").value;



    if(senha===senhaTester){


        tipoUsuario="tester";


        testerLogin.classList.add("hidden");

        adminLogin.classList.add("hidden");


        adminButton.classList.remove("hidden");



        closeTester();



    }else{


        alert("Senha incorreta!");

    }


}









adminButton.onclick=function(){

    adminPanel.classList.remove("hidden");

};







function closeAdmin(){

    adminPanel.classList.add("hidden");

}









function trocarModo(modo){


    modoAtual=modo;



    if(modo==="Overall"){


        overallPage.classList.remove("hidden");

        tierPage.classList.add("hidden");


        mostrarOverall();


    }else{


        overallPage.classList.add("hidden");

        tierPage.classList.remove("hidden");


        mostrarTiers();


    }


}









function openAdd(){


    closeAdmin();


    addBox.classList.remove("hidden");



    let tier=document.getElementById("tier");



    if(tipoUsuario==="tester"){


        tier.innerHTML=`

        <option>LT3</option>

        <option>HT4</option>

        <option>LT4</option>

        <option>HT5</option>

        <option>LT5</option>

        `;


    }else{


        tier.innerHTML=`

        <option>HT1</option>

        <option>LT1</option>

        <option>HT2</option>

        <option>LT2</option>

        <option>HT3</option>

        <option>LT3</option>

        <option>HT4</option>

        <option>LT4</option>

        <option>HT5</option>

        <option>LT5</option>

        `;


    }


}function closeAdd(){

    addBox.classList.add("hidden");

}







function adicionarPlayer(){


    let nick=document.getElementById("nick").value.trim();

    let region=document.getElementById("region").value;

    let mode=document.getElementById("mode").value;

    let tier=document.getElementById("tier").value;



    if(nick===""){

        alert("Digite um nick!");

        return;

    }




    if(tipoUsuario==="tester"){

        if(
            tier!=="LT3" &&
            tier!=="HT4" &&
            tier!=="LT4" &&
            tier!=="HT5" &&
            tier!=="LT5"
        ){

            alert("Testers só podem adicionar LT3, LT4 e LT5!");

            return;

        }

    }







    let players=JSON.parse(localStorage.getItem("players")) || [];



    let player=players.find(p=>

        p.nick.toLowerCase()===nick.toLowerCase()

    );





    if(!player){


        player={

            nick:nick,

            region:region,

            modes:[]

        };


        players.push(player);


    }







    let modeExistente=player.modes.find(m=>

        m.mode===mode

    );




    if(modeExistente){


        modeExistente.tier=tier;


    }else{


        player.modes.push({

            mode:mode,

            tier:tier

        });


    }






    localStorage.setItem(

        "players",

        JSON.stringify(players)

    );



    closeAdd();




    if(modoAtual==="Overall")

        mostrarOverall();

    else

        mostrarTiers();


}










function removerPlayer(){


    let nick=prompt("Nick para remover:");

    if(!nick)return;



    let players=JSON.parse(localStorage.getItem("players")) || [];



    players=players.filter(p=>

        p.nick.toLowerCase()!==nick.toLowerCase()

    );



    localStorage.setItem(

        "players",

        JSON.stringify(players)

    );



    mostrarOverall();


}











function renomearPlayer(){


    let antigo=prompt("Nick atual:");

    let novo=prompt("Novo nick:");



    if(!antigo || !novo)return;



    let players=JSON.parse(localStorage.getItem("players")) || [];



    let player=players.find(p=>

        p.nick.toLowerCase()===antigo.toLowerCase()

    );



    if(player){

        player.nick=novo;

    }



    localStorage.setItem(

        "players",

        JSON.stringify(players)

    );



    mostrarOverall();


}









function calcularPontos(player){


    let total=0;



    player.modes.forEach(m=>{


        total+=tierPoints[m.tier] || 0;


    });



    return total;


}











function mostrarOverall(){


    let players=JSON.parse(localStorage.getItem("players")) || [];



    let busca=search.value.toLowerCase();



    players=players.filter(p=>

        p.nick.toLowerCase().includes(busca)

    );





    players.sort((a,b)=>

        calcularPontos(b)-calcularPontos(a)

    );





    overallList.innerHTML="";






    if(players.length===0){


        overallList.innerHTML=`

        <div class="empty">

        Nenhum jogador cadastrado ainda.

        </div>

        `;


        return;


    }







    players.forEach((player,index)=>{



        let modos="";



        player.modes.forEach(m=>{



            modos+=`


            <div class="overall-mode">


                <img src="${modeIcons[m.mode]}">


                <span class="tier-color tier-${m.tier}">

                ${m.tier}

                </span>


            </div>


            `;


        });









        overallList.innerHTML+=`


        <div class="overall-player rank-${index+1}">


            <div class="player-rank-box">


                <strong>

                ${index+1}.

                </strong>


                <img class="avatar"

                src="https://mc-heads.net/avatar/${player.nick}/70">


            </div>




            <span class="nick">

            ${player.nick}

            </span>




            <span class="region">

            ${player.region}

            </span>





            <span class="points">

            ${calcularPontos(player)} pts

            </span>






            <div class="overall-modes">

            ${modos}

            </div>



        </div>



        `;



    });


}











function mostrarTiers(){


    let players=JSON.parse(localStorage.getItem("players")) || [];



    tierGrid.innerHTML="";



    let tiers={

        1:[],
        2:[],
        3:[],
        4:[],
        5:[]

    };







    players.forEach(player=>{


        let mode=player.modes.find(m=>

            m.mode===modoAtual

        );



        if(!mode)return;




        let numero=mode.tier.replace(/\D/g,"");




        tiers[numero].push({

            nick:player.nick,

            tier:mode.tier

        });



    });








    for(let i=1;i<=5;i++){



        tiers[i].sort((a,b)=>{


            return tierPoints[b.tier]-tierPoints[a.tier];


        });






        let html=`


        <div class="tier-column">



        <div class="tier-title tier-${i}">


            <img src="imagens/tier${i}.png">


            <span>

            Tier ${i}

            </span>


        </div>



        `;








        tiers[i].forEach(player=>{



            html+=`


            <div class="tier-player">


                <img src="https://mc-heads.net/avatar/${player.nick}/40">



                <span>

                ${player.nick}

                </span>





                <b class="tier-color tier-${player.tier}">

                ${player.tier}

                </b>



            </div>


            `;


        });






        html+="</div>";



        tierGrid.innerHTML+=html;



    }


}









search.addEventListener("input",()=>{


    if(modoAtual==="Overall")

        mostrarOverall();

    else

        mostrarTiers();


});







mostrarOverall();