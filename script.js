document.body.onload = init;    

let hitCounter = 0;    
let hitCounterElem = document.getElementById("hitCounter");

function init(){
    guessingBoard();
    placingBoard();
}


function guessingBoard(){
    let battleship = document.getElementById("battleship");
    let counter = 0;
    
    for(let i = 0;i <= 9;i++){
        for(let j = 0;j <= 9;j++){
            let block = document.createElement("div");
            battleship.appendChild(block);
            
            block.id = counter++;
            
            let xBlock = i * 40;
            let yBlock = j * 40; 
            
            block.style.top = xBlock + "px";
            block.style.left = yBlock + "px";
            block.style.backgroundColor = "aqua";

            block.addEventListener("click", () => {
                block.style.backgroundColor = "red";
                console.log(block.id);    
                
                if(block.id == localStorage.getItem("id", block.id) || block.id == localStorage.getItem("nextId", block.id) ||  block.id == localStorage.getItem("prevId", block.id) ){
                    block.style.backgroundColor = "green";
                    hitCounterElem.innerHTML = "Score: " + hitCounter;
                }
                if(block.id == localStorage.getItem("ship2Id1", block.id) || block.id == localStorage.getItem("ship2Id2", block.id) ||  block.id == localStorage.getItem("ship2Id3", block.id) ){
                    block.style.backgroundColor = "green";
                    hitCounterElem.innerHTML = "Score: " + hitCounter;
                }
                if(block.id == localStorage.getItem("ship3Id1", block.id) || block.id == localStorage.getItem("ship3Id2", block.id) ||  block.id == localStorage.getItem("ship3Id3", block.id) ){
                    block.style.backgroundColor = "green";
                    hitCounterElem.innerHTML = "Score: " + hitCounter;
                }
                if(block.style.backgroundColor == "green"){
                    hitCounter++;     
                    hitCounterElem.innerHTML = "Score: " + hitCounter;
                }
            });
        }
    }
}

function placingBoard(){
    let battleship = document.getElementById("placingships");
    let ship1 = document.getElementById("shipsBtn1");
    let ship2 = document.getElementById("shipsBtn2");
    let ship3 = document.getElementById("shipsBtn3");
    let counter = 0;

    for(let i = 0;i <= 9;i++){
        for(let j = 0;j <= 9;j++){
            let block = document.createElement("div");
            battleship.appendChild(block);
            
            block.id = counter++;
            
            let xBlock = i * 40;
            let yBlock = j * 40; 
            
            block.style.top = xBlock + "px";
            block.style.left = yBlock + "px";
            block.style.backgroundColor = "aqua";
            
            ship1.addEventListener("click", () => {
                block.id = Math.floor(Math.random() * 100);
                console.log("ran: " + Math.floor(Math.random() * 100));
                localStorage.setItem("id", block.id);
                console.log(block.id);
            });
            block.addEventListener("click", () => {
                let next = block.nextElementSibling;
                let prev = block.previousElementSibling;
                localStorage.setItem("prevId", prev.id);
                localStorage.setItem("id", block.id);
                localStorage.setItem("nextId", next.id);
                // block.style.display = "hidden";
                block.style.backgroundColor= "orange";
                prev.style.backgroundColor= "orange";
                next.style.backgroundColor= "orange";
                
                console.log(block.id);
            });

            ship2.addEventListener("click", () => {
                block.id = Math.floor(Math.random() * 100);
                let next = block.nextElementSibling;
                
                localStorage.setItem("ship2Id2", block.id);
                localStorage.setItem("ship2Id3", next.id);
                
                console.log(next.id);
            });

            ship3.addEventListener("click", () => {
                block.id = Math.floor(Math.random() * 100);
                let next = block.nextElementSibling;
                let prev = block.previousElementSibling;
                localStorage.setItem("ship3Id1", prev.id);
                localStorage.setItem("ship3Id2", block.id);
                localStorage.setItem("ship3Id3", next.id);
                console.log("next: " + next.id)
                
                console.log(next.id);
            });

        }
    }
}