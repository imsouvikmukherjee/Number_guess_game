let randomNumber = Math.floor(Math.random() * 100) + 1;

const submit = document.querySelector('#subinp');
const input = document.querySelector('#inputnum');

const result = document.querySelector('.results');

const prevguess = document.querySelector('#prevguess');
const remaining = document.querySelector('#remaining');
const loworhigh = document.querySelector('#loworhigh');

const p = document.createElement('p');

let previousGuess = [];
let guessCount = 1;
let playGame = true;


if(playGame){
    submit.addEventListener('click', function(e){
        e.preventDefault();

        const value = parseInt(input.value);
        validation(value);
    })
}

function validation(value){
    if(isNaN(value)){
        loworhigh.innerHTML = "Please provide a valid number";
        loworhigh.setAttribute('class','text-danger text-center');

    }else if(value > 100){
        loworhigh.innerHTML = "Please provide a smaller number than 101";
        loworhigh.setAttribute('class','text-danger text-center');


    } else if(value < 1){
        loworhigh.innerHTML = "Please provide a greater number than 0";
        loworhigh.setAttribute('class','text-danger text-center');

    }else{
        previousGuess.push(value);

        if(guessCount > 9){
            displayguess(value);  
            if (randomNumber === value) { 
                displaymsg(`You guessed right`);
            }else{
                displaymsg(`Game over. Random number was ${randomNumber}`);
            }
            
            endGame();
        }else{
            displayguess(value);
            checkGuess(value);
        }

    }
}

function checkGuess(value){
    if(randomNumber === value){
        displaymsg(`You guessed right`);
        endGame();
    }else if(randomNumber > value){
        displaymsg(`Hint: The number is too small`);
    }else if(randomNumber < value){
        displaymsg(`Hint: The number is too big`);
        
    }

   
}

function displayguess(value){
    input.value = ' ';
    prevguess.innerHTML += `${value},  `;
    guessCount++;

    remaining.innerHTML = `${11 - guessCount}`;
}



function displaymsg(msg){
    if(msg === 'You guessed right'){
        loworhigh.setAttribute('class','text-center text-success');
    }else{
        loworhigh.setAttribute('class','text-center text-warning');

    }
    loworhigh.innerHTML = `<h5>${msg}</h5>`;
    

}

function endGame(){
    input.value = " ";
    input.setAttribute('disabled','');
    submit.setAttribute('disabled','');

    p.classList.add('button');
    p.innerHTML="<h3 id='newgame'>Start new game</h3>";
    p.setAttribute('class','btn btn-success');
    p.style.cursor="pointer";
    result.appendChild(p);
    playGame = false; 
    startGame();
}

function startGame(){
    const newbutton = document.querySelector('#newgame');

    newbutton.addEventListener('click', function(e){
         randomNumber = Math.floor(Math.random() * 100) + 1;
         previousGuess = [];
         guessCount = 1;

         prevguess.innerHTML = '';
         remaining.innerHTML = `${11 - guessCount}`;
         input.removeAttribute('disabled');
         submit.removeAttribute('disabled');
         result.removeChild(p);
         loworhigh.innerHTML = '';
         playGame = true;
         
    })
}