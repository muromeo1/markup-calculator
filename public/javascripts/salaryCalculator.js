document.addEventListener('DOMContentLoaded', function(){
  getEuroValue();
  getLocalStorageData();

  let euro = document.getElementById('euro');
  let salary = document.getElementById('salary');

  salary.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' && salary.value != '') {
      localStorage.setItem('salary-MC', salary.value)
      localStorage.setItem('euro-MC', euro.value)

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

function calculateSalary(salary, euro) {
  let reais = document.getElementById('reais');
  let das = document.getElementById('das');
  let reaisTotal = document.getElementById('reaisTotal');

  let value = (salary * euro).toFixed(2);
  let valueDas = (value * 0.06).toFixed(2);
  let total = (value - valueDas).toFixed(2);

  reais.value = value;
  reais.textContent = value;

  das.value = valueDas;
  das.textContent = valueDas;

  reaisTotal.value = total;
  reaisTotal.textContent = total;
};

