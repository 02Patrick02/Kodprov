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
                //return if already clicked
                if(block.style.backgroundColor == "green"){ 
                    return;
                }
                
                block.style.backgroundColor = "red";

                //getting the saved value from localstorage
                if(block.id == localStorage.getItem(block.id, block.id)){
                    block.style.backgroundColor = "green";
                }

                //adding score
                if(block.style.backgroundColor == "green"){
                    hitCounter++;     
                    hitCounterElem.innerHTML = "Score: " + hitCounter;
                }
                if(hitCounter >= 15){
                    hitCounterElem.innerHTML = "You won";
                }
            });
        }
    }
}

function placingBoard(){
    let place = document.getElementById("place");
    let ship1 = document.getElementById("shipsBtn1");
    let ship2 = document.getElementById("shipsBtn2");
    let ship3 = document.getElementById("shipsBtn3");
    let ship4 = document.getElementById("shipsBtn4");
    let ship5 = document.getElementById("shipsBtn5");
    
    ship2.style.display = "none";
    ship3.style.display = "none";
    ship4.style.display = "none";
    ship5.style.display = "none";
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
                block.addEventListener("mouseenter", () => { 
                    block.style.backgroundColor = "blue";
                });
                
                //reseting color after leaving gameboard
                block.addEventListener("mouseleave", () => {
                    block.style.backgroundColor = "aqua";
                });

                //if placement is not valid, dont save value else save it in localstorage
                block.addEventListener("click", () => {
                    localStorage.setItem(block.id, block.id);
   
                    ship1.style.display = "none";
                    ship2.style.display = "block";
                    block.style.backgroundColor = "orange";
                });
            });
            
            //button 2
            ship2.addEventListener("click", () => {
                block.addEventListener("mouseenter", () => { 
                    let next = block.nextElementSibling;
                    block.style.backgroundColor = "blue";
                    next.style.backgroundColor = "blue";
                });
                
                block.addEventListener("mouseleave", () => {
                    let next = block.nextElementSibling;
    
                    next.style.backgroundColor = "aqua";
                    block.style.backgroundColor = "aqua";
                });
                
                block.addEventListener("click", () => {
                    let next = block.nextElementSibling;
                    
                    localStorage.setItem(block.id, block.id);
                    localStorage.setItem(next.id, next.id);
                    
                    ship2.style.display = "none";
                    ship3.style.display = "block";
                    block.style.backgroundColor = "orange";
                    next.style.backgroundColor = "orange";
                    
                });
            });

            //button 3
            ship3.addEventListener("click", () => {
                block.addEventListener("mouseenter", () => { 
                    let next = block.nextElementSibling; 
                    let prev = block.previousElementSibling;
                    
                    block.style.backgroundColor = "blue";
                    prev.style.backgroundColor = "blue";
                    next.style.backgroundColor = "blue";
                });
                
                block.addEventListener("mouseleave", () => {
                    let next = block.nextElementSibling;
                    let prev = block.previousElementSibling;
    
                    next.style.backgroundColor = "aqua";
                    prev.style.backgroundColor = "aqua";
                    block.style.backgroundColor = "aqua";
                });

                block.addEventListener("click", () => {
                    let next = block.nextElementSibling;
                    let prev = block.previousElementSibling;

                    localStorage.setItem(prev.id, prev.id);
                    localStorage.setItem(block.id, block.id);
                    localStorage.setItem(next.id, next.id);
                    
                    ship3.style.display = "none";
                    ship4.style.display = "block";
                    block.style.backgroundColor = "orange";
                    prev.style.backgroundColor = "orange";
                    next.style.backgroundColor = "orange";
                });
            });
            
            //button 4
            ship4.addEventListener("click", () => {
                block.addEventListener("mouseenter", () => { 
                    let prev = block.previousElementSibling;
                    let prev2 = prev.previousElementSibling;
                    let next = block.nextElementSibling; 
                    
                    prev.style.backgroundColor = "blue";
                    prev2.style.backgroundColor = "blue";
                    block.style.backgroundColor = "blue";
                    next.style.backgroundColor = "blue";
                });
                
                block.addEventListener("mouseleave", () => {
                    let prev = block.previousElementSibling;
                    let prev2 = prev.previousElementSibling;
                    let next = block.nextElementSibling;

                    prev.style.backgroundColor = "aqua";
                    prev2.style.backgroundColor = "aqua";
                    block.style.backgroundColor = "aqua";
                    next.style.backgroundColor = "aqua";
                });
                
                block.addEventListener("click", () => {
                    let prev = block.previousElementSibling;
                    let prev2 = prev.previousElementSibling;
                    let next = block.nextElementSibling;
                    
                    localStorage.setItem(prev.id, prev.id);
                    localStorage.setItem(prev2.id, prev2.id);
                    localStorage.setItem(block.id, block.id);
                    localStorage.setItem(next.id, next.id);
                    
                    ship4.style.display = "none";
                    ship5.style.display = "block";
                    prev.style.backgroundColor = "orange";
                    prev2.style.backgroundColor = "orange";
                    block.style.backgroundColor = "orange";
                    next.style.backgroundColor = "orange";
                });
            });
            
            //button 5
            ship5.addEventListener("click", () => {
                block.addEventListener("mouseenter", () => { 
                    let prev = block.previousElementSibling;
                    let prev2 = prev.previousElementSibling;
                    let next = block.nextElementSibling; 
                    let next2 = next.nextElementSibling; 
                    
                    prev.style.backgroundColor = "blue";
                    prev2.style.backgroundColor = "blue";
                    block.style.backgroundColor = "blue";
                    next.style.backgroundColor = "blue";
                    next2.style.backgroundColor = "blue";
                });
                
                block.addEventListener("mouseleave", () => {
                    let prev = block.previousElementSibling;
                    let prev2 = prev.previousElementSibling;
                    let next = block.nextElementSibling;
                    let next2 = next.nextElementSibling;

                    prev.style.backgroundColor = "aqua";
                    prev2.style.backgroundColor = "aqua";
                    block.style.backgroundColor = "aqua";
                    next.style.backgroundColor = "aqua";
                    next2.style.backgroundColor = "aqua";
                });
                
                block.addEventListener("click", () => {
                    let prev = block.previousElementSibling;
                    let prev2 = prev.previousElementSibling;
                    let next = block.nextElementSibling;
                    let next2 = next.nextElementSibling;
                    
                    localStorage.setItem(prev.id, prev.id);
                    localStorage.setItem(prev2.id, prev2.id);
                    localStorage.setItem(block.id, block.id);
                    localStorage.setItem(next.id, next.id);
                    localStorage.setItem(next2.id, next2.id);
                    
                    ship5.style.display = "none";
                    block.style.backgroundColor = "orange";
                    prev.style.backgroundColor = "orange";
                    prev2.style.backgroundColor = "orange";
                    next.style.backgroundColor = "orange";
                    next2.style.backgroundColor = "orange";
                });
            });
        }
    }
}