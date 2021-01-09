function initcart(id, prix,imageUrl,name) {
    var produits = new Array();
    var produit = {
        id: id,
        prix: prix,
        imageUrl:imageUrl,
        name:name,
        quantité: 1
    }
    produits.push(produit);
    localStorage.setItem('produits', JSON.stringify(produits));
}
function addtocart(id, prix, imageUrl, name) {

    var produits = JSON.parse(localStorage.getItem('produits'));

    if (produits == null) {
        initcart(id, prix, imageUrl, name);
    }
    else {

        if (produits.find(produit => produit.id === id)) {
            produits.find(produit => produit.id === id).quantité++;
            localStorage.setItem('produits', JSON.stringify(produits));
        } else {
            var produit = {
                id: id,
                prix: prix,
                imageUrl:imageUrl,
                name:name,
                quantité: 1
            }
            produits.push(produit);
            localStorage.setItem('produits', JSON.stringify(produits));
        }
    }
}
function decrfromcart(id) {
    var produits = JSON.parse(localStorage.getItem('produits'));
    produits.find(produit => produit.id === id).quantité--;
    localStorage.setItem('produits', JSON.stringify(produits));
}
function cartitems() {
    var produits = JSON.parse(localStorage.getItem('produits'));
    if (produits == null)
        return 0;
    else
        return produits.reduce(function (accumulateur, valeurCourante) {
            return accumulateur + (valeurCourante.quantité);
        }, 0);

}
function sommetotal() {
    var produits = JSON.parse(localStorage.getItem('produits'));
    return produits.reduce(function (accumulateur, valeurCourante) {
        return accumulateur + (valeurCourante.quantité * valeurCourante.prix);
    }, 0);
}
function rmvitem(i) {
    console.log(i);
    var produits = JSON.parse(localStorage.getItem('produits'));
    produits.splice(produits.indexOf(produits[i]),1);
    localStorage.setItem('produits', JSON.stringify(produits));
}
function boughtitems(){
    var produits = JSON.parse(localStorage.getItem('produits'));
    let items=new Array();
    produits.forEach(produit => {
        if(produit.quantité>0)
         items.push(produit.id);
    });
    return items;
}
export { addtocart, decrfromcart, cartitems, sommetotal, rmvitem ,boughtitems};