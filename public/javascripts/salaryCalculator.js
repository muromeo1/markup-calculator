document.addEventListener('DOMContentLoaded', function(){
  getEuroValue();
  getLocalStorageData();

  let euro = document.getElementById('euro');
  let salary = document.getElementById('salary');
  let button = document.getElementById('buttonCalculate');

  salary.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' && salary.value != '') {
      calculateSalary(salary.value, euro.value);
    };
  });

  button.addEventListener('click', function () {
    if (salary.value != '') {
      calculateSalary(salary.value, euro.value);
    };
  });
});

function getLocalStorageData() {
  let data = localStorage.getItem('salary-MC');
  let euro = localStorage.getItem('euro-MC');

  if (data != null) {
    let salary = document.getElementById('salary');

    salary.value = data;
    salary.textContent = data;

    calculateSalary(data, euro);
  };
};

function getEuroValue() {
  fetch('https://economia.awesomeapi.com.br/last/EUR-BRL')
    .then(res => res.json())
    .then(json => {
      let euro = document.getElementById('euro');
      let value = json["EURBRL"]["ask"];

      euro.value = value;
      euro.textContent = value;
    });
};

function format(value) {
  return Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value || 0);
};

function calculateSalary(salary, euro) {
  localStorage.setItem('salary-MC', salary)
  localStorage.setItem('euro-MC', euro)

  let reais = document.getElementById('reais');
  let das = document.getElementById('das');
  let remessa = document.getElementById('remessaOnline');
  let iof = document.getElementById('iof');
  let reaisTotal = document.getElementById('reaisTotal');

  let value = (salary * euro);
  let valueDas = -(value * 0.06);
  let valueRemessa = -(value * 0.0198974);
  let valueIof = -((value + valueRemessa) * 0.0038);
  let total = (value + valueRemessa + valueIof + valueDas);

  reais.value = format(value);
  reais.textContent = format(value);

  das.value = format(valueDas);
  das.textContent = format(valueDas);

  remessa.value = format(valueRemessa);
  remessa.textContent = format(valueRemessa);

  iof.value = format(valueIof);
  iof.textContent = format(valueIof);

  reaisTotal.value = format(total);
  reaisTotal.textContent = format(total);
};

