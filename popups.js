// GESTION DES POP-UPS

// Applique ou retire le statut 'actif' afin que le CSS sache s'il doit afficher la pop-up ou non
function openpoptache() {
    poptache.classList.add('actif');
    overlay.classList.add('actif');
  }
  
function closepoptache() {
    poptache.classList.remove('actif');
    overlay.classList.remove('actif');
    tachesuppr.classList.remove('actif');
    document.getElementById('titre').value="";
    document.getElementById('description').value="";
    document.getElementById('echeance').value="";
    document.getElementById('priorite').value="(3) Basse";
    document.getElementById('statut').value="En cours";
    document.getElementById('titretexte').innerText = 'Ajouter une tâche'
    document.getElementById('tachevalide').setAttribute('onclick', 'ajouterTache(-1)'); // évites de garder la valeur de la case cliquée après avoir quitté le menu, ce qui pourrait entraîner une modification au lieu d'un ajout si l'utilisateur clique sur une case, quitte, et tente d'en ajouter une.
    majBarre();

    // réinitialise la recherche avant de sauvegarder la table HTML, pour éviter que la table sauvegardée soit celle générée par la recherche. Réapplique la recherche ensuite.
    let searchvalue = document.getElementById("searchBar").value;
    document.getElementById("searchBar").value = '';
    searchTable();
    localStorage.setItem('tableutil', JSON.stringify(table2data(document.getElementById("tableTaches"))));
    document.getElementById("searchBar").value = searchvalue;
    searchTable();
}
  
function closepopecheance() {
    popecheance.classList.remove('actif');
    document.getElementById("popecheance-body").innerHTML = ''
}

// récupère le body de la table HTML pour y insérer les valeurs contenues dans les champs d'inputs avant de repasser les champs à leur valeur par défaut.
function ajouterTache(ligne){
    var table = document.getElementById("tableTaches");
    var row;
    var oldline = table2data(document.getElementById("tableTaches"))[ligne];
    // détermine si il faut modifier une ligne ou en ajouter une nouvelle
    if(ligne >= 0){
      table.deleteRow(ligne);
      row = table.insertRow(ligne);
    }
    else{
      row = table.insertRow(table.length)
    }
    
    // Ces replace servent de protection basique contre l'execution de code html dans les champs de la table
    document.getElementById('titre').value = document.getElementById('titre').value.replaceAll("<", "&lt;");
    document.getElementById('description').value = document.getElementById('description').value.replaceAll("<", "&lt;");
    document.getElementById('titre').value = document.getElementById('titre').value.replaceAll(">", "&gt;");
    document.getElementById('description').value = document.getElementById('description').value.replaceAll(">", "&gt;");
    
    row.innerHTML = `<td>${document.getElementById('titre').value}</td><td>${document.getElementById('description').value}</td><td>${document.getElementById('echeance').value}</td><td>${document.getElementById('priorite').value}</td><td>${document.getElementById('statut').value}</td>`;
    
    if(alreadysearched && oldline != undefined){
      editsearch(oldline,ligne2data(row));
    }
    else if(alreadysearched){
      ajoutersearch(ligne2data(row));
    }

    closepoptache();
}

// supprime la ligne de la table HTML à l'index passé.
function supprimerTache(ligne){
  if(alreadysearched){
  deletesearch(table2data(document.getElementById("tableTaches"))[ligne]);
  }
  
  document.getElementById("tableTaches").deleteRow(ligne);
  closepoptache();
}