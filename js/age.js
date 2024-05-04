// Fonction pour calculer l'âge à partir de la date de naissance
function calculerAge(dateNaissance) {
    var today = new Date();
    var birthDate = new Date(dateNaissance);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

// Mettre à jour l'élément HTML avec l'âge calculé
var dateNaissance = new Date('2003-03-03'); // Remplacez cette date par votre date de naissance
var ageElement = document.getElementById('age');
ageElement.textContent = calculerAge(dateNaissance);
