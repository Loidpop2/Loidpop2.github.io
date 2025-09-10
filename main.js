function hotbar_backgroundSelector() {
    for (var i = 0; i < document.getElementById("hotbar").childElementCount; i++) {
        e = document.getElementsByClassName("hotbar-button")[i];
        if (document.URL.includes(e.getAttribute("href")))
        {
            e.className = "hotbar-button-this";
        }
        console.log(i);
        console.log(e.getAttribute("href"));
        console.log(e);
    }
}