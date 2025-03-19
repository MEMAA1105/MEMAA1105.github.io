// MAIN DU PROJET. CONTIENT LES FONCTIONS GÉNÉRALES.

// restaure la session précédente

window.onload = (event) => {
  const tableutil = JSON.parse(localStorage.getItem('tableutil')); // récupère la table stockée si présente

  // récupère la table HTML vide pour y insérer les lignes et colomnes permettant de restituer la table stockée
  const temptable = document.getElementById("tableTaches");
  remplirTableVide(tableutil, temptable)

  //data2table(temptable, tableutil);
  majBarre();
  checkEcheance();
}

// rempli une table HTML vide par le nombre de lignes et cellules présentes dans une table JS
function remplirTableVide(tableJS, tableHTML){
  tableJS.forEach((ligne) => {
    let row = tableHTML.insertRow();
    ligne.forEach((cell) => {
      row.insertCell();
    })
  })
  data2table(tableHTML, tableJS);
}

function ligne2data(ligneBody){
  let rowData = [];
    ligneBody.querySelectorAll('td').forEach(cell=>{
        rowData.push(cell.innerText);
      })
    return rowData;
}

// récupère les données depuis un body de table HTML
function table2data(tableBody){
  let tableData = []; // table JS utilisée pour manipuler
  // récupère les lignes de la table, créer une liste pour chaque ligne, puis récupère le contenu pour le mettre dans la ligne correspondante avant de tout envoyer à la table JS
  tableBody.querySelectorAll('tr').forEach(row=>{
    let rowData = [];
    row.querySelectorAll('td').forEach(cell=>{
        rowData.push(cell.innerText);
      })
    tableData.push(rowData);
  });
  return tableData;
}

// transforme la table JS en body de table HTML
function data2table(tableBody, tableData){
  // récupère les données de chaque cellule de la table JS pour les formater en texte afin des les attribuer à la cellule HTML correspondante
  tableBody.querySelectorAll('tr').forEach((ligne, i)=>{  
      let rowData = tableData[i];
      ligne.querySelectorAll('td').forEach((cell, j)=>{
        cell.innerText = rowData[j];
      })
    });
}

// supprime la table HTML passée en paramètre.
function supprimerTable(tableHTML){
  tableHTML.querySelectorAll('tr').forEach((ligne) => {
    tableHTML.deleteRow(ligne);
  })
}

function dosomth(){
  var random = table2data(document.getElementById("tableTaches"));
  random.splice(1,1);
  searchTable();
}