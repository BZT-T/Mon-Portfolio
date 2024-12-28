// Attendre que le DOM soit complètement chargé avant d'exécuter le script
document.addEventListener("DOMContentLoaded", function() {
    // Récupérer les paramètres de l'URL
    const params = new URLSearchParams(window.location.search);

    // Obtenir l'ID du projet à partir des paramètres de l'URL
    const projectId = parseInt(params.get("id"), 10);

    // Vérifier si l'ID du projet est valide
    if (isNaN(projectId)) {
        console.error("ID de projet invalide ou manquant");
        return;
    }

    // Charger le fichier JSON contenant les données des projets
    fetch('../Projets.json')
        .then(response => {
            // Vérifier si la réponse est valide
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération du fichier JSON');
            }
            return response.json(); // Convertir la réponse en JSON
        })
        .then(data => {
            const projects = data.projets;

            // Vérifier si les données sont bien un tableau
            if (Array.isArray(projects)) {
                // Trouver le projet correspondant à l'ID
                const project = projects.find(p => p.id === projectId);

                // Vérifier si le projet a été trouvé
                if (project) {
                    // Mettre à jour le contenu de la page avec les informations du projet
                    document.getElementById("project-title").textContent = project.titre;
                    document.getElementById("project-text").innerHTML = project.texte;

                    // Ajouter les jetons dans project-skills
                    const skillsContainer = document.getElementById("project-skills");
                    skillsContainer.innerHTML = ""; // Vider le conteneur actuel
                    project.jetons.forEach(skill => {
                        const skillElement = document.createElement("p");
                        skillElement.className = "skill"; // Ajouter la classe "skill"
                        skillElement.textContent = skill;
                        skillsContainer.appendChild(skillElement); // Ajouter au conteneur
                    });
                    const videoElement = document.getElementById("project-video");
                    const sourceElement = videoElement.querySelector("source");
                    // Modifier la source de la vidéo
                    sourceElement.src = project.urlVideo;

                    // Recharger la vidéo pour que la nouvelle source soit prise en compte
                    videoElement.load();
                } else {
                    console.error("Projet non trouvé");
                }
            } else {
                console.error("Les données JSON ne sont pas un tableau");
            }
        })
        .catch(error => {
            // Gérer les erreurs de chargement du fichier JSON
            console.error("Erreur lors de la récupération des données : ", error);
        });
});
