import { addtocart, cartitems } from './paniergestion.js';
import { get } from './request.js';
const docHtml = document.getElementById("contenair");
let cart = document.getElementById("cart-count");

if (cartitems() > 0)
    cart.innerHTML = cartitems();
else
    cart.innerHTML = "";
get(`http://localhost:3000/api/teddies/${new URLSearchParams(window.location.search).get("id")}`).then(function (data) {
    let priceInEuro = data.price / 100;
    var options_str = "";
    data.colors.forEach(function (color) {
        options_str += '<option value="' + color + '" class="listoption">' + color + '</option>';
    });
    docHtml.innerHTML += `
          <article class="col-12 col-md-8 col-lg-10">
             <figure class="profile-card-2 profile-card-2 ">
                <img src="${data.imageUrl}" alt="${data.name}" class="img img-responsive">
                <figcaption class="card-body">
                  <h5 class="profile-name">${data.name}</h5>
                  </figcaption> 
              </figure>
              <p class="prix">Prix ${priceInEuro.toFixed(2)} €<br></p>
              <h3 classe="pd-2">Discription du produit: </h3>
              <p class="profile-description">${data.description} </p>
          </article>
          <h4 class="col-12 col-md-8 col-lg-8">Choisissez la coulour de la peluche: </h4>
          <select Name="Name_of_list_box" id="list-colors" class="listbox col-8 col-md-8 col-lg-8">`+ options_str + `</select>
          <button  class="btn btn-primary mt-4 col-6 mb-4" id="btn">Ajouter au panier
			</button>
          `;
    document.querySelectorAll(".btn")[0].addEventListener('click', () => {
        addtocart(new URLSearchParams(window.location.search).get("id"), new URLSearchParams(window.location.search).get("prix"),data.imageUrl,data.name);
        cart.innerHTML = cartitems();
    });
    var loadingspinner = document.querySelectorAll(".loader");
    loadingspinner[0].style.display = "none";
    docHtml.style.display = "contents";
    
}).catch(function (error) {
    console.log(error);
})