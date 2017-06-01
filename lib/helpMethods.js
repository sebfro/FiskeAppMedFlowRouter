/**
 * Created by Sebastian on 02.06.2017.
 */

//Sjekk om string har tall i seg
export function hasNumbers(s){
    let regex = /\d/g;
    return regex.test(s);
}

export function backToIndex(event){
    event.preventDefault();
    FlowRouter.go("index");
}