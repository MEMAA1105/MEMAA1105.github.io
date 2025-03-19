// GESTION DE LA RECHERCHE

// raffraichi la recherche à chaque input
var searchbar = document.getElementById("searchBar");
searchbar.addEventListener("input", (event) => {
    searchTable();
});

// converti la table HTML en table JS pour comparer le titre de chaque ligne avec la valeur de la barre de recherche, supprime la table HTML et y insère les lignes correspondantes.
// la table initiale est sauvegardée pour être restaurée après une recherche et avant la suivante.

var alreadysearched = false;
var tableJS;

function searchTable() {
    var tableHTML = document.getElementById("tableTaches");
    var search = document.getElementById("searchBar").value;
    var tableSearched = [];
  
    if(search!=''){
        // vérifie si une recherche a déjà été effectuée pour éviter de sauvegarder la table modifiée par la recherche, et ainsi garder la table initiale.
        if(!alreadysearched){
            tableJS = table2data(document.getElementById("tableTaches"));
            alreadysearched = true;
        }
        else{
            supprimerTable(tableHTML);
            remplirTableVide(tableJS, tableHTML);
        }
    
        // parcours les lignes de la tableHTML transformée en tableJS, et construit une nouvelle table contenant les lignes dont le titre commence par la recherche.
        table2data(document.getElementById("tableTaches")).forEach((ligne) => {
        if(ligne[0].startsWith(search)){
            tableSearched.push(ligne);
        }
        })

        supprimerTable(tableHTML);
        remplirTableVide(tableSearched, tableHTML);
    }
    // rétablie la table d'origine si une recherche a déjà été effectuée
    else if(alreadysearched){
        supprimerTable(tableHTML);
        remplirTableVide(tableJS, tableHTML);
        alreadysearched = false;
        majBarre();
    }
}

// Fonctions permettant de retranscrire l'ajout, modification, et suppression faites lors d'une recherche sur la table initiale.

function ajoutersearch(addedLine){
    tableJS.push(addedLine);
}

function editsearch(searchedLine, modifiedLine){
    tableJS.forEach((ligne, i) => {
    if(JSON.stringify(searchedLine) == JSON.stringify(ligne)){
        tableJS[i] = modifiedLine;
    }
  })
}

function deletesearch(searchedLine){
    tableJS.forEach((ligne,i) => {
        if(JSON.stringify(searchedLine) == JSON.stringify(ligne)){
        tableJS.splice(i,1);
    }
  })
}