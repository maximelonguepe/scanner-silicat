import Cookies from "js-cookie";
import {isTokenValid} from "./tokenUtils";
import {useNavigate} from "react-router-dom";

export const getTokenFromCookies = () => {

    let token = Cookies.get("token");
    if (token == undefined || !isTokenValid(token)) {

    }
    return token
}

export const tokenPresentAndValid = () => {
    console.log("token :::"+isTokenValid(getTokenFromCookies()));
    return isTokenValid(getTokenFromCookies())
}

