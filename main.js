//Variables
let startReset = document.getElementById('startReset');
let scoreValue = document.getElementById('scoreValue');
let timeRemaining = document.getElementById('timeRemaining');
let timeRemainingValue = document.getElementById('timeRemainingValue');
let gameOver = document.getElementById('gameOver');
let correct = document.getElementById('correct');
let wrong = document.getElementById('wrong');
let question = document.getElementById('question');
let boxes = document.querySelectorAll('.box');

let playing = false;
let score;
let action;
let timer;
let correctAnswer;

//évenement click sur le bouton start/reset
startReset.addEventListener('click', onClickStartGame);

//évenement click sur les réponses
for(let i = 0; i < boxes.length; i++){
    boxes[i].addEventListener('click', onClickCheckAnswer);
}

//Fonctions

//initialisation du jeux
function onClickStartGame(){
    //si je decide de jouer
    if(playing == true){
        document.location.reload(); //recharge la page
    } else {//si je ne joue pas
        //changement du mode pour jouer
        playing = true;

        // initialisation  du score
        score = 0;
        scoreValue.innerHTML = score;

        //afficher le temps restant
        show(timeRemaining);
        timer = 60;
        timeRemainingValue.innerHTML = timer;

        //cacher popup Finish Time
        hide(gameOver);

        //changer le bouton start en reset
        startReset.innerHTML = "Reset";

        //Lancement du compteur
        startCountDown();

        //generer une nouvelle question et réponses
        getRandomQA(1, 9);
    }
}

function onClickCheckAnswer(){
    //controle si je joue
    if(playing == true){
        if(this.innerHTML == correctAnswer){
            /***** bonne reponse *****/

            //augmenter le score à chaque bonne réponse
            score++;

            //afficher la mise à jour du score
            scoreValue.innerHTML = score;

            //cacher le message "Mauvaise réponse"
            hide(wrong);

            //afficher le message "Bonne réponse" pour une seconde
            show(correct);
            setTimeout(function(){
                hide(correct);
            }, 1000);

            //générer une nouvelle question et réponses
            getRandomQA(1, 9);

        } else {
            /***** mauvaise réponse *****/

            //cacher le message "Bonne réponse"
            hide(correct);

            //afficher le message "Mauvaise réponse" pour une seconde
            show(wrong);
            setTimeout(function(){
                hide(wrong);
            }, 1000);

        }
    }
}

//Lancer le compteur
function startCountDown(){
    action = setInterval(function(){
        timer -= 1;
        timeRemainingValue.innerHTML = timer;
        if(timer == 0){//Game Over
            //arret du compteur
            stopCountDown();

            //afficher la popup timeleft
            show(gameOver);
            gameOver.innerHTML = "<p>Terminé !</p><p>Ton score est " + score + ".</p>";

            //cacher le compteur
            hide(timeRemaining);

            //cacher le message Bonne reponse
            hide(correct);

            //cacher le message Mauvaise reponse
            hide(wrong);

            //changement de mode
            playing = false;

            //changement du bouton reset en start
            startReset.innerHTML = "Start";
        }
    }, 1000);
}

//stopper le compteur
function stopCountDown(){
    clearInterval(action);
}

//afficher un élément
function hide(selector){
    selector.style.display = "none";
}

//cacher un élément
function show(selector){
    selector.style.display = "block";
}

//generer une question et des reponses
function getRandomQA(min,max){
    //génerer des chiffres au hasard
    let x = getRandomInteger(min, max);
    let y = getRandomInteger(min, max);

    //stocker la bonne réponse dans une variable
    correctAnswer = x * y;

    //afficher la question
    question.innerHTML = x + "x" + y;

    //stocker la bonne réponse dans l'une des 4 box
    let correctPosition = getRandomInteger(min, 3);

    //remplir une box avec la bonne réponse
    document.getElementById("box" + correctPosition).innerHTML = correctAnswer;

    //remplir les autres box avec les mauvaises réponses
    let answers = [correctAnswer];

    for(let i = 1; i <= boxes.length; i++){
        if(i != correctPosition){
            let wrongAnswer;
            do{
                wrongAnswer = getRandomInteger(min, max) * getRandomInteger(min, max);
            } while (answers.indexOf(wrongAnswer) > -1)

            document.getElementById("box" + i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }
    }
}

//generer un chiffre au hasard
function getRandomInteger(min, max){
    let random = Math.random();
    return Math.floor(random * (max - min + 1)) + min;
}