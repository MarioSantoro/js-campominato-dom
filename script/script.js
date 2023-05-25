const button = document.querySelector("button");
button.addEventListener("click", function(){
    const mainElement = document.querySelector("main");
    const score =  document.createElement("span");
    mainElement.innerHTML = "";
    let len = 0;
    let temp = 0;
    let bool = true;
    
    const selectElement = document.querySelector("select").value;
    const root = document.querySelector(":root");
    const rootStyle = getComputedStyle(root);

    if(selectElement === "Normal"){
        len = 100;
         root.style.setProperty("--cells" , 10);
    }else if(selectElement === "Hard"){
        len = 81;
        root.style.setProperty("--cells" , 9);
    }else if(selectElement === "Crazy"){
        len = 49;
        root.style.setProperty("--cells" , 7);
    }
    
    const newGridElement = createGridNormal();
    mainElement.appendChild(newGridElement);
    
    const bomb = randomBomb(len-1 , 16);
    console.log(bomb);


    //******************
    //Funzioni
    //********************

    function createCellsNormal(){
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell" , "Normal" , "d-flex" , "align-items-center" , "justify-content-center" , "fw-semibold");
        return cellElement;
    }
    
    function createGridNormal(){
        const gridElement = document.createElement("div");
        gridElement.classList.add("d-flex" , "flex-wrap" , "m-auto" , "grid-Normal");
        return gridElement;
    }

    function randomBomb( max , number){
        const listBomb = []
        while(listBomb.length < number){
            const randomNumber = Math.floor(Math.random() * max) + 1;
            if(!listBomb.includes(randomNumber)){
                listBomb.push(randomNumber);
            }
        }
        return listBomb;
    }

    function ResultLose(punteggio){
        const resultGame = document.createElement("span");
        resultGame.innerHTML = `Hai perso!! Punteggio : ${punteggio}`;
        resultGame.classList.add("fs-1" ,  "ms-custom");
        mainElement.appendChild(resultGame);
    }

    function ResultWin(punteggio){
        const resultGame = document.createElement("span");
        resultGame.innerHTML = `Hai vinto!! Punteggio : ${punteggio}`;
        resultGame.classList.add("fs-1" ,  "ms-custom");
        mainElement.appendChild(resultGame);
    }

    function CheckResult(){
        for(let i=1; i<len + 1;i++){
            const newCellsElement = createCellsNormal();
            if(bomb.includes(i)){
                newCellsElement.classList.add("bomb" , "text-color-background");
                newCellsElement.innerHTML = `<i class="fa-solid fa-bomb"></i>`
            }
            newCellsElement.addEventListener("click" , function (){
                if(bool){
                    if(bomb.includes(i)){
                        newGridElement.classList.add("game-over");
                        newCellsElement.classList.remove("text-color-background");
                        bool = false;
                        score.innerHTML="";
                        ResultLose(temp);
                    }else{
                        if(!newCellsElement.classList.contains("toggle")){
                            temp++;
                            console.log(temp)
                        }
                        score.innerHTML = `Punteggio : ${temp} `;
                        score.classList.add("fs-1" , "ms-custom");
                        mainElement.appendChild(score);
                        newCellsElement.innerHTML = `<span class="material-symbols-outlined">
                        local_florist
                        </span>`
                        newCellsElement.classList.add("toggle"  , "text-black"); 
                        if(temp === len - bomb.length){
                            score.innerHTML="";
                            ResultWin(temp);
                        }
                    }
                }  
            }); 
            newGridElement.appendChild(newCellsElement);
        }
    }

    CheckResult();  
     
})

