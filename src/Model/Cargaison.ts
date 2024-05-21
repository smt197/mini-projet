import { Produit } from "./Produit.js";


class Cargaison {
  produits: Produit[];
  private cargaisons: Cargaison[];

  constructor(produits: Produit[]) {
    if (produits.length < 1 || produits.length > 10) {
      throw new Error("Une cargaison doit avoir entre 1 et 10 produits.");
    }
    this.produits = produits;
    this.cargaisons = [];
  }

  ajouterCargaison(cargaison: Cargaison): void {
    this.cargaisons.push(cargaison);
  }

  listerCargaisons(): Cargaison[] {
    return this.cargaisons;
  }

  filtrerCargaisonsParType(type: Function): Cargaison[] {
    return this.cargaisons.filter(cargaison => cargaison instanceof type);
  }
}

class CargaisonMaritime extends Cargaison {
  constructor(produits: Produit[]) {
    super(produits);
    
  }
}

class CargaisonAérienne extends Cargaison {
  constructor(produits: Produit[]) {
    super(produits);
    
  }
}

class CargaisonRoutière extends Cargaison {
  constructor(produits: Produit[]) {
    super(produits);
    
  }
}

export { Cargaison, CargaisonMaritime, CargaisonAérienne, CargaisonRoutière };
