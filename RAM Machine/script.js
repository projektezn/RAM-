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

function Uruchom() {
  const inputTape = document.querySelectorAll("#tabelaPasekGorny tr:nth-child(2) input");
  const outputTape = document.querySelectorAll("#tabelaPasekDolny tr:nth-child(2) input");
  const instructions = document.querySelectorAll("#tabelaProgram tr");
  const memory = document.querySelectorAll("#tabelaMemory input");

  let inputTapePos = 0;
  let outputTapePos = 0;
  let programLine = 1;

  let deathLoop = 0;

  while (programLine < instructions.length) {
      deathLoop++;
      if (deathLoop > 200)
        return;

      const row = instructions[programLine];
      const instruction = row.cells[2].querySelector("select").value;
      const argument = row.cells[3].querySelector("input").value;
      const adres = parseInt(argument);

      let inputTapeValue = parseFloat(inputTape[inputTapePos].value);

      document.querySelectorAll("#lewyPasek input[type='text']")[0].value = instruction;
      document.querySelectorAll("#lewyPasek input[type='text']")[1].value = argument;

      switch (instruction) {
          /*
            miejsce na więcej case'ów
          */
          case "read":
              if (!isNaN(adres) && !isNaN(inputTapeValue)) {
                memory[adres].value = inputTapeValue;
                inputTapePos++;
              }
              break;
          case "write":
              if (!isNaN(adres) && !isNaN(memory[adres].value)) {
                memory[adres].value = inputTapeValue;
                outputTape[outputTapePos].value = memory[adres].value;
                outputTapePos++;
              }
              break;
          case "jump":
            if (argument != "") {
              for(i = 1; i < instructions.length; i++) {
                  if (instructions[i].cells[1].querySelector("input").value == argument) {
                    programLine = i - 1;
                    continue;
                  }
                }
            }
            break;
          case "jgzt":
            if(memory[0].value > 0){
              if (argument != ""){
                for(i = 1; i < instructions.length; i++) {
                    if (instructions[i].cells[1].querySelector("input").value == argument) {
                      programLine = i - 1;
                      continue;
                    }
                  }
              }
            }
            break;
      }
      programLine++;
  }
}


