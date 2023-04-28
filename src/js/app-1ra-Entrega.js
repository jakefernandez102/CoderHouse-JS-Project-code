
//users
const userName = prompt( 'What is your name?' );
const userLocation = prompt( 'Where are you from?' );
const userPreferences = [];
const restaurant = {};

//items 
let itemToSell = {};
let itemsToSellList = [];
let optionCase;

//deal - revenue
let totalRevenue = 0;
let realRevenue = 0;
let appsCommission = 0;

alert( `
        Hi ${ userName }, you are in MonchisApp. \n
        
        Here you will be able to buy, sell or deliver some delicious food.` );

do {

    optionCase = prompt( `What do you want to do in MonchisApp? 

            I want to:

            1) Sell
            2) Make an Order

            "exit" to exit the app
    `  ).toLowerCase();

    switch ( parseInt( optionCase ) ) {
        case 1:
            alert( `Great you are going to start selling in MonchisApp ` );
            AddItemsToSell();
            break;
        case 2:
            alert( `Great you are going to start making your order in MonchisApp ` );
            makeAnOrder();
            break;
        default:

            break;
    }

} while ( optionCase !== 'exit' );


function AddItemsToSell () {


    const acceptDeal = prompt( `First of all we want you to know that if you want to sell products we can do a great deal. 
    
    For each product you sell on MonchisApp, we will charge 10% of the sell!!  
    
    Do you want to continue with the deal? ("y" confirm / "n" Cancel)`).toLowerCase();

    if ( acceptDeal === 'y' ) {

        restaurant.name = prompt( `Please insert the Restaurant's name` );

        configUserPreferences( 'vendor', true );

        alert( `Your profile has been created as:

                ${ JSON.stringify( userPreferences ) }
                
        `);

        let wantToAdd = true;
        let itemName = '';
        let itemPrice = 0;
        let itemInventory = 0;
        let addOption = '';

        while ( wantToAdd ) {
            itemName = prompt( 'Please add the product Name' );
            itemPrice = prompt( 'Please add the product Price' );
            itemInventory = prompt( 'Please add the inventory of this Product you are offering' );


            if ( isNaN( itemPrice ) || isNaN( itemInventory ) ) {
                alert( 'Please, add a valid number value for price and inventory fields' );
                continue;;
            }
            itemToSell = {
                id: ( itemsToSellList.length + 1 ),
                itemName,
                itemPrice,
                itemInventory
            };

            itemsToSellList.push( itemToSell );

            addOption = prompt( `Do you want to add anothe product? \n
                                            "y" YES \n
                                            "n" NO` ).toLowerCase();

            if ( addOption === 'y' ) {
                wantToAdd = true;

            } else if ( addOption === 'n' ) {
                wantToAdd = false;

                calculateSellRevenues( 0.1 );

                alert( `
                        Here are the products you just added \n\n ${ JSON.stringify( itemsToSellList ) } 

                        The incomes are redistribuited as:

                        Total Revenue: $${ totalRevenue }
                        App's Commission: $${ appsCommission }
                        Real Revenue: $${ realRevenue }
                        
                ` );


            } else {
                alert( 'Please write a correct option' );
                addOption = prompt( `Do you want to add another product? \n
                                            "y" YES \n
                                            "n" NO` ).toLowerCase();
            }
        }
    } else {
        alert( 'What a shame!! \n\n We would like to see you soon, let us know if you change your mind of this.' );
    }


}



function makeAnOrder () {




    const acceptDeal = prompt( `First of all we want you to know that if you want to use our app you won't regret it, we can do a great deal. 
    
    For each order you make on MonchisApp, we will charge 10% of the total!!  
    
    Do you want to continue with the deal? ("y" confirm / "n" Cancel)`).toLowerCase();

    if ( acceptDeal === 'y' ) {

        configUserPreferences( 'customer' );

        alert( `Your profile has been created as:
    
                ${ JSON.stringify( userPreferences ) }
        `);

        if ( itemsToSellList.length === 0 ) {
            alert( 'We regret to inform you that at this time we do not have any vendors offering products. \n\n  We encourage you to become a provider of delicious meals in our app.' );
            return;
        }

        const option = parseInt( prompt(

            `Here are our products until now:

            Restaurant: ${ restaurant.name }
            ${ JSON.stringify( itemsToSellList ) }
            
            If you want to order some, please insert the number of the product's ID:
        ` ) );

        if ( isNaN( option ) ) {
            alert( `Your entry is not valid,I please insert a valid number, refer to the product's D` );
        } else {
            finishOrder( option );
        }


    } else {
        alert( 'What a shame!! \n\n We would like to see you soon, let us know if you change your mind of this.' );
    }
}

function configUserPreferences ( rol, isVendor = false ) {

    if ( isVendor ) {

        userPreferences.push( {
            user: userName,
            rol,
            location: userLocation,
            restaurantName: restaurant.name
        } );
    } else {
        userPreferences.push( {
            user: userName,
            rol,
            location: userLocation,
        } );

    }
}

function calculateSellRevenues ( percentage ) {

    for ( let i = 0; i < itemsToSellList.length; i++ ) {
        totalRevenue += ( itemsToSellList[ i ].itemPrice * itemsToSellList[ i ].itemInventory );
    }
    appsCommission += totalRevenue * percentage;
    realRevenue += totalRevenue - appsCommission;
}

function finishOrder ( option ) {

    for ( let i = 0; i < itemsToSellList.length; i++ ) {

        if ( itemsToSellList[ i ].id === option ) {

            alert( `You are about order this product:
                    ${ JSON.stringify( itemsToSellList[ i ] ) }
            `);
            const quantity = parseInt( prompt( 'How many of this products do you want to order?' ) );

            if ( quantity > itemsToSellList[ i ].itemInventory ) {
                alert( `Unfortunately we do not have the specified quantity of this product.

                    We currently have: ${ itemsToSellList[ i ].itemInventory }
                `);
                continue;
            }

            return calculateTotal( ( option - 1 ), quantity );

        } else {
            alert( 'The option entered does not match with any of our products' );
        }

    }
};

function calculateTotal ( productID, quantity ) {

    const subtotal = itemsToSellList[ productID ].itemPrice * quantity;
    const appsCommission = subtotal * 0.1;
    const total = subtotal + appsCommission;

    itemsToSellList[ productID ].itemInventory -= quantity;

    alert( `
            Here is your bill:
            Subtotal: $${ subtotal }
            App's Commission: $${ appsCommission }
            Total: $${ total }
    `);
};