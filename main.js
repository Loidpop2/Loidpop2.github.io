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
    var articles = ["About_me", "Unity__How_to"];
    myInput = document.getElementById("search-products")
    myInput.addEventListener('input', function(event) {
        const currentValue = event.target.value;
        document.getElementById("blog").innerHTML = "";
        for (var i = 0; i < articles.length; i++ ) {
            if (articles[i].toLowerCase().replaceAll("__"," - ").replaceAll("_", " ").includes(currentValue.toLowerCase()) || currentValue == "")
            {
                // Render blog
                document.getElementById("blog").innerHTML = document.getElementById("blog").innerHTML + "<a href=\"/blogs/" + articles[i] + "\"><div class=\"blog\" id=\"blog-" + i + "\"><center><p class=\"blog\">" + articles[i].replaceAll("__"," - ").replaceAll("_", " ") + "</p></center>\n<img src=\"/blogs/" + articles[i] + "/logo.png\" class=\"blog-cover\"></div></a>";
            }
        } 
    });
    document.getElementById("blog").innerHTML = "";
    for (var i = 0; i < articles.length; i++ ) {

        // Render blog
        document.getElementById("blog").innerHTML = document.getElementById("blog").innerHTML + "<a href=\"/blogs/" + articles[i] + "\"><div class=\"blog\" id=\"blog-" + i + "\"><center><p class=\"blog\">" + articles[i].replaceAll("__"," - ").replaceAll("_", " ") + "</p></center>\n<img src=\"/blogs/" + articles[i] + "/logo.png\" class=\"blog-cover\"></div></a>";
    } 
}

function page() {
    hotbar_backgroundSelector();
    searchbar_products();
}

