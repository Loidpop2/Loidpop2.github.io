function page_whiteboard() {
    page();
    $('#input').on('change keyup page', function(){
        console.log(document.getElementById("input").value);
        render(document.getElementById("input").value);
    });
    render(document.getElementById("input").value);
}

function render(code) {
    document.getElementById("whiteboard").innerHTML = "";

    const dynamicFunction = new Function(code);

    dynamicFunction(); 
}

var _font = "Times New Roman";

function font(newFont) {
    _font = newFont;
}

function rgb (r,g,b) {
    return `rgba(${r},${g},${b})`;
}

function place(el, posx, posy) {
    const board = document.getElementById("whiteboard");
    el.style.position = "absolute";
    el.style.left = (posx * 10) + "px";
    el.style.top = (posy * 10 + 600) + "px";
    board.appendChild(el);
}

function note(text, posx, posy, width, height, color) {
    let __font = _font;
    const el = document.createElement("div");
    el.className = "note";
    el.textContent = text;

    el.style.width = (width * 10) + "px";
    el.style.height = (height * 10) + "px";
    el.style.background = color;
    el.style.padding = "5px";
    el.style.borderRadius = "7px";
    el.style.fontFamily = `'${__font}', Times, serif`;

    place(el, posx, posy);
}

function image(url, posx, posy, scale) {
    const el = document.createElement("img");
    el.src = url;

    el.style.width = (scale * 10 + 10) + "px";

    place(el, posx, posy);
}

function text(text, posx, posy, fontsize, color) {
    let __font = _font;
    const el = document.createElement("p");
    el.textContent = text;

    el.style.fontSize = fontsize;
    el.style.color = color;
    el.style.fontFamily = `'${__font}', Times, serif`;
    el.style.margin = "0";
    el.style.padding = "0";

    place(el, posx, posy);
}