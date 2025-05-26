document.addEventListener("DOMContentLoaded", function() {
  memory();
  generujPasek();
  generujPasek2();
  updateScroll();
  updateScrollDolny();
});

let LN = 1;
const totalCells = 100;
let leftIndex = 0;
let dolnyLeftIndex = 0;

function dodajElement() {
  const opcje = [
    'load', 'store','store^', 'read', 'write', 'add', 'sub', 'mult', 'div', 'jump', 'jgzt'
  ];

  let tabela = document.getElementById("tabelaProgram");

  let row = tabela.insertRow();

  let cell1 = row.insertCell();
  let cell2 = row.insertCell();
  let cell3 = row.insertCell();
  let cell4 = row.insertCell();
  let cell5 = row.insertCell();

  cell1.innerHTML = LN;
  cell2.innerHTML = "<input type='text'>";

  let selectElement = document.createElement("select");
  opcje.forEach(opcja => {
    let optionElement = document.createElement("option");
    optionElement.innerHTML = opcja;
    selectElement.appendChild(optionElement);
  });
  cell3.appendChild(selectElement);

  cell4.innerHTML = "<input type='text'>";
  cell5.innerHTML = "<input type='text'>";

  LN++;
}

function memory() {
  let tabela = document.getElementById("tabelaMemory");

  let address = 0;
  while (address <= 100) {
    let row = tabela.insertRow();
    let cell1 = row.insertCell();
    let cell2 = row.insertCell();

    cell1.innerHTML = address;
    cell2.innerHTML = "<input type='text' id='memory" + address + "'readonly>";
    address++;
  }
}

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
    input.id = "a" + i;
    td.appendChild(input);
    data.appendChild(td);
  }

  updateScroll();
}

function generujPasek2() {
  const tabela = document.getElementById("tabelaPasekDolny");
  const headers = document.getElementById("headersDolny");
  const data = document.getElementById("dataDolny");

  for (let i = 1; i <= totalCells; i++) {
    let th = document.createElement("th");
    th.textContent = i;
    headers.appendChild(th);
  }

  for (let i = 1; i <= totalCells; i++) {
    let td = document.createElement("td");
    let input = document.createElement("input");
    input.type = "text";
    input.id = "b" + i;
    td.appendChild(input);
    data.appendChild(td);
  }

  updateScrollDolny();
}

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

function updateScrollDolny() {
  let headers = document.getElementById("headersDolny");
  let data = document.getElementById("dataDolny");

  for (let i = 0; i < totalCells; i++) {
    headers.children[i].style.display = 'none';
    data.children[i].style.display = 'none';
  }

  for (let i = 0; i < 15; i++) {
    headers.children[i + dolnyLeftIndex].style.display = 'table-cell';
    data.children[i + dolnyLeftIndex].style.display = 'table-cell';
  }
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

document.getElementById("scrollLeftDolny").addEventListener("click", function () {
  if (dolnyLeftIndex > 0) {
    dolnyLeftIndex--;
    updateScrollDolny();
  }
});

document.getElementById("scrollRightDolny").addEventListener("click", function () {
  if (dolnyLeftIndex < totalCells - 15) {
    dolnyLeftIndex++;
    updateScrollDolny();
  }
});

//    =====  zapis i wczytywanie ===== 
document.getElementById("saveProgram").addEventListener("click", function () {
const tabela = document.getElementById("tabelaProgram");
let rows = tabela.rows;
let data = "";

for (let i = 1; i < rows.length; i++) {
  let cells = rows[i].cells;
  let line = [];

  line.push(cells[0].textContent.trim()); 
  line.push(cells[1].querySelector("input")?.value || ""); 
  line.push(cells[2].querySelector("select")?.value || ""); 
  line.push(cells[3].querySelector("input")?.value || ""); 
  line.push(cells[4].querySelector("input")?.value || ""); 

  data += line.join(",") + "\n";
}

const blob = new Blob([data], { type: "text/plain" });
const link = document.createElement("a");
link.href = URL.createObjectURL(blob);
link.download = "program.txt";
link.click();
});
document.getElementById("loadProgram").addEventListener("click", function () {
const input = document.createElement("input");
input.type = "file";
input.accept = ".txt";

input.addEventListener("change", function () {
  const file = input.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const content = e.target.result.trim();
    const lines = content.split("\n");

    const tabela = document.getElementById("tabelaProgram");

    while (tabela.rows.length > 1) {
      tabela.deleteRow(1);
    }

    LN = 0;

    lines.forEach(line => {
      const [ln, label, instruction, argument, comment] = line.split(",");

      let row = tabela.insertRow();
      row.insertCell().innerText = ln; 

      const cellLabel = row.insertCell();
      cellLabel.innerHTML = `<input type='text' value="${label || ""}">`;

      const cellInstr = row.insertCell();
      const select = document.createElement("select");
      ['load', 'store', 'store^', 'read', 'write', 'add', 'sub', 'mult', 'div', 'jump', 'jgzt', 'jzero', 'halt'].forEach(op => {
        const opt = document.createElement("option");
        opt.value = op;
        opt.text = op;
        if (op === instruction) opt.selected = true;
        select.appendChild(opt);
      });
      cellInstr.appendChild(select);

      const cellArg = row.insertCell();
      cellArg.innerHTML = `<input type='text' value="${argument || ""}">`;

      const cellComment = row.insertCell();
      cellComment.innerHTML = `<input type='text' value="${comment || ""}">`;

      LN = Math.max(LN, parseInt(ln) + 1);
    });
  };

  reader.readAsText(file);
});

input.click();
});



// ===== panel sterowania =====

function runOneStep() {
  let instruction = document.getElementById("instruction0").value
  let argument = document.getElementById("argument0").value

  console.log(argument);
  console.log(instruction);

  switch (instruction) {
    case "load":
      load(argument);
      break;
  }



}

// ===== instrukcje =====

//function load(argument) {
  //alert("load dziala");
  //let address0 = document.getElementById("memory0");
  //let address = document.getElementById("memory" + argument).value

  //address0.value = address;

//}

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
      
      
  case "load":
      let address0 = document.getElementById("memory0");
      let address = document.getElementById("memory" + argument).value;
      address0.value = address;
      break;

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
          for (i = 1; i < instructions.length; i++) {
              if (instructions[i].cells[1].querySelector("input").value == argument) {
                  programLine = i - 1;
                  continue;
              }
          }
      }
      break;

  case "jgzt":
      if (memory[0].value > 0) {
          if (argument != "") {
              for (i = 1; i < instructions.length; i++) {
                  if (instructions[i].cells[1].querySelector("input").value == argument) {
                      programLine = i - 1;
                      continue;
                  }
              }
          }
      }
      break;

  case "store":
      if (!isNaN(adres)) {
          memory[adres].value = memory[0].value;
      }
      break;

  case "store^":
      if (!isNaN(adres)) {
          let adres2 = parseInt(memory[adres].value);
          if (!isNaN(adres2)) {
              memory[adres2].value = memory[0].value;
          }
      }
      break;

  case "add":
      if (!isNaN(adres)) {
          memory[0].value = parseFloat(memory[0].value) + parseFloat(memory[adres].value || 0);
      }
      break;

  case "sub":
      if (!isNaN(adres)) {
          memory[0].value = parseFloat(memory[0].value) - parseFloat(memory[adres].value || 0);
      }
      break;

  case "mult":
      if (!isNaN(adres)) {
          memory[0].value = parseFloat(memory[0].value) * parseFloat(memory[adres].value || 0);
      }
      break;

  case "div":
      if (!isNaN(adres) && parseFloat(memory[adres].value) !== 0) {
          memory[0].value = Math.floor(parseFloat(memory[0].value) / parseFloat(memory[adres].value));
      } else {
          console.warn("Dzielenie przez zero lub nieprawidłowy adres");
      }
      break;

      case "jzero":
      if (parseFloat(memory[0].value) === 0) {
          if (argument != "") {
              for (let i = 1; i < instructions.length; i++) {
                  if (instructions[i].cells[1].querySelector("input").value === argument) {
                      programLine = i - 1;
                      break;
                  }
              }
          }
      }
      break;

  case "halt":
      return;

      }
      programLine++;
  }

}


// ==== set breakpoint ====
let breakpointMode = false;

document.getElementById("setBreakpoint").addEventListener("click", () => {
breakpointMode = !breakpointMode;

if (breakpointMode) {
  alert("Kliknij wiersz w tabeli programu, aby ustawić lub usunąć breakpoint.");
  enableBreakpointMode();
} else {
  disableBreakpointMode();
}
});

function enableBreakpointMode() {
const tabela = document.getElementById("tabelaProgram");

for (let i = 1; i < tabela.rows.length; i++) {
  tabela.rows[i].addEventListener("click", toggleBreakpoint);
}
}

function disableBreakpointMode() {
const tabela = document.getElementById("tabelaProgram");

for (let i = 1; i < tabela.rows.length; i++) {
  tabela.rows[i].removeEventListener("click", toggleBreakpoint);
}
}

function toggleBreakpoint(event) {
const row = event.currentTarget;
row.classList.toggle("breakpoint-row");
}


function dodajElement() {
const opcje = ['load', 'store', 'store^', 'read', 'write', 'add', 'sub', 'mult', 'div', 'jump', 'jgzt', 'jzero', 'halt'];
let tabela = document.getElementById("tabelaProgram");
let row = tabela.insertRow();

let cell1 = row.insertCell();
let cell2 = row.insertCell();
let cell3 = row.insertCell();
let cell4 = row.insertCell();
let cell5 = row.insertCell();

cell1.innerHTML = LN;
cell2.innerHTML = "<input type='text'>";

let selectElement = document.createElement("select");
opcje.forEach(opcja => {
  let optionElement = document.createElement("option");
  optionElement.innerHTML = opcja;
  selectElement.appendChild(optionElement);
});
cell3.appendChild(selectElement);

cell4.innerHTML = "<input type='text'>";
cell5.innerHTML = "<input type='text'>";

if (breakpointMode) {
  row.addEventListener("click", toggleBreakpoint);
}

LN++;
}

// ==== stop on breakpoint ====

document.getElementById("runBreakpoint").addEventListener("click", runUntilBreakpoint);

function runUntilBreakpoint() {
const tabela = document.getElementById("tabelaProgram");

for (let i = 1; i < tabela.rows.length; i++) {
  const row = tabela.rows[i];

  const instruction = row.cells[2].querySelector("select")?.value;
  const argument = row.cells[3].querySelector("input")?.value;

  console.log(`Executing line ${i - 1}: ${instruction} ${argument}`);


  if (row.classList.contains("breakpoint-row")) {
    console.log(`Breakpoint at line ${i - 1}. Pausing.`);
    break;
  }
}
}
