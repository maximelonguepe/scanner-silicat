import Cookies from "js-cookie";
import {isTokenValid} from "./tokenUtils";
import {useNavigate} from "react-router-dom";
import {getTokenFromCookies} from "./CookiesUtils";

export const setAuthTokenHeader = (headers: Headers) => {
    headers.append('Authorization', `Bearer ${getTokenFromCookies()}`);
}

export const setContentType = (headers: Headers) => {
    headers.append('Content-Type', 'application/json');
}

export const generateHeaderGet = () => {
    const headers = new Headers();
    setAuthTokenHeader(headers);
    return headers;
}

export const generateHeaderPost = () => {
    let headers = new Headers();
    setAuthTokenHeader(headers);
    setContentType(headers);
    return headers;
}
export const generateHeaderDelete = () => {
    let headers = new Headers();
    setAuthTokenHeader(headers);
    setContentType(headers);
    return headers;
}

export const generateHeaderPut = () => {
    let headers = new Headers();
    setAuthTokenHeader(headers);
    setContentType(headers);
    return headers;
}