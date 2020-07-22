let YourScore = 0;
let DealerScore = 0;
let YouBusted = false;
let DelaerBusted = false;
let wins = 0;
let drawn = 0;
let loses = 0;
const hitSound = new Audio('assets/sounds/swish.m4a');
const winSound = new Audio('assets/sounds/cash.mp3');
const loseSound = new Audio('assets/sounds/aww.mp3');


const gameHit = () =>{
    let Value = generateCards('.your-cards', YourScore);
    playerScoreCard(Value);
    
    hitSound.play()
}

const gameStand = () =>{
    computerPlay()
}


const gameDeal = () =>{
    YourScore = 0;
    DealerScore = 0;
    YouBusted = false;
    DelaerBusted = false;
    document.getElementById('hit').disabled = false;
    document.getElementById('your-score').innerText = "You : 0";
    document.getElementById('your-score').style.color = "#fff";
    document.getElementById('dealer-score').innerText = "Dealer : 0";
    document.getElementById('dealer-score').style.color = "#fff";

    document.getElementById('game-status').innerText ="Let's Play";
    document.getElementById('game-status').style.color ="#fff";

    let yourCards = document.querySelector('.your-cards');
    console.log(yourCards)
    let dealerCards = document.querySelector('.dealer-cards');
    console.log(dealerCards)

    while (yourCards.firstChild) {
        yourCards.removeChild(yourCards.firstChild);
    }

    while (dealerCards.firstChild) {
        dealerCards.removeChild(dealerCards.firstChild);
    }

    /* for ( let i=0; i<yourCards.length; i++){
        yourCards[i].remove();
    }
    for ( let i=0; i<dealerCards.length; i++){
        dealerCards[i].remove();
    } */

}
const cardImage = [
    'A', '2', '3' , '4', '5', '6', '7', '8', '9', '10', 'K', 'Q', 'J'
]

const cardValue ={
    'A':11, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'K': 10, 'Q': 10, 'J': 10
}




const randomNumberGenerator = (max) =>{
    return Math.floor(Math.random() * max)
}

const generateCards = (side, sideScore) =>{
    let randomCardNumber = randomNumberGenerator(13);
    let imageNumber = cardImage[randomCardNumber];
    let Value = 0;
    if(imageNumber === 'A' && (sideScore + 11) > 21 ){
        Value = 1;
    }
    else{
        Value = cardValue[imageNumber];
    }
    console.log(Value);
    let cards = document.querySelector(side);
    let image = document.createElement('img');
    image.src = `assets/images/${imageNumber}.png`
    cards.appendChild(image);
    return Value;

}

const playerScoreCard = (Value) =>{
    const scoreElement = document.getElementById('your-score');
    if( (YourScore + Value) > 21){


        scoreElement.innerText = "!BUSTED";
        scoreElement.style.color = 'red';
        YouBusted = true;
        computerPlay()
        
    }
    else{
        YourScore += Value
        scoreElement.innerText = `You : ${YourScore}`
    }
    

}

const dealerScoreCard = (Value) => {
    const scoreElement = document.getElementById('dealer-score');
    if( (DealerScore + Value) > 21){
        
        scoreElement.innerText = "!BUSTED";
        scoreElement.style.color = 'red';
        DelaerBusted = true;
        let gameResult = [0, 'stop']
        return gameResult;
        
    }
    else if( (DealerScore + Value) > YourScore){
        DealerScore += Value;
        scoreElement.innerText = `Dealer : ${DealerScore}`;
        let gameResult = [1, 'stop']
        return gameResult;
    }
    else if((DealerScore + Value) == 21){
        DealerScore += Value;
        scoreElement.innerText = `Dealer : ${DealerScore}`;
        let gameResult = [3, 'stop']
        return gameResult;
    }

    else{
        DealerScore += Value
        scoreElement.innerText = `Dealer : ${DealerScore}`;
        let gameResult = [2, 'continue']
        return gameResult;
    }
}

const computerPlay = () => {
        document.getElementById('hit').disabled = true;
        let repeat = 'continue';
        repeatCard();

        function repeatCard(){


            setTimeout(() => {
                let Value = generateCards('.dealer-cards', DealerScore);
                hitSound.play();
                repeat = dealerScoreCard(Value);
                console.log(repeat)
                if ( repeat[0] == 0 || repeat[0] ==1 || repeat[0] == 3){
                    getResult(repeat[0])
                    console.log("finish")
                }
                else{
                    running()
                }
            }, 700);
                
            function running(){
                if(repeat[1] === 'continue'){
                    repeatCard()
                }
            }
            
            
        }
        
    
        

}

const getResult = (value)=>{
    gameStatus = document.getElementById('game-status')
    if (value === 0){
        if(YouBusted == true){
            drawn += 1;
            document.getElementById('draw-count').innerText = drawn;
            gameStatus.innerText = "Match Drawn";
            gameStatus.style.color ="#e96834";
        }
        else{
            winSound.play();
            wins += 1;
            document.getElementById('win-count').innerText = wins;
            gameStatus.innerText = "You WON!"
            gameStatus.style.color ="rgb(45, 238, 55)"
        }
    }
    else if(value == 1){
        loseSound.play();
        loses += 1;
        document.getElementById('lose-count').innerText = loses;
        gameStatus.innerText = "YOU LOSE"
        gameStatus.style.color ="red"
    }
    else if(value == 3){
            drawn += 1;
            document.getElementById('draw-count').innerText = drawn;
            gameStatus.innerText = "Match Drawn";
            gameStatus.style.color ="#e96834";
    }
}

