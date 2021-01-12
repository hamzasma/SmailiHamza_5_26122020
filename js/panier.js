import { post } from './request.js';
import { addtocart, boughtitems, cartitems, decrfromcart, rmvitem, sommetotal } from './paniergestion.js';
const docHtml = document.getElementById("contenair");
let cart = document.getElementById("cart-count");
let cart_count = 0;
let somme = 0;
var nomprenom = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
var email = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
function postdata(somme) {
    const data = JSON.stringify({
        contact: {
            firstName: document.getElementById("inputfirstname").value,
            lastName: document.getElementById("inputlastname").value,
            address: document.getElementById("inputAddress").value,
            city: document.getElementById("inputville").value,
            email: document.getElementById("inputEmail").value
        },
        products: boughtitems()

    })
    post("http://localhost:3000/api/teddies/order", data).then(function (data) {
        window.location.assign("/html/confirmation.html?id=" + data.orderId + "&somme=" + (somme / 100).toFixed(2));
        localStorage.clear();
    }).catch(function (error) {
        console.log(error);
    })


}
function validity(text, regex) {
    if (text.match(regex))
        return true;
    else
        return false;
}
document.getElementById("inputfirstname").addEventListener('keyup', () => {
    
    if (!validity(document.getElementById("inputfirstname").value, nomprenom)) {
        document.getElementById("inputfirstname").style.backgroundColor = 'red';
    } else
        document.getElementById("inputfirstname").style.backgroundColor = '#f3e9f1';
})

document.getElementById("inputlastname").addEventListener('keyup', () => {
    if (!validity(document.getElementById("inputlastname").value, nomprenom)) {
        document.getElementById("inputlastname").style.backgroundColor = 'red';
    } else
        document.getElementById("inputlastname").style.backgroundColor = '#f3e9f1';
})

document.getElementById("inputville").addEventListener('keyup', () => {
    if (!validity(document.getElementById("inputville").value, nomprenom)) {
        document.getElementById("inputville").style.backgroundColor = 'red';
    } else
        document.getElementById("inputville").style.backgroundColor = '#f3e9f1';
})

document.getElementById("inputEmail").addEventListener('keyup', () => {
  
    if (!validity(document.getElementById("inputEmail").value, email)) {
        document.getElementById("inputEmail").style.backgroundColor = 'red';
    } else
        document.getElementById("inputEmail").style.backgroundColor = '#f3e9f1';
})

document.getElementById("submit").addEventListener('click', () => {
    let valide = true;

    if (!validity(document.getElementById("inputfirstname").value, nomprenom)) {
        document.getElementById("inputfirstname").style.backgroundColor = 'red';
        valide = false;
    }
    if (!validity(document.getElementById("inputlastname").value, nomprenom)) {
        document.getElementById("inputlastname").style.backgroundColor = 'red';
        valide = false;
    }
    if (!validity(document.getElementById("inputville").value, nomprenom)) {
        document.getElementById("inputville").style.backgroundColor = 'red';
        valide = false;
    }
    if (!validity(document.getElementById("inputEmail").value, email)) {
        document.getElementById("inputEmail").style.backgroundColor = 'red';
        valide = false;
    }

    if (!document.getElementById("inputAddress").reportValidity()) {
        valide = false;
    }
    if (valide) {
        postdata(somme);
    }
})


function rmv(newp) {
    let card = document.querySelectorAll(".profile-card-2");
    let btnid = document.querySelectorAll(".btnrmv");
    let btndel = document.querySelectorAll(".btndel");
    let setin = document.querySelectorAll(".input-count");
    let prixtotal = document.querySelectorAll(".prix-shop-total");
    for (let i = 0; i < btnid.length; i++) {
        btnid[i].addEventListener('click', () => {
            var produits = JSON.parse(localStorage.getItem('produits'));
            if (produits[i].quantité > 1) {
                decrfromcart(produits[i].id);
                cart_count = cartitems();
                setin[i].value = produits[i].quantité - 1;
                prixtotal[i].innerHTML = "Total :" + (((produits[i].quantité - 1) * produits[i].prix) / 100).toFixed(2) + '€';
                cart.innerHTML = cart_count;
                somme = somme - parseInt(produits[i].prix);
                newp.textContent = "Total a payer: " + (somme / 100).toFixed(2) + " €";
            }
        })

    }
    for (let i = 0; i < btndel.length; i++) {
        btndel[i].addEventListener('click', () => {
            rmvitem(i);
            somme = sommetotal();
            cart_count = cartitems();
            cart.innerHTML = cart_count;
            newp.textContent = "Total a payer: " + (somme / 100).toFixed(2) + " €";
            card[i].style.display = "none";
            if (cart_count == 0) {
                let newp = document.createElement('p');
                newp.textContent = "Votre panier est vide !";
                newp.className = 'somme col-8';
                docHtml.append(newp);
                document.getElementById("total").style.display = "none";
                document.getElementById("form").style.display = "none";
                cart.innerHTML = "";
            }
        })

    }
}

/*fonction pour augmenter la quantité de produits */
function add(newp) {
    let btnid = document.querySelectorAll(".btnadd");
    let setin = document.querySelectorAll(".input-count");
    let prixtotal = document.querySelectorAll(".prix-shop-total");
    for (let i = 0; i < btnid.length; i++) {
        btnid[i].addEventListener('click', () => {
            var produits = JSON.parse(localStorage.getItem('produits'));
            addtocart(produits[i].id, produits[i].prix);
            setin[i].value = produits[i].quantité + 1;
            prixtotal[i].innerHTML = "Total :" + (((produits[i].quantité + 1) * produits[i].prix) / 100).toFixed(2) + '€';
            cart.innerHTML = cartitems();
            somme = somme + parseInt(produits[i].prix);
            newp.textContent = "Total a payer: " + (somme / 100).toFixed(2) + " €";
        })
    }
}

if (cartitems() > 0) {
    cart.innerHTML = cartitems();
    somme = sommetotal();

    var produits = JSON.parse(localStorage.getItem('produits'));
    produits.forEach((produit) => {

        docHtml.innerHTML += `
          
              <figure class="col-11 col-md-11 col-lg-11 m-2 profile-card-2 profile-card-2-shop ">
                <img src="${produit.imageUrl}" alt="${produit.name}" class="img-shop img-responsive">
                <figcaption class="card-shop" >
                <button type="button" class="btndel">
              ×
                          </button>
                  <h5 class="nom-shop">${produit.name}</h5>
                  <p class="prix-shop">Prix: ${(produit.prix / 100).toFixed(2)} €</p>
                        <div class="add-unit">
                          <button type="button" class="btnrmv" >
                           -
                          </button>
                          <input type="text" name="updates[]" class="input-count"  value="${produit.quantité}" readonly>
          
                          <button type="button" class="btnadd">
                           +
                          </button>
                        </div>
                        <p class="prix-shop prix-shop-total " id="prix-total"  >Total :${((produit.quantité * produit.prix) / 100).toFixed(2)}€</p>
                       </figcaption>
              </figure>
           
          `;


    });

    let newp = document.createElement('p');
    newp.textContent = "Total a payer: " + (somme / 100).toFixed(2) + " €";
    newp.className = 'somme col-8';
    newp.id = "total";
    docHtml.append(newp);
    docHtml.append(document.getElementById("form"));
    var loadingspinner = document.querySelectorAll(".loader");
    loadingspinner[0].style.display = "none";
    docHtml.style.display = "contents";

    add(newp);
    rmv(newp);


} else {
    docHtml.style.display = "contents"
    let newp = document.createElement('p');
    var loadingspinner = document.querySelectorAll(".loader");
    newp.textContent = "Votre panier est vide !";
    newp.className = 'somme col-8';
    docHtml.append(newp);
    document.getElementById("form").style.display = "none";
    loadingspinner[0].style.display = "none";
}