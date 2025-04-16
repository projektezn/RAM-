document.addEventListener("DOMContentLoaded", function() {
    memory();
});


let LN = 1

function dodajElement() {

    const opcje = [
        'load', 'store', 'read', 'write', 'add', 'sub', 'mult', 'div', 'jump', 'jgzt'
    ]
    let tabela = document.getElementById("tabelaProgram");

    let row = tabela.insertRow();

    let cell1 = row.insertCell();
    let cell2 = row.insertCell();
    let cell3 = row.insertCell();
    let cell4 = row.insertCell();
    let cell5 = row.insertCell();

    cell1.innerHTML = LN;
    cell2.innerHTML = "<input id='lave' type='text'></input>";

    selectElement = document.createElement("select");
    cell3.appendChild(selectElement);

    opcje.forEach(opcja => {
        optionElement = document.createElement("option");
        optionElement.innerHTML = opcja;
        selectElement.appendChild(optionElement);

    });

    cell4.innerHTML = "<input id='element' type='text'></input>";
    cell5.innerHTML = "<input id='element' type='text'></input>";
    LN++
}

function memory(){

    let tabela = document.getElementById("tabelaMemory");
    
    let address = 0
    while(address<=100){
        let row = tabela.insertRow();
        let cell1 = row.insertCell();
        let cell2 = row.insertCell();

        cell1.innerHTML = address;
        cell2.innerHTML = "<input id='element' type='text'></input>";
        address++;
    }
}

function load(){
    
}



document.addEventListener("DOMContentLoaded", function() {
    generujPasek();
    updateScroll();  
});

let leftIndex = 0;
const totalCells = 100; 


function generujPasek() {
    const tabela = document.getElementById("tabelaPasekGorny");
    const headers = document.getElementById("headers");
    const data = document.getElementById("data");

    
    for (let i = 1; i <= totalCells; i++) {
        let th = document.createElement("th");
        th.textContent = i;
        headers.appendChild(th);
    }

  
    for (let i = 1; i <= totalCells; i++) {
        let td = document.createElement("td");
        let input = document.createElement("input");
        input.type = "text";
        td.appendChild(input);
        data.appendChild(td);
    }

   
    updateScroll();
}


document.getElementById("scrollLeft").addEventListener("click", function () {
    if (leftIndex > 0) {
        leftIndex--;
        updateScroll();
    }
});


document.getElementById("scrollRight").addEventListener("click", function () {
    if (leftIndex < totalCells - 15) { 
        leftIndex++;
        updateScroll();
    }
});


function updateScroll() {
    let headers = document.getElementById("headers");
    let data = document.getElementById("data");

   
    for (let i = 0; i < totalCells; i++) {
        headers.children[i].style.display = 'none';
        data.children[i].style.display = 'none';
    }

    
    for (let i = 0; i < 15; i++) {
        headers.children[i + leftIndex].style.display = 'table-cell';
        data.children[i + leftIndex].style.display = 'table-cell';
    }
}
