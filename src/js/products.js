import { createProduct, getProducts, getRestaurantName, getRestaurants, updateRestaurant } from './api.js';
import { printAlert } from './helpers/alert.js';


const token = localStorage.getItem( 'token' ) || '';

const formularioProd = document.querySelector( '#formularioProductos' );
const restaurantNameInput = document.querySelector( '#restaurant' );
const tbodyTable = document.querySelector( '#tbody-prod' );
const signInNavItem = document.querySelector( '#signin' );

window.addEventListener( 'load', async () => {

    if ( token.length === 0 ) {

        window.location.href = 'index.html';

    }
    restaurantNameInput.value = await getRestaurantName( token );
    loadTable( token );
} );

formularioProd.addEventListener( 'submit', ( e ) => {
    e.preventDefault();

    const prodNameInput = document.querySelector( '#name-prod' ).value;
    const prodPriceInput = document.querySelector( '#price-prod' ).value;
    const prodInventoryInput = document.querySelector( '#inventory-prod' ).value;

    // console.log( prodNameInput, prodPriceInput, inventoryProdInput );
    // console.log( restaurantNameInput.value );

    if ( [ prodNameInput, prodPriceInput, prodInventoryInput ].includes( '' ) ) {
        printAlert( 'All fields are required', 'error' );
        return;
    }

    const product = {
        productName: prodNameInput,
        price: prodPriceInput,
        inventory: prodInventoryInput,
        id: Date.now().toString( 36 )
    };

    createProduct( product, token );

    updateRestaurant( product, token );
    loadTable( token, product );

} );

const loadTable = async ( token ) => {


    const restaurant = await getRestaurants( token );
    const products = await getProducts();
    let prodRest = [];

    const restaurantProducts = restaurant.products.map( ( { prodID } ) => {

        products.forEach( product => {
            if ( product.id === prodID ) {
                const row = document.createElement( 'TR' );

                row.innerHTML = `
        
            <th scope="row">${ product.id }</th>
            <td>${ product.productName }</td>
            <td>${ restaurant.name }</td>
            <td>${ product.price }</td>
            <td>${ product.inventory }</td>
        `;
                tbodyTable.appendChild( row );
            }
        } );

    } );


};
signInNavItem.addEventListener( 'click', () => {

    if ( signInNavItem.textContent === 'Sign Out' ) {
        localStorage.clear();
        window.location.href = 'index.html';
    } else {
        window.location.href = 'login.html';
    }
} );