
const formulario = document.querySelector( '#formulario' );
const formularioLogin = document.querySelector( '#formulario-login' );
const formularioProd = document.querySelector( '#formularioProductos' );


export function printAlert ( mensaje, tipo ) {

    const alert = document.createElement( 'P' );

    if ( alert ) {
        if ( tipo === 'error' ) {
            alert.classList.add( 'p-3', 'bg-danger', 'text-white', 'fw-bold', 'text-center', 'rounded-4', 'text-uppercase' );
            alert.textContent = mensaje;
        }
    }
    if ( formulario ) {
        formulario.insertBefore( alert, formulario.firstElementChild );
    } else if ( formularioLogin ) {
        formularioLogin.insertBefore( alert, formularioLogin.firstElementChild );
    } else if ( formularioProd ) {
        formularioProd.insertBefore( alert, formularioProd.firstElementChild );

    }

    setTimeout( () => {
        alert.remove();
    }, 3000 );

};
