import jwt_decode from "jwt-decode";

export const isTokenValid = (token: string) => {
    if (token != undefined) {
        // Votre logique pour vérifier la chaîne de caractères
        let decodedToken = jwt_decode(token);
        console.log("Decoded Token", decodedToken);
        let currentDate = new Date();

        // JWT exp is in seconds
        // @ts-ignore
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
            console.log("Token expired.");
            return false;
        } else {
            console.log("Valid token");
            return true;
        }
    }
    return false;
}