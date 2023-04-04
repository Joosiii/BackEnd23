// De ul wordt in een variabele opgeslagen, vervolgens worden de children binnen deze ul in een andere variabele opgeslagen (dus de list items)
const ul = document.querySelector(".profile-human ul");
const children = ul.children;
let interestarray = [];

// Alle list items worden ten eerste in een array geplaatst, en vervolgens wordt door elk item heengeloopt, en deze worden een voor één naar
// de eerder gedefinieerde array gepusht
Array.from(children).forEach(li => {
    interestarray.push(li.innerText);
});
// Bron gebruikt: https://attacomsian.com/blog/javascript-dom-get-all-child-nodes-of-an-element#:~:text=To%20get%20all%20child%20nodes,0)%20to%20access%20individual%20nodes.

// Vervolgens wordt deze array met alle geselecteerde list items in de localStorage opgeslagen, zodat deze in een ander JavaScript bestand opgehaald kan worden
localStorage.setItem("myArray", JSON.stringify(interestarray));
// Bron gebruikt: https://gist.github.com/nrojas13/68b79e21d0c81aa22ad762c9a4db38d0