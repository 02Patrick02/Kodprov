document.body.onload = init;  

let hitCounter = 0;    
let hitCounterElem = document.getElementById("hitCounter");

function init(){
    guessingBoard();
    placingBoard();

    window.localStorage.clear();
}


function guessingBoard(){
    let guess = document.getElementById("guess");
    let counter = 0;
    
    for(let i = 0;i <= 9;i++){ //Creating x blocks for gameboard
        for(let j = 0;j <= 9;j++){ //Creating y blocks for gameboard
            let block = document.createElement("div");
            guess.appendChild(block);

            block.id = counter++;
            
            let xBlock = i * 40; //size for the blocks
            let yBlock = j * 40; 
            
            block.style.top = xBlock + "px";
            block.style.left = yBlock + "px";
            block.style.backgroundColor = "aqua";
            
            block.addEventListener("click", () => {
                block.style.backgroundColor = "red";

                if(block.style.backgroundColor == "green"){ //return if already clicked
                    return;
                }

                //getting the saved value from localstorage
                if(block.id == localStorage.getItem("id", block.id) ||  
                block.id == localStorage.getItem("clickId", block.id) || 
                block.id == localStorage.getItem("nextId", block.id) ||  
                block.id == localStorage.getItem("prevId", block.id) ){
                    block.style.backgroundColor = "green";
                }

                //getting value for button 2 from localstorage
                if(block.id == localStorage.getItem("ship2Id1", block.id) ||
                   block.id == localStorage.getItem("ship2Id2", block.id) ){
                    block.style.backgroundColor = "green";
                }

                //button 3
                if(block.id == localStorage.getItem("ship3Id1", block.id) || 
                block.id == localStorage.getItem("ship3Id2", block.id) ||  
                block.id == localStorage.getItem("ship3Id3", block.id) ){
                    block.style.backgroundColor = "green";
                }

                //adding score
                if(block.style.backgroundColor == "green"){
                    hitCounter++;     
                    hitCounterElem.innerHTML = "Score: " + hitCounter;
                }
            });
        }
    }
}

function placingBoard(){
    let place = document.getElementById("placingships");
    let ship1 = document.getElementById("shipsBtn1");
    let ship2 = document.getElementById("shipsBtn2");
    let ship3 = document.getElementById("shipsBtn3");
    
    let counter = 0;
    
    for(let i = 0;i <= 9;i++){
        for(let j = 0;j <= 9;j++){
            let block = document.createElement("div");
            place.appendChild(block);
            
            block.id = counter++;
            
            let xBlock = i * 40;
            let yBlock = j * 40; 
            
            block.style.top = xBlock + "px";
            block.style.left = yBlock + "px";
            block.style.backgroundColor = "aqua";
            
            ship1.addEventListener("click", () => {
                block.id = Math.floor(Math.random() * 100); //getting random id form 1-100
                localStorage.setItem("id", block.id); //saving value in local storage
            });

            //hovering over gameboard to indicate placement
            block.addEventListener("mouseenter", () => { 
                let next = block.nextElementSibling; 
                let prev = block.previousElementSibling;

                if(placementIsValid(block)){
                    block.style.backgroundColor = "pink";
                    prev.style.backgroundColor = "pink";
                    next.style.backgroundColor = "pink";
                }else{
                    block.style.backgroundColor = "red";
                    prev.style.backgroundColor = "red";
                    next.style.backgroundColor = "red";
                }
            });

            //reseting color after leaving gameboard
            block.addEventListener("mouseleave", () => {
                let next = block.nextElementSibling;
                let prev = block.previousElementSibling;

                next.style.backgroundColor = "aqua";
                prev.style.backgroundColor = "aqua";
                block.style.backgroundColor = "aqua";
            });

            //if placement is not valid, dont save value else save it in localstorage
            block.addEventListener("click", () => {
                if(!placementIsValid(block)){ 
                    return;
                }

                let next = block.nextElementSibling;
                let prev = block.previousElementSibling;

                localStorage.setItem("prevId", prev.id);
                localStorage.setItem("id", block.id);
                localStorage.setItem("nextId", next.id);
                
                block.style.backgroundColor= "orange";
                prev.style.backgroundColor= "orange";
                next.style.backgroundColor= "orange";
            });

            //button 2
            ship2.addEventListener("click", () => {
                block.id = Math.floor(Math.random() * 100);
                
                let next = block.nextElementSibling;

                next.id = block.id++;

                localStorage.setItem("ship2Id1", block.id);
                localStorage.setItem("ship2Id2", next.id);
            });

            //button 3
            ship3.addEventListener("click", () => {
                block.id = Math.floor(Math.random() * 100);
                let next = block.nextElementSibling;
                let prev = block.previousElementSibling;
                
                next.id = block.id++;
                prev.id = block.id++;

                localStorage.setItem("ship3Id1", prev.id);
                localStorage.setItem("ship3Id2", block.id);
                localStorage.setItem("ship3Id3", next.id);
            });
        }
    }
}

//checks if placement is valid or not
function placementIsValid(block){
    return !(block.id % 10 < 1 || block.id % 10 > 8);
}