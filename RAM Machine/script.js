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

