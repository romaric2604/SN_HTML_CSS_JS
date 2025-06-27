  // Fonction pour le bouton "Retour en haut"
  const backToTopBtn = document.getElementById('backToTop');
  window.onscroll = () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.style.display = 'block';
    } else {
      backToTopBtn.style.display = 'none';
    }
  };
  document.getElementById('backToTop').onclick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  let skillCounts = {
    html: 0,
    css: 0,
    javascript: 0,
    react: 0,
    node: 0,
    git: 0,
    sql: 0
  };

  function showDescription(skill) {
    const descriptions = {
      html: "HTML (HyperText Markup Language) est le langage standard pour créer des pages web.",
      css: "CSS (Cascading Style Sheets) permet de styliser le contenu HTML.",
      javascript: "JavaScript est un langage de programmation qui permet d'ajouter de l'interactivité aux pages web.",
      react: "React est une bibliothèque JavaScript pour construire des interfaces utilisateur.",
      node: "Node.js est un environnement d'exécution pour JavaScript côté serveur.",
      git: "Git est un système de contrôle de version pour suivre les modifications dans le code.",
      sql: "SQL (Structured Query Language) est utilisé pour gérer et manipuler des bases de données."
    };

    // Afficher la description
    const descDiv = document.getElementById('description');
    descDiv.innerText = descriptions[skill];
    descDiv.style.display = 'block';

    // Incrémenter le compteur
    skillCounts[skill]++;
    updateSkillCounts();
  }

  function updateSkillCounts() {
    const viewedSkills = document.getElementById('viewed-skills');
    viewedSkills.innerHTML = '';
    for (const skill in skillCounts) {
      const count = skillCounts[skill];
      viewedSkills.innerHTML += `<li>${skill.toUpperCase()} (${count} clics)</li>`;
    }
    localStorage.setItem('skillCounts', JSON.stringify(skillCounts));
  }

  // Charger les compteurs depuis localStorage
  window.onload = () => {
    const saved = localStorage.getItem('skillCounts');
    if (saved) {
      skillCounts = JSON.parse(saved);
      updateSkillCounts();
    }
  };