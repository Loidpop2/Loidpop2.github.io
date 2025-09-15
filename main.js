function hotbar_backgroundSelector() {
    var chosen = false;
    for (var i = 0; i < document.getElementById("hotbar").childElementCount; i++) {
        e = document.getElementsByClassName("hotbar-button")[i];
        if (document.URL.includes(e.getAttribute("href")))
        {
            e.className = "hotbar-button-this";
            chosen = true;
        }
        console.log(i);
        console.log(e.getAttribute("href"));
        console.log(e);
    }
    if (chosen == false) { document.getElementsByClassName("hotbar-button")[0].className = "hotbar-button-this"; }
}

function searchbar_products() {
    var articles = ["Unity_how_to/", "About_me"];
    myInput = document.getElementById("search-products")
    myInput.addEventListener('input', function(event) {
        const currentValue = event.target.value;
        for (var i = 0; i < articles.length; i++ ) {
            
        } 
    });
}

function page() {
    hotbar_backgroundSelector();
    searchbar_products();
}

