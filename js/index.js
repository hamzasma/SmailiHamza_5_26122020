import { get } from './request.js';
import { cartitems } from './paniergestion.js';
const docHtml = document.getElementById("contenair");
let cart = document.getElementById("cart-count");
/*init cart*/
if (cartitems() > 0)
    cart.innerHTML = cartitems();
else
    cart.innerHTML = "";
/** exuction de la fonction getdata pour afficher les produits*/
get("http://localhost:3000/api/teddies/").then(function (data) {
    data.forEach((objet) => {
        let priceInEuro = objet.price / 100;
        docHtml.innerHTML += `
        <a href="html/produit.html?id=${objet._id}&prix=${objet.price}" class="col-12 col-md-5 col-lg-5">
            <figure class="profile-card-2 profile-card-2 ">
              <img src="${objet.imageUrl}" alt="${objet.name}" class="img img-responsive">
              <figcaption class="card-body">
                <h5 class="profile-name">${objet.name}</h5>
                <p class="profile-username">${priceInEuro.toFixed(2)} €</p>
                </figcaption>
              
            </figure>
        </a>
        `;
    });
    var loadingspinner = document.querySelectorAll(".loader");
    loadingspinner[0].style.display = "none";
    docHtml.style.display = "contents";
}).catch(function (error) {
    console.log(error);
})