let audioclick = document.querySelector('#audioclick')
audioclick.volume = 0.3
let audiolose = document.querySelector('#audiolose')
audiolose.volume = 0.1
let audiowin = document.querySelector('#audiowin')
audiowin.volume = 0.1

/*** 
// DECLARATION DE 'GetRandomInt' POUR CHOISIR UN NUMERO ALEATOIRE QUI NOUS DONNERA L'INDEX DE LARRAY .. QUI NOUS RETOURNERA UN MOT

* Renvoie un nombre entier aléatoire entre min (inclus) et max (inclus).
* La valeur n’est pas inférieure à min (ou l’entier suivant est supérieur à min si min n’est pas un nombre entier) 
  et pas plus grand que max (ou le nombre entier suivant inférieur à max si max n’est pas un entier).
* L’utilisation de Math.round() vous donnera une distribution non uniforme!
*/

function play() {
    var audioclick = document.getElementById("audioclick");
    audioclick.play();

    var audiolose = document.getElementById("audiolose");
    audiolose.play();

    var audiowin = document.getElementById("audiowin");
    audiowin.play();


  }



const getRandomInt = (min, max) => {
    // La fonction Math.ceil() retourne le plus petit entier qui est supérieur ou égal au nombre donné.
    min = Math.ceil(min);

    // La fonction Math.floor() renvoie le plus grand entier qui est inférieur ou égal au nombre donné.
    max = Math.floor(max);

    // La fonction Math.random() renvoie un nombre flottant pseudo-aléatoire
    // compris dans l'intervalle [0, 1[ (ce qui signifie que 0 est compris dans l'intervalle mais que 1 en est exclu) 
    // selon une distribution approximativement uniforme sur cet intervalle. 
    // Ce nombre peut ensuite être multiplié afin de couvrir un autre intervalle. 
    // La graine (seed) du générateur est choisie par l'algorithme et ne peut pas être choisie ou réinitialisée par l'utilisateur.
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// CHOISIR UN NUMERO AU HASARD DANS LE TABLEAU 'Words' QUI AFFICHERA LE MOT QUI CONTIENT CE NUMERO
const pickWord = (arr) => {
    // Réutilisation de la fonction ci dessus GetRandomInt, avec la longueur de notre tableau
    // FR > PRENDRE UN NUMERO ALEATOIRE PARMIS TOUTE LA LONGUEUR DU TABLEAU
    const randomIndex = getRandomInt(0, arr.length - 1);
    return arr[randomIndex]; 
};


// const pickWord = words[getRandomInt(0, words.length - 1)]
// GENERATION DU MAPPING POUR LE MOT CHOISI AU HASARD
const getWordMapping = (word) => {

    // La méthode split() permet de diviser une chaîne de caractères à partir d'un séparateur pour fournir un tableau de sous-chaînes.
    const wordArr = word.split('');

    console.log('word', word);
    console.log('wordArr', wordArr);

    // La méthode map() crée un nouveau tableau avec les résultats de l'appel d'une fonction fournie sur chaque élément du tableau appelant.
    // Letter car on veux recevoir une lettre
    const wordMapping = wordArr.map((letter) => {
        return {
            letter,
            isVisible: false
        };
    });
    return wordMapping;
};


// GENERATION DU CLAVIER VIRTUELLE
const generateChoix = () => {
    const choix = [];

    // Talbeau qui parcours les ASCII DE WINDOWS pour afficher les lettres de l'alphabet en MAJUSCULE 
    // ASCII - Binary Character Table
    // 65 = A > 90 = Z

    for(let index = 65; index <= 90; index++){
        // La méthode statique String.fromCharCode() renvoie une chaîne de caractères créée à partir de points de code UTF-16.
        // Ce qui nous permet a partir de notre code ASCII de récupéré notre valeur sous forme de STRING .. Donc sous forme de lettre
        choix.push(String.fromCharCode(index))
    }
    return choix;
};

// GENERATION DU MAPPING POUR LE CLAVIER VIRTUELLE
const getChoixMapping = (choix) => {

    // La méthode map() crée un nouveau tableau avec les résultats de l'appel d'une fonction fournie sur chaque élément du tableau appelant.
    // Letter car on veux recevoir une lettre
    const choixMapping = choix.map((letter) => {
        return {
            letter, 
            isChosen: false
        };
    });
    return choixMapping;
};


// AFFICHAGE DE MOT A TROUVER
const displayWord = (wordMapping) => {
    // ChoixHtml > Récupération un HTML de notre Fonction
    // La méthode map() crée un nouveau tableau avec les résultats de l'appel d'une fonction fournie sur chaque élément du tableau appelant.
    // Dans WordMapping, on retrouve a chaques fois une lettre
    const wordHtml = wordMapping.map((letterMapping) => {
        // Si Letter Mapping === true
        // TRUE EST PAR DEFAUT DE BASE CAR BOOLEEN
        if (letterMapping.isVisible === true) {
            // ALORS ON AFFICHE LA LETTRE
            return `<li>${letterMapping.letter}</li>`;
        } // SINON ON REMPLACE PAR UN UNDERSCORE
        else{
            return `<li>_</li>`;
        }
    })
    // TARGET LE UL POUR RAJOUTER DANS LE HTML LE "wordHtml"
    element.repondre.querySelector('ul').innerHTML = wordHtml.join('');
    console.log('wordHtml', wordHtml);
};


// AFFICHAGE DE CLAVIER VIRTUELLE
const displayChoix = (choixMapping) => {

    // ChoixHtml > Récupération un HTML de notre Fonction
    // La méthode map() crée un nouveau tableau avec les résultats de l'appel d'une fonction fournie sur chaque élément du tableau appelant.
    // Dans ChoixMapping, on retrouve a chaques fois une lettre

    const choixHtml = choixMapping.map((letterMapping) => {
        // Si Letter Mapping === false

        if (letterMapping.isChosen === false) {
            // ALORS ON AFFICHE LA LETTRE
            return `<li>${letterMapping.letter}</li>`;
        } // SINON ON ACTIVE UN STYLE DISPLAY NONE  QUI AURA POUR EFFET DE SUPPRIMER SUR LA LETTRE CHOISI
        else{
            return `<li style="display:none">${letterMapping.letter}</li>`
        }
    })
    // TARGET LE UL POUR RAJOUTER DANS LE HTML LE "ChoixHtml"
    element.choix.querySelector('ul').innerHTML = choixHtml.join('');
    console.log('choixHtml', choixHtml);

};



const displayScore = () => {
    element.score.innerHTML = `<img src="./img/svg${scoreCount}.svg" alt="pendu1" />`
};

