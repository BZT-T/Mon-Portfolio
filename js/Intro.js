const texteIntro = document.querySelector("#texteIntro");
const curseur = document.querySelector("#curseur");
const accueil = document.querySelector("#accueil");
//const projets = document.querySelector("#html");
const header = document.querySelector("header");

const text = "Bienvenue sur mon site portfolio, scrollez vers le bas pour en apprendre plus sur moi."
let scrollPosition = 0;

function textTypingEffect(element, text, i = 0) {
    
    element.textContent += text[i]

    if (i === text.length - 1) {
        curseur.textContent = ""
        return;
    }

    if (text[i] === ",") {
        setTimeout(() => textTypingEffect(element, text, i+1), 200);
    }else {
        setTimeout(() => textTypingEffect(element, text, i+1), 50);
    }

}

function isElementVisible(element) {
    // Vérifie si l'élément est défini et s'il existe dans le DOM
    if (!element || !element.getBoundingClientRect) {
        return false;
    }
    
    const rect = element.getBoundingClientRect();
    const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
    
    // L'élément est visible si sa position verticale est inférieure ou égale à la hauteur de la fenêtre
    return (rect.bottom <= windowHeight);
}

// Fonction pour afficher un projet lorsqu'il est visible
function showProjectWhenVisible() {
    const projects = document.querySelectorAll('.projet');
    
    projects.forEach((project, index) => {
        // Vérifier si le projet est visible
        if (isElementVisible(project)) {
            if (index % 2 === 0) {
                project.classList.add('even');
            } else {
                project.classList.add('odd');
            }
        }
    });

    // Vérifier si l'utilisateur a fait défiler vers le bas
    if (window.scrollY > scrollPosition) {
        accueil.classList.remove('section'); 
        accueil.classList.add('visible');
        header.classList.add('visible');
    }

    if (window.scrollY > 500) {
        header.querySelector('h1').textContent = ""
    }else{
        header.querySelector('h1').textContent = "Mon Portfolio"
    }
    scrollPosition = window.scrollY 
}

textTypingEffect(texteIntro, text);
window.addEventListener('scroll', showProjectWhenVisible);