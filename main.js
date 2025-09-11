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