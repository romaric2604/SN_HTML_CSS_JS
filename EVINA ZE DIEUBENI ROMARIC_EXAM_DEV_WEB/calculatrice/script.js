const display = document.querySelector("#display");
const but= document.querySelector("#tog");
const buttons = document.querySelectorAll("button");
let ans = 0; // Variable pour stocker la réponse précédente
let isShifted = false; // État du mode Shift


buttons.forEach((item) => {
  item.onclick = () => {
    if (item.id === "clear") {
      display.innerText = "";
    } else if (item.id === "backspace") {
      display.innerText = display.innerText.slice(0, -1);
    } else if (item.id === "equal") {
      try {
        const result = evaluateExpression(display.innerText);
        display.innerText = result;
        ans = result; // Stocke la réponse
      } catch (error) {
        display.innerText = "Math error"; // Gestion des erreurs
      }
    } else if (item.id === "ans") {
      if (display.innerText === "0") {
        display.innerText = ans;
      } else {
        display.innerText += ans; // Ajoute ans si l'affichage n'est pas "0"
      }
    }else if(item.id === "pi"){
      if (display.innerText === "0") {
        display.innerText = Math.PI;
      } else {
        display.innerText += Math.PI; // Ajoute ans si l'affichage n'est pas "0"
      }
    } else if (item.id === "shift") {
      isShifted = !isShifted; // Toggle l'état de Shift
      updateButtonLabels();
    }else if (item.id === "ln") {
      const val_ln = parseFloat(display.innerText);
      if (!isNaN(val_ln)) {
          display.innerText = Math.log(val_ln);
          ans = display.innerText; // Met à jour ans
      } else {
          display.innerText = "Invalid input"; // Gestion des erreurs
      }
  } else if (item.id === "log10") {
      const valeur = parseFloat(display.innerText);
      if (!isNaN(valeur)) {
          display.innerText = Math.log10(valeur);
          ans = display.innerText; // Met à jour ans
      } else {
          display.innerText = "Invalid input"; // Gestion des erreurs
      }
  } else if (item.id === "pourcentage") {
      const val = parseFloat(display.innerText);
      if (!isNaN(val)) {
          display.innerText = val / 100;
          ans = display.innerText; // Met à jour ans
      } else {
          display.innerText = "Invalid input"; // Gestion des erreurs
      }
  } else if (item.id === "inverse") {
      const valeur = parseFloat(display.innerText);
      if (!isNaN(valeur)) {
          display.innerText = (valeur === 0) ? "Infinity" : 1 / valeur;
          ans = display.innerText; // Met à jour ans
      } else {
          display.innerText = "Invalid input"; // Gestion des erreurs
      }
    }  
    else {
      const value = parseFloat(display.innerText) || 0; // Évaluer l'expression, ou 0 si vide

      if (item.id === "cos") {
        display.innerText = isShifted ? Math.acos(value) : Math.cos(value);
      } else if (item.id === "sin") {
        display.innerText = isShifted ? Math.asin(value) : Math.sin(value);
      } else if (item.id === "tan") {
        display.innerText = isShifted ? Math.atan(value) : Math.tan(value);
      } else if (item.id === "X2") {
        display.innerText = Math.pow(value, 2);
      } else if (item.id === "Xn") {
        display.innerText = Math.pow(value, 3);
      } else if (item.id === "sqrt") {
        display.innerText = Math.sqrt(value);
      } else if (item.id === "fact") {
        display.innerText = factorial(value);
      } else if (["+", "-", "*", "/"].includes(item.id)) {
        // Assurez-vous que l'utilisateur n'ajoute pas d'opérateurs consécutifs
        if (display.innerText !== "" && !isOperator(display.innerText.slice(-1))) {
          display.innerText += ` ${item.id} `;
        }
      } else {
        // Gérer l'affichage "0" pour les chiffres
        if (display.innerText === "0") {
          display.innerText = item.id; // Remplace "0" par le nouveau chiffre
        } else {
          display.innerText += item.id; // Ajoute le chiffre
        }
      }
    }
  };
});

function evaluateExpression(expression) {
  let result = eval(expression);
  return result;
}

function isOperator(char) {
  return ["+", "-", "*", "/"].includes(char);
}

function updateButtonLabels() {
  buttons.forEach((button) => {
    if (button.id === "sin") {
      button.innerText = isShifted ? "sin⁻¹" : "sin";
    } else if (button.id === "cos") {
      button.innerText = isShifted ? "cos⁻¹" : "cos";
    } else if (button.id === "tan") {
      button.innerText = isShifted ? "tan⁻¹" : "tan";
    }
  });
}

// Fonction pour calculer la factorielle
function factorial(n) {
  if (n < 0) return "Invalid input";
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
}
const themeToggleBtn = document.querySelector(".theme-toggler");
const calculator = document.querySelector(".calculator");
const toggleIcon = document.querySelector(".toggler-icon");
let isDark = true;
themeToggleBtn.onclick = () => {
  calculator.classList.toggle("dark");
  themeToggleBtn.classList.toggle("active");
  isDark = !isDark;
};
function on_off() {
  const toggler = document.getElementById("toggler");
  const isActive = toggler.value === "1"; // Vérifie si le bouton est actif

  buttons.forEach((button) => {
    button.disabled = isActive; // Désactive ou active les boutons
  });
display.innerHTML="";
  // Met à jour l'état du bouton de basculement
  toggler.value = isActive ? "0" : "1";
  toggler.innerText = isActive ? "OFF" : "ON"; // Change le texte du bouton
}