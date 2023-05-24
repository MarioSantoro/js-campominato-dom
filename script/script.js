const button = document.querySelector("button");
button.addEventListener("click", function(){
    const mainElement = document.querySelector("main");
    mainElement.innerHTML = "";
    let len = 0;

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

    const bomb = randomBomb(len-1 , 2);
    console.log(bomb)
    let temp = 0;
    let bool = true;
        for(let i=1; i<len + 1;i++){
            const newCellsElement = createCellsNormal();
            newCellsElement.innerHTML = i;
            newCellsElement.addEventListener("click" , function (){
                if(bool){
                    if(bomb.includes(i)){
                        newCellsElement.classList.add("toggle-red");
                        const resultGame = document.createElement("span");
                        resultGame.innerHTML = "Hai perso!!";
                        resultGame.classList.add("fs-1" ,  "ms-custom")
                        mainElement.appendChild(resultGame);
                        bool = false;
                    }else{
                        if(!newCellsElement.classList.contains("toggle")){
                            temp++;
                        }
                        newCellsElement.classList.add("toggle"); 
                        
                        console.log(temp);
                        if(temp === len - bomb.length){
                            mainElement.innerHTML += `<span class="fs-1 ms-custom">Hai vinto!!  Punteggio: ${temp}</span>`;
                            bool = false;
                        }
                    }
                }  
                
            }); 
            newGridElement.appendChild(newCellsElement);
        }
    
})
