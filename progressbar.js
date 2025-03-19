// GESTION DE LA BARRE DE PROGRESSION

let maxBarre = 100;
let progressBar = document.getElementById("progressBar");
progressBar.max = maxBarre;

// converti la tâble HTML en table JS pour en extraire le nombre de tâches terminées, puis mets à jour la barre de progression en fonction.
function majBarre() {
  let tableTaches = table2data(document.getElementById("tableTaches"));
  let tacheFini = 0;
  if(tableTaches.length != 0){
    tableTaches.forEach((ligne) => {
    if(ligne[4] == 'Terminée'){
      tacheFini++;
    }
  })
    valBarre = tacheFini/tableTaches.length*100;
    progressBar.value = valBarre;
    document.getElementById('pourcentage').innerHTML = valBarre.toFixed(2) + "% de tâches terminées (" + tacheFini + "/" + tableTaches.length +")";
  }
  else{
    document.getElementById('pourcentage').innerHTML = "% de tâches terminées";
  }
}

// Vérifie toutes les tâches de la table pour trouver celles en cours dont l'échéance est proche avant de les mettre dans la notification qui apparaît ensuite.
function checkEcheance() {
  let nbjours = 2; // Nombre de jours dans le futur à vérifier (1 = juste aujourd'hui, 2 = aujourd'hui + demain etc...)
  let aujourdhui = new Date(new Date().toDateString()).getTime()/86400000; // Prends la date d'aujourd'hui et remet l'heure à 00:00 afin que l'heure ne soit pas prise en compte lors de la comparaison future (ce qui permet d'obtenir une notification pour les échéances ayant lieu le jour même)
  // getTime() nous donne le temps écoulé en millisecondes entre le 1er Janvier 1970 et la date spécifiée. On divise donc par 86400000 qui est le nombre de ms en une journée, pour pouvoir comparer par interval de journées.
  table2data(document.getElementById("tableTaches")).forEach((ligne) => {
    let checkDate = new Date(ligne[2]).getTime()/86400000;
    if(checkDate >= aujourdhui && checkDate - aujourdhui < nbjours && ligne[4] == "En cours"){
      document.getElementById("popecheance-body").innerHTML += ligne[2] + "<ul><li>" + ligne[0] + ""
      popecheance.classList.add('actif');
    }
  })
}