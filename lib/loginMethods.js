/**
 * Created by sebastian on 13.07.17.
 */



export function validateEmail(mail){
     return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail) ? null : 'error';

}

export function validateName(name){
    return /^[A-ÆØÅa-æøå\s]+$/.test(name) ? null : 'error'
}

export function validatePhoneNr(pNr){
    return /^\d{8}$/.test(pNr) || pNr === '' ? null : 'error';
}

export function validatePass(pass){
    return /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(pass) ? null : 'error';
}

export function passMatch(pass, pass2){
    return pass === pass2;
}

export function register(email, pass, pass2, fName, lName, pNr){

    return ((validateName(lName) || validateName(fName) || validateEmail(email) ||
        validatePhoneNr(pNr) || validatePass(pass)) === null && passMatch(pass, pass2));
}
