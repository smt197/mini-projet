import { CargaisonMaritime, CargaisonAérienne, CargaisonRoutière, Cargaison } from './Model/Cargaison.js';
import { ProduitAlimentaire, ProduitChimique, ProduitFragile, ProduitIncassable, ProduitMateriel } from './Model/Produit.js';
// Création des produits
const produit1 = new ProduitAlimentaire(1, "Pommes", 35);
const produit2 = new ProduitChimique(2, "Vaccin", 2, 7);
const produit3 = new ProduitFragile(3, "Vase", 3);
const produit4 = new ProduitIncassable(4, "Barre d'acier", 10);
const gestionCargaisons = new Cargaison([produit1, produit2, produit3, produit4]);
/////  Fonction de traitement des cargaisons
function afficherCargaisons(cargaisons) {
    const productList = document.getElementById('product-list');
    'pr';
    if (!productList)
        return;
    productList.innerHTML = '';
    cargaisons.forEach(cargaison => {
        cargaison.produits.forEach(produit => {
            const row = document.createElement('tr');
            row.innerHTML = `
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${produit.libelle}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${produit.poids}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${produit instanceof ProduitChimique ? produit.toxicite : 'pas toxique'}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${produit.constructor.name}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><button class="bg-blue-500 text-white px-1 py-1 rounded btn-view" type="button" data-id="${produit.id}" data-type="${cargaison.constructor.name}">voir</button></td>
        `;
            productList.appendChild(row);
        });
    });
    // Evenement du bouton Detail
    document.querySelectorAll('.table tbody .btn-view').forEach(button => {
        button.addEventListener('click', (event) => {
            console.log(event);
            const target = event.target;
            const produitId = target.getAttribute('data-id');
            const typeCargaison = target.getAttribute('data-type');
            // console.log(produitId);
            afficherDetailsProduit(produitId, typeCargaison);
        });
    });
}
document.getElementById('btn-add')?.addEventListener('click', () => {
    const modal = document.getElementById('modal');
    if (modal)
        modal.classList.remove('hidden');
});
document.getElementById('btn-close-modal')?.addEventListener('click', () => {
    const modal = document.getElementById('modal');
    if (modal)
        modal.classList.add('hidden');
});
document.getElementById('close')?.addEventListener('click', () => {
    const modale = document.getElementById('modal');
    if (modale)
        modale.classList.add('hidden');
});
document.getElementById('type-produit')?.addEventListener('change', (event) => {
    const toxiciteField = document.getElementById('toxicite-field');
    // const selectAer = document.querySelector('#type-cargaison select option ')
    // console.log(selectAer);
    if (!toxiciteField)
        return;
    const typeProduit = event.target.value;
    if (typeProduit === 'ProduitChimique') {
        toxiciteField.classList.remove('hidden');
    }
    else {
        toxiciteField.classList.add('hidden');
    }
});
document.getElementById('form-add-cargaison')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const typeCargaison = document.getElementById('type-cargaison').value;
    const typeProduit = document.getElementById('type-produit').value;
    const libelleProduit = document.getElementById('libelle-produit').value;
    const poidsProduit = parseFloat(document.getElementById('poids-produit').value);
    const toxiciteProduit = parseFloat(document.getElementById('toxicite-produit').value);
    let produit;
    switch (typeProduit) {
        case 'ProduitAlimentaire':
            produit = new ProduitAlimentaire(0, libelleProduit, poidsProduit);
            break;
        case 'ProduitChimique':
            produit = new ProduitChimique(0, libelleProduit, poidsProduit, toxiciteProduit);
            break;
        case 'ProduitMateriel':
            produit = new ProduitMateriel(0, libelleProduit, poidsProduit);
            break;
        case 'ProduitFragile':
            produit = new ProduitFragile(0, libelleProduit, poidsProduit);
            break;
        case 'ProduitIncassable':
            produit = new ProduitIncassable(0, libelleProduit, poidsProduit);
            break;
        default:
            return;
    }
    let cargaison;
    switch (typeCargaison) {
        case 'CargaisonMaritime':
            cargaison = new CargaisonMaritime([produit]);
            break;
        case 'CargaisonAérienne':
            cargaison = new CargaisonAérienne([produit]);
            break;
        case 'CargaisonRoutière':
            cargaison = new CargaisonRoutière([produit]);
            break;
        default:
            return;
    }
    gestionCargaisons.ajouterCargaison(cargaison);
    afficherCargaisons(gestionCargaisons.listerCargaisons());
    const modal = document.getElementById('modal');
    if (modal)
        modal.classList.add('hidden');
    document.getElementById('libelle-produit').value = '';
    document.getElementById('poids-produit').value = '';
    document.getElementById('toxicite-produit').value = '';
    document.getElementById('type-cargaison').value = '';
    document.getElementById('type-produit').value = '';
    document.getElementById('toxicite-field').classList.remove('hidden');
});
document.getElementById('btn-list')?.addEventListener('click', () => {
    afficherCargaisons(gestionCargaisons.listerCargaisons());
});
document.getElementById('btn-filter-maritime')?.addEventListener('click', () => {
    afficherCargaisons(gestionCargaisons.filtrerCargaisonsParType(CargaisonMaritime));
});
document.getElementById('btn-filter-aerienne')?.addEventListener('click', () => {
    afficherCargaisons(gestionCargaisons.filtrerCargaisonsParType(CargaisonAérienne));
});
document.getElementById('btn-filter-routiere')?.addEventListener('click', () => {
    afficherCargaisons(gestionCargaisons.filtrerCargaisonsParType(CargaisonRoutière));
});
//---------------Fonction Voir Detail-------------------------------------------------
function afficherDetailsProduit(produitId, typeCargaison) {
    if (!produitId || !typeCargaison)
        return;
    const produit = gestionCargaisons.listerCargaisons().flatMap(cargaison => cargaison.produits).find(p => p.id.toString() === produitId);
    if (!produit)
        return;
    const modal = document.getElementById('modal');
    if (modal) {
        modal.classList.remove('hidden');
        // modal.classList.add('disabled');
        // Remplir les détails du produit dans le modal
        document.getElementById('type-cargaison').value = typeCargaison;
        document.getElementById('type-produit').value = produit.constructor.name;
        document.getElementById('libelle-produit').value = produit.libelle;
        document.getElementById('poids-produit').value = produit.poids.toString();
        const toxiciteField = document.getElementById('toxicite-field');
        if (produit instanceof ProduitChimique) {
            if (toxiciteField)
                toxiciteField.classList.remove('hidden');
            document.getElementById('toxicite-produit').value = produit.toxicite.toString();
        }
        else {
            if (toxiciteField)
                toxiciteField.classList.add('hidden');
        }
    }
}
// Attacher les événements de clic aux boutons "voir"
document.querySelectorAll('.table tbody .btn-view').forEach(button => {
    button.addEventListener('click', (event) => {
        const target = event.target;
        const produitId = target.getAttribute('data-id');
        const typeCargaison = target.getAttribute('data-type');
        afficherDetailsProduit(produitId, typeCargaison);
    });
});
// console.log(cargaisonMaritime);
// console.log(cargaisonAérienne);
// console.log(cargaisonRoutière);
