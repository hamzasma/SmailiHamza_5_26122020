const docHtml = document.getElementById("main");
docHtml.innerHTML += `
    <article class="col-10 col-md-8 col-lg-8">
       <h1 class="merci">Orinoco vous remercie de votre commande</h1>
       <p class="idf">Identifiant de la commande: ${new URLSearchParams(window.location.search).get("id")}</p>
       <p class="idf">Prix total payé: ${new URLSearchParams(window.location.search).get("somme")}  €</p>
    </article>
    `; 