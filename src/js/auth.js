import { validateLogin } from './api.js';
import { printAlert } from './helpers/alert.js';



const formularioLogin = document.querySelector( '#formulario-login' );


formularioLogin.addEventListener( 'submit', ( e ) => {
    e.preventDefault();


    const userEmail = document.querySelector( '#email' ).value;
    const userPassword = document.querySelector( '#password' ).value;

    validateLoginForm( userEmail, userPassword );
} );


function validateLoginForm ( userEmail, userPassword ) {

    if ( userEmail === '' || userPassword === '' ) {
        printAlert( 'Email and Password are required', 'error' );
        return;
    }


    validateLogin( userEmail, userPassword );

}



