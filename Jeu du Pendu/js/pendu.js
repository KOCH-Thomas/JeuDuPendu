
// DECLARATION VARIABLE POUR METTRE TOUTES NOS VALEURS PAS DEFAUTS SUR NULL POUR PLUS DE FLEXIBILITE
const element = {
    score : null,
    repondre : null,
    choix: null,
};

const rejouer = () =>{
    document.getElementById(rejouer).style.display = block;
}

// DECLARATION VARIABLE VIDES POUR LES RE-ASIGNEES PLUS TARD


let word = '';
let wordMapping = [];

let choix = [];
let choixMapping = [];

let scoreCount = 0;
let scoreMax = 9;






// CENTRE DU CODE
const initialisation = () => {
    // CONSOLE LOG POUR NOTRE VISUEL
    console.log('initialisation');
    // querySelector() retourne le premier Element dans le document correspondant au sélecteur - ou groupe de sélecteurs - spécifié(s)
    // ou null si aucune correspondance n'est trouvée.
    element.score = document.querySelector('#score');
    element.repondre = document.querySelector('#repondre');
    element.choix = document.querySelector('#choix');
    element.audio = document.querySelector('#audio');
    element.categories = document.querySelector('#categories');

    document.querySelector('#select-category').addEventListener('change', (event) => {
        let theme = event.target.value
        // console.log(theme)
        switch(theme){
            case 'villes' :
                theme = villes
                break;
                case 'pays' :
                theme = pays
                break;
            case 'animaux' :
                theme = animaux
                break
        }

        word = pickWord(theme);
        console.log('word', word);
        
        wordMapping = getWordMapping (word);
        // console.log(wordMapping);

        displayWord(wordMapping);
        
        choix = generateChoix();
    // console.log(choix);
    
    choixMapping = getChoixMapping (choix);
    // console.log(choixMapping);

    displayChoix(choixMapping);
    
    //displayScore ();

    element.choix.addEventListener('click', ({ target }) => {
        // event.target => {  target  }                  
        // MoussEvent
        if (target.matches('li')) {
            audioclick.play();
            document.querySelector('#categories').style.display = 'none';
            checkLetter(target.innerHTML);
        }
        
    });
    
    
    document.addEventListener('keydown', ({ keyCode }) =>{
        // event.target => {  target  }
        // KeyboardEvent
        const letter = String.fromCharCode(keyCode);
        if (keyCode >= 65 && keyCode <= 90){
            checkLetter(letter);
        }
    });
})
};






const checkLetter = (letter) =>{
    //console.log(letter);
    let isLetterInWord = false
    let isAllLettersFound = true
    //console.log ('isLetterWord before loop', isLetterInWord);
    wordMapping.forEach((letterMapping) => {
        //console.log('letterMapping.letter', letterMapping.letter);
        if (letterMapping.letter === letter){
            letterMapping.isVisible = true;
            isLetterInWord = true;
        }

        if (!letterMapping.isVisible) {
            isAllLettersFound = false
        }
    });



    choixMapping.forEach((letterMapping) => {
        if (letterMapping.letter === letter) {
            letterMapping.isChosen = true;
        }
    });

    displayChoix(choixMapping);
    if (isLetterInWord === true) {
        displayWord(wordMapping);
    } else {
        scoreCount++;
        displayScore();
    }


    //console.log('isLetterWord after loop', isLetterInWord);

    const endGame = () => {
        if (scoreCount === scoreMax){
            element.repondre.innerHTML = `Le mot à découvrir était " ${word} "`;
            element.choix.innerHTML = `<h1> VOUS ETES MORT </h1>`;
            document.querySelector('.controls').style.display = 'block';
			return (game = false);
        };
    };

    const winGame = () => {
        element.repondre.innerHTML = `Bien joué, vous avez découvert le mot " ${word} "`;
        element.choix.innerHTML = `<h1> VOUS AVEZ SURVECU </h1>`;
        document.querySelector('.controls').style.display = 'block';
			return (game = false);
    };


    if (scoreCount === scoreMax){
        audiolose.play();
        endGame();
    };


    if (isAllLettersFound) {
        audiowin.play();
        winGame();
    };
};

const reset = () => {
    document.location.reload();
};



document.querySelector('#reset').addEventListener('click', function (event) {
	event.preventDefault(); //eviter le comportement par défault du lien
	reset();
});


// L’évènement load est émis lorsqu’une ressource et ses ressources dépendantes sont completement chargées.
window.addEventListener('load', () => {
    initialisation();

});

