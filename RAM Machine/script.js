document.addEventListener("DOMContentLoaded", function() {
    memory();
});


let LN = 1

function dodajElement() {
    let tabela = document.getElementById("tabelaProgram");

    let row = tabela.insertRow();

    let cell1 = row.insertCell();
    let cell2 = row.insertCell();
    let cell3 = row.insertCell();
    let cell4 = row.insertCell();
    let cell5 = row.insertCell();

    cell1.innerHTML = LN;
    cell2.innerHTML = "<input id='element' type='text'></input>";
    cell3.innerHTML = "<input id='element' type='text'></input>";
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

