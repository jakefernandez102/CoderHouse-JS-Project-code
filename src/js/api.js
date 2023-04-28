import { printAlert } from './helpers/alert.js';

const url = 'https://coderhouser-js-project.onrender.com';

let isFirst;

export async function validateUser ( user ) {

    try {

        await fetch( `${ url }/users/?email=${ user.email }` )
            .then( resp => resp.json() )
            .then( usr => {

                if ( usr.length > 0 ) {
                    printAlert( 'User already exists', 'error' );

                } else {
                    newUser( user );
                }
            } );
    } catch ( error ) {
        console.log( error );
    }

};

export const newUser = async user => {

    try {


        await fetch( `${ url }/users`, {
            method: 'POST',
            body: JSON.stringify( user ),
            headers: {
                'Content-Type': 'application/json'
            }
        } );

        window.location.href = 'login.html';

    } catch ( error ) {
        console.log( error );
    }

};

export const validateLogin = async ( email, password ) => {

    try {

        await fetch( `${ url }/users/?email=${ email }` )
            .then( resp => resp.json() )
            .then( data => {

                if ( data.length == 0 ) {
                    printAlert( 'User does not exist', 'error' );
                    return;
                }

                data.forEach( user => {

                    if ( user.password == password ) {

                        localStorage.setItem( 'token', user.token );
                        alert( 'Has iniciado sesion Correctamente' );
                        window.location.href = 'index.html';


                    } else if ( user.password !== password ) {

                        printAlert( 'Password or Email incorrect', 'error' );
                    }
                } );

            } );
    } catch ( error ) {
        console.log( error );
    }


};

export async function getUserRol ( token ) {

    let objUser;

    try {

        await fetch( `${ url }/users/?token=${ token }` )
            .then( resp => resp.json() )
            .then( ( [ user ] ) => {
                const { rol } = user;
                objUser = rol;

            } );

        return objUser;
    } catch ( error ) {
        console.log( error );
    }

};

export async function setFirstSession ( token ) {

    let userGotten;
    try {

        userGotten = await fetch( `${ url }/users/?token=${ token }` )
            .then( resp => resp.json() )
            .then( ( [ user ] ) => user );

        console.log( userGotten.id );
        userGotten.primeraSesion = false;
        await fetch( `${ url }/users/${ userGotten.id }`, {
            method: 'PUT',
            body: JSON.stringify( userGotten ),
            headers: {
                'Content-Type': 'application/json',
            }
        } );
    } catch ( error ) {
        console.log( error );
    }


}

export async function isFirstSession ( token ) {

    try {

        await fetch( `${ url }/users/?token=${ token }` )
            .then( resp => resp.json() )
            .then( ( [ user ] ) => {

                if ( user.primeraSesion === true ) {

                    isFirst = true;
                } else {
                    isFirst = false;
                }

            } );
        return isFirst;
    } catch ( error ) {
        console.log( error );
    }


};

export async function createRestaurant ( name, token ) {

    let userAPI;
    try {
        userAPI = await fetch( `${ url }/users/?token=${ token }` )
            .then( resp => resp.json() )
            .then( ( [ user ] ) => user );

        fetch( `${ url }/restaurants`, {
            method: 'POST',
            body: JSON.stringify( {
                ownerID: userAPI.id,
                products: [],
                name
            } ),
            headers: {
                'Content-Type': 'application/json'
            }

        } );

    } catch ( error ) {
        console.log( error );
    }

}

export async function getRestaurantName ( token ) {


    try {

        const userAPI = await fetch( `${ url }/users/?token=${ token }` )
            .then( resp => resp.json() )
            .then( ( [ user ] ) => user );


        return await fetch( `${ url }/restaurants/?ownerID=${ userAPI.id }` )
            .then( resp => resp.json() )
            .then( ( [ data ] ) => data.name );
    } catch ( error ) {
        console.log( error );
    }

};

export async function createProduct ( product ) {

    try {

        fetch( `${ url }/products`, {
            method: 'POST',
            body: JSON.stringify( product ),
            headers: {
                'Content-Type': 'application/json'
            }
        } );
    } catch ( error ) {
        console.log( error );
    }


};

export async function updateRestaurant ( product, token ) {

    try {

        const userAPI = await fetch( `${ url }/users/?token=${ token }` )
            .then( resp => resp.json() )
            .then( ( [ user ] ) => user );

        const restaurantAPI = await fetch( `${ url }/restaurants/?ownerID=${ userAPI.id }` )
            .then( resp => resp.json() )
            .then( ( [ restaurant ] ) => restaurant );

        restaurantAPI.products = [ ...restaurantAPI.products, { prodID: product.id } ];

        await fetch( `${ url }/restaurants/${ restaurantAPI.id }`, {
            method: 'PUT',
            body: JSON.stringify( restaurantAPI ),
            headers: {
                'Content-Type': 'application/json'
            }
        } );
    } catch ( error ) {
        console.log( error );
    }

};


export async function getRestaurants ( token ) {

    const userAPI = await fetch( `${ url }/users/?token=${ token }` )
        .then( resp => resp.json() )
        .then( ( [ user ] ) => user );

    return await fetch( `${ url }/restaurants/?ownerID=${ userAPI.id }` )
        .then( resp => resp.json() )
        .then( ( [ restaurant ] ) => restaurant );


};

export async function getProducts () {

    return await fetch( `${ url }/products` )
        .then( resp => resp.json() )
        .then( ( productAPI ) => productAPI );


}
