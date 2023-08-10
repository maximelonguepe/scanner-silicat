export interface Objet {
    id: number;
    referenceProduit: string;
    type: string;
    quantiteOuMl: number;
    prixUnitaire: number;
    // Ajoutez d'autres propriétés si nécessaire
}

export interface Consommable {
    id: number;
    referenceProduit: string;
    type: string;
    quantiteOuMl: number;
    prixUnitaire: number;
}

export interface Profil {
    id: number;
    referenceProduit: string;
    type: string;
    longueur: number;
    prixMetreLineaire: number;
    quantiteOuMl: number;
    prixUnitaire: number;
    couleurs: Couleur[];
}

export interface Couleur{
    id:number|null;
    nomCouleur:string;
    metreLineaire:number;
}
