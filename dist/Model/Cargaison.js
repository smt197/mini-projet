class Cargaison {
    produits;
    cargaisons;
    constructor(produits) {
        if (produits.length < 1 || produits.length > 10) {
            throw new Error("Une cargaison doit avoir entre 1 et 10 produits.");
        }
        this.produits = produits;
        this.cargaisons = [];
    }
    ajouterCargaison(cargaison) {
        this.cargaisons.push(cargaison);
    }
    listerCargaisons() {
        return this.cargaisons;
    }
    filtrerCargaisonsParType(type) {
        return this.cargaisons.filter(cargaison => cargaison instanceof type);
    }
}
class CargaisonMaritime extends Cargaison {
    constructor(produits) {
        super(produits);
    }
}
class CargaisonAérienne extends Cargaison {
    constructor(produits) {
        super(produits);
    }
}
class CargaisonRoutière extends Cargaison {
    constructor(produits) {
        super(produits);
    }
}
export { Cargaison, CargaisonMaritime, CargaisonAérienne, CargaisonRoutière };
