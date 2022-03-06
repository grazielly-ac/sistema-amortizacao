function documentValue(nomeClasse) {
  return document.querySelector(nomeClasse);
}

let valorTotalFinanciado = documentValue(".valorTotalFinanciado");
let prazoAnos = documentValue(".prazoAnos");
let resultadoPrazoMeses = documentValue(".resultadoPrazoMeses");
let jurosAnos = documentValue(".jurosAoAno");
let resultadoJurosAoMes = documentValue(".resultadoJurosAoMes");
let resultadoJurosAcumulados = documentValue(".resultadoJurosAcumulados");

const btnReiniciar = document.querySelector(".btnReiniciar");
const btnSimular = document.querySelector(".btnSimular");
const formulario = document.querySelector(".formulario");

let tbody = documentValue(".tbody");

function calculaPrazoAnosEmMeses() {//Prazo meses
  resultadoPrazoMeses.valueAsNumber = prazoAnos.valueAsNumber * 12;

  return resultadoPrazoMeses.valueAsNumber;
}

function calculaJurosAoMes() {//Juros ao mes
 (resultadoJurosAoMes.valueAsNumber = (1 + jurosAnos.valueAsNumber) ** (1 / 12) - 1);
 return resultadoJurosAoMes.valueAsNumber;
}

function amortizacao() {
  let amortiza = valorTotalFinanciado.valueAsNumber / calculaPrazoAnosEmMeses();
  return Number.parseFloat(amortiza.toFixed(2));
}

let saldoDevedor = 0,
  juros = [],
  total = [],
  totalJuros = 0;
function calcularValores() {
 
  totalJuros = 0;
  
  for (let i = 0; i < calculaPrazoAnosEmMeses(); i++) {
    saldoDevedor = valorTotalFinanciado.valueAsNumber - i * amortizacao();
    juros[i] = saldoDevedor * calculaJurosAoMes();
    total[i] = amortizacao() + juros[i];
    totalJuros += juros[i];
  }
  
}

function jurosAcumulados(){
    calcularValores();
    return resultadoJurosAcumulados.valueAsNumber = Number.parseFloat(totalJuros.toFixed(3));
}

function apresentarValoresIniciais(){//valores Resultado
    jurosAcumulados();
    calculaJurosAoMes();
    calculaPrazoAnosEmMeses();
    
}

function resetInputs() {
    resultadoPrazoMeses.valueAsNumber = "";
    resultadoJurosAoMes.valueAsNumber = "";
    resultadoJurosAcumulados.valueAsNumber = 0;
}

btnReiniciar.addEventListener("click", function () {
    let rowCount = tbody.rows.length;
  
    for (let i = rowCount; i > 0; i--) {
      tbody.deleteRow(rowCount[i]);
    }
     resetInputs();
     btnSimular.disabled = false;
});

function createTableSubmit(event){
  
        for (let j = 0; j < 5; j++) {
            let row = document.createElement("tr");
    
            let tdIndex = document.createElement("td");
            tdIndex.textContent = j + 1;
    
            let tdAmortizacao = document.createElement("td");
            tdAmortizacao.textContent = amortizacao().toFixed(2);
    
            let tdJuros = document.createElement("td");
            tdJuros.textContent = juros[j].toFixed(2);
    
            let tdTotal = document.createElement("td");
            tdTotal.textContent = total[j].toFixed(2);
    
            row.append(tdIndex, tdAmortizacao, tdJuros, tdTotal);
            tbody.append(row);
          }
    
    event.preventDefault();
    btnSimular.setAttribute("disabled",true);
}
formulario.addEventListener("submit", createTableSubmit);

