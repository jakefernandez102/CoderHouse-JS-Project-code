import { createRestaurant, getUserRol, isFirstSession, setFirstSession } from './api.js';

const signInNavItem = document.querySelector( '#signin' );
const sellNavItem = document.querySelector( '#sell-food' );
const orderNavItem = document.querySelector( '#order-food' );
const formulario = document.querySelector( '#formulario' );
const saveModalButton = document.querySelector( '#saveModal' );

const modal = new bootstrap.Modal( '#myModal', {
    hide: true
} );

let token = localStorage.getItem( 'token' ) || '';


window.addEventListener( 'load', async () => {

    if ( token.length === 0 ) {

        sellNavItem.setAttribute( 'hidden', '' );
        orderNavItem.setAttribute( 'hidden', '' );


    } else if ( await getUserRol( token ) === '1' ) {
        signInNavItem.textContent = 'Sign Out';
        orderNavItem.setAttribute( 'hidden', '' );


        if ( await isFirstSession( token ) ) {
            modal.show();
        }

    } else {
        signInNavItem.textContent = 'Sign Out';
        sellNavItem.setAttribute( 'hidden', '' );
    }


} );

formulario.addEventListener( 'submit', ( e ) => {

    e.preventDefault();
    setFirstSession( token );
    const nameInput = document.querySelector( '#name' ).value;

    createRestaurant( nameInput, token );

} );



signInNavItem.addEventListener( 'click', () => {

    if ( signInNavItem.textContent === 'Sign Out' ) {
        localStorage.clear();
        window.location.href = 'index.html';
    } else {
        window.location.href = 'login.html';
    }
} );
