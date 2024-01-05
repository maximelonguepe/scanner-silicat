export interface Objet {
    id: number;
    referenceProduit: string;
    type: string;
    quantiteOuMl: number;
    prixUnitaire: number;
    // Ajoutez d'autres propriétés si nécessaire
}

export const apiUrl = process.env.REACT_APP_API_URL;

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

export interface Accessoire {
    id: number;
    referenceProduit: string;
    type: string;
    quantiteOuMl: number;
    prixUnitaire: number;
    couleurs: Couleur[];
}

export interface Couleur {
    id: number | null;
    nomCouleur: string;
    metreLineaire: number;
}


export interface UserLogin {
    email: string;
    password: string
}

export interface LoginResponse {
    token: string
}