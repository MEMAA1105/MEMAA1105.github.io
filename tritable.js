// GESTION DU TRI

// récupère la table HTML
const table = document.querySelector('table');

let triDirection = false;

// récupère les headers de la table et leur applique un évènement lors du click, ainsi qu'envoie le numéro de la colomne à la fonction permettant le tri
table.querySelectorAll('th').forEach((header, columnNo)=>{
    header.addEventListener('click', event => {
      triTable(columnNo);
    })
  })

// détecte un clic sur la table, identifie la ligne dans laquelle il a été fait, transfert les données de cette ligne dans les champs d'input de la pop-up pour gérer les tâches et se sert du numéro de la ligne pour définir laquelle doit être affectée.
document.querySelector('table').addEventListener('click', (position) => {
  const ligne = position.target.parentElement.rowIndex
  if(ligne > 0){
    var tableBody = document.getElementById("tableTaches");
    let ligneData = ligne2data(tableBody.rows[ligne-1]);
    document.getElementById('titre').value=ligneData[0];
    document.getElementById('description').value=ligneData[1];
    document.getElementById('echeance').value=ligneData[2];
    document.getElementById('priorite').value=ligneData[3];
    document.getElementById('statut').value=ligneData[4];
    document.getElementById('tachevalide').setAttribute('onclick', 'ajouterTache('+(ligne-1)+')');
    document.getElementById('tachesuppr').setAttribute('onclick', 'supprimerTache('+(ligne-1)+')');
    document.getElementById('titretexte').innerText = 'Modifier ou supprimer une tâche';
    tachesuppr.classList.add('actif');
    openpoptache();
  }
})

function triTable(colomne){
    triDirection = !triDirection; // utilisé pour inverser la direction du tri (croissant/décroissant)
    // récupère le contenu de la table HTML pour l'extraire et le convertir en tableau JS afin de pouvoir le manipuler
    let tableBody = document.getElementById("tableTaches");
    let tableData = table2data(tableBody);
  
    // trie les données extraites, inversant le tri suivant la valeur de triDirection
    tableData.sort((a, b) => {
      return triDirection ? (a[colomne] > b[colomne]) - (a[colomne] < b[colomne]) : (b[colomne] > a[colomne]) - (b[colomne] < a[colomne])
    });
    
    
    // remet les données traitées dans la table.
    data2table(tableBody, tableData);
  }