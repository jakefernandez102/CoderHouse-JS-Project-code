import { validateUser } from './api.js';
import { printAlert } from './helpers/alert.js';



const user = {};


const formulario = document.querySelector( '#formulario' );

formulario.addEventListener( 'submit', ( e ) => {
    e.preventDefault();

    user.name = document.querySelector( '#name' ).value;
    user.phoneNumer = document.querySelector( '#phone' ).value;
    user.birthDate = document.querySelector( '#bdate' ).value;
    user.rol = document.querySelector( '#rol' ).value;
    user.email = document.querySelector( '#email' ).value;
    user.password = document.querySelector( '#password' ).value;
    user.token = generateToken();
    user.primeraSesion = true;


    if ( validateRegisterForm( user ) ) {
        createUser( user );
    }

} );

function validateRegisterForm ( user ) {

    const confirmPassword = document.querySelector( '#confirm-password' ).value;

    for ( const key in user ) {

        if ( user[ key ] === '' ) {
            printAlert( `${ key } is required`, 'error' );
            return false;
        }
        if ( key === 'password' && confirmPassword !== user[ 'password' ] ) {
            printAlert( `Passwords does not match`, 'error' );
            return false;
        }



    }

    return true;

};

function createUser () {

    validateUser( user );

};

function generateToken () {
    const random = Math.random().toString( 36 ).substring( 2 );
    const fecha = Date.now().toString( 36 );
    let counter;
    let token = ( random + fecha );

    do {
        token += ( random + fecha );

        counter++;
    } while ( counter === 50 );

    return token;
}
console.log( generateToken() );