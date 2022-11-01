class person {
  constructor(name, isDependent, dependentFrom) {
    this.name = name;
    this.isDependent = isDependent;
    this.dependentFrom = dependentFrom;
    this.position= "";
    this.debt = 0;
  }
}

let people = [];
// people = [
//   new person ('persona1', false, ''),
//   new person ('persona2', false, ''),
//   new person ('persona3', false, ''),
//   new person ('persona4', true, 'persona1')
// ];//remover

let dependentSelection = document.getElementById("dependentFrom");
let whoPaidSelection = document.getElementById("whoPaid");
let sharedTable = document.getElementById("sharedTable");
let unsharedTable = document.getElementById("unsharedTable");
let liquidationTable = document.getElementById("liquidationTable");
let liquidationNames = document.getElementById("liquidationNames");
let liquidationPaid = document.getElementById("liquidationPaid");
let liquidationSpent = document.getElementById("liquidationSpent");
let liquidationTotal = document.getElementById("liquidationTotal");
let sharers = document.getElementById("sharers");
let cards = document.getElementById("cards");
const checkbox = document.getElementById("isDependent");
checkbox.addEventListener('change', (Event) => {
  const dependentForm = document.getElementById("dependentForm");
  if(checkbox.checked){
    dependentForm.setAttribute('style', 'display: block');
  } else {
    dependentForm.setAttribute('style', 'display: none');
  }
});


function addPerson() {
  const name = document.getElementById("name").value;
  const isDependent = checkbox.checked;
  let dependentFrom = ""
  if (isDependent) {
    dependentFrom = document.getElementById("dependentFrom").value;
  }
  if (name == "") {
    alert("Please fill all the fields");
    return
  }
  if (checkbox.checked && dependentFrom == "") {
    alert("Please add supporter first");
    return
  }
  /**Add element to array */
  document.getElementById("name").value = '';
  document.getElementById("dependentFrom").value = '';

  const newPerson = new person (name , isDependent, dependentFrom);
  people.push(newPerson);
  people.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
  displayNameCards();
};

function createSelection(){
  for (const person of people){
    if (!person.isDependent) {
      const opt = document.createElement('option');
      opt.setAttribute("class","optionList")
      opt.value = person.name;
      opt.textContent = person.name;
      dependentSelection.appendChild(opt);
      whoPaidSelection.appendChild(opt);
    };
}}


/**To remove cards before creating another */
function removeElementsByClass(className){
  const elements = document.getElementsByClassName(className);
  while(elements.length > 0){
      elements[0].parentNode.removeChild(elements[0]);
  }
}

// function changeImg(position , read){
//   const card = document.getElementsByClassName(`number${position}`)[0];
//   card.firstChild.setAttribute('src', read ? "./images/openBook.svg" : "./images/closedBook.svg")

// }


function displayNameCards(){
  const cartas = document.getElementsByClassName("card");
  if (cartas.length != 0) {
      removeElementsByClass('card');
      removeElementsByClass("sharerList");
      removeElementsByClass("optionList");
      removeElementsByClass("createdTable");
  }
  /**create cards */
  let i = 0
  for (const person of people){
    person.position = i;
    //create checkbox
    const label = document.createElement('div');
    label.setAttribute('class','options');
    const isDependent = document.createElement('input');
    isDependent.setAttribute('type', 'checkbox');
    isDependent.setAttribute('class', 'checkbox');
    isDependent.checked = person.isDependent;
    isDependent.addEventListener('change', (Event) => person.toggleDependent());
    const isDependentLabel = document.createElement('label');
    isDependentLabel.setAttribute('class', 'askDependent');
    isDependentLabel.textContent = "Is Dependent?";
    isDependentLabel.setAttribute('style', 'display: inline');
    //text of book info
    const personName = document.createElement('p');
    personName.setAttribute('class', 'personName');
    personName.setAttribute('style', 'white-space: pre-line');
    personName.textContent = `${person.name}`;
    //create remove button
    const personRemove = document.createElement('button');
    //bookRemove.textContent = "Delete";
    const svgIcon = document.createElement('img');
    svgIcon.setAttribute('class','deleteIcon');
    svgIcon.setAttribute('src' , "./images/delete.svg");
    personRemove.addEventListener('click', function(e) {
      if (confirm("Are you sure?")){
      const toBeRemoved = document.getElementsByClassName(`number${person.position}`)
      cards.removeChild(toBeRemoved[0]);
      people.splice(person.position , 1);
      console.table(people);
      }
    });
    //create container
    const card = document.createElement('div');
    card.setAttribute('class', `card number${i}`);
    i++;
    card.setAttribute('draggable', 'false');
    //put svg img in person
    const bookImg = document.createElement('img');
    bookImg.setAttribute('class','bookImg');
    bookImg.setAttribute('src', isDependent ? "./images/openBook.svg" : "./images/closedBook.svg");
    bookImg.setAttribute('alt', isDependent ? "Open book" : "Closed book");
    //bookImg.addEventListener('click', (Event) => changeCustomImg());
    const top = document.createElement('div');
    top.setAttribute('class','options');
    //put elements in position
    top.appendChild(bookImg);
    top.appendChild(personName);
    card.appendChild(top);
    card.appendChild(isDependent);
    label.appendChild(isDependent);
    label.appendChild(isDependentLabel);
    personRemove.appendChild(svgIcon);
    label.appendChild(personRemove);
    card.appendChild(label);
    cards.appendChild(card);
    //Add person to sharer list
    const list = document.createElement('li');
    list.setAttribute("class","sharerList")
  
    const sharerName = document.createElement("span");
    sharerName.textContent = person.name

    const isSharerPays = document.createElement('input');
    isSharerPays.setAttribute('type', 'text');
    isSharerPays.setAttribute('class', 'textbox');
    isSharerPays.setAttribute('class', 'sharerTextbox');
  
    list.appendChild(sharerName);
    list.appendChild(isSharerPays);
    
    sharers.appendChild(list);

    //Add person to table
    const unsharedTableNames = document.getElementById("unsharedTableNames");
    const personTable = document.createElement("th");
    personTable.setAttribute("class","createdTable");
    personTable.textContent = person.name;
    unsharedTableNames.appendChild(personTable);

    const personTable2 = document.createElement("th");
    personTable2.setAttribute("class","createdTable");
    personTable2.textContent = person.name;
    liquidationNames.appendChild(personTable2);
  };
  createSelection();
};

let onExpenses = false;
function toggleToExpenses(){
  const personSidebar = document.getElementById("personSidebar");
  const expensesSidebar = document.getElementById("expensesSidebar");
  if(onExpenses){
    personSidebar.setAttribute('style', 'display: flex');
    expensesSidebar.setAttribute('style', 'display: none');
  } else {
    expensesSidebar.setAttribute('style', 'display: flex');
    personSidebar.setAttribute('style', 'display: none');
  }
  onExpenses = !onExpenses
};

let eqse = []; //equally Shared Expenses
let unse = []; //Unequally Shared Expenses


const checkbox2 = document.getElementById("allPeoplePay");
checkbox.addEventListener('change', (Event) => {
  const sharersOptions = document.getElementById("sharersOptions");
  if(checkbox.checked){
    sharersOptions.setAttribute('style', 'display: block');
  } else {
    sharersOptions.setAttribute('style', 'display: none');
  }
});

class expense {
  constructor(expenseName, amount, whoPaid , allPeoplePay) {
    this.expenseName = expenseName;
    this.amount = amount;
    this.whoPaid = whoPaid;
    this.allPeoplePay = allPeoplePay;
    this.payers = [];
    this.position= "";
  }
}

function addExpense() {
  const expenseName = document.getElementById("expenseName").value;
  const allPeoplePay = checkbox2.checked;
  const whoPaid = document.getElementById("whoPaid").value;
  const amount = document.getElementById("amount").value;
  if (expenseName == "" || amount == "") {
    alert("Please fill all the fields");
    return
  }
  /**Add element to array */
  document.getElementById("expenseName").value = '';
  document.getElementById("amount").value = '';
  const newExpense = new expense (expenseName , amount, whoPaid ,allPeoplePay);
  if (allPeoplePay){
    newExpense.payers = people.map((a) => a.name);
    eqse.push(newExpense);
    people.find(payer => payer.name == whoPaid).debt -= Number(amount);
    people.map(payers => payers.debt += Number(amount/newExpense.payers.length));
    const tableRow = document.createElement('tr');
    const tableExpense = document.createElement("td");
    const tableAmount = document.createElement("td");
    const tablePaid = document.createElement("td");
    const tableDivided = document.createElement("td");
    tableExpense.textContent = expenseName;
    tableAmount.textContent = amount;
    tablePaid.textContent = whoPaid;
    tableDivided.textContent = amount/newExpense.payers.length
  
    tableRow.appendChild(tableExpense);
    tableRow.appendChild(tableAmount);
    tableRow.appendChild(tablePaid);
    tableRow.appendChild(tableDivided);
    sharedTable.appendChild(tableRow);
  };
  if (!allPeoplePay){
    newExpense.payers = people.map((a) => a.name);
    unse.push(newExpense);
    people.find(payer => payer.name == whoPaid).debt -= Number(amount);
    const debtArray = document.getElementsByClassName("sharerTextbox");
    people.map(payers => payers.debt += Number(debtArray[payers.position].value));
    const tableRow = document.createElement('tr');
    const tableExpense = document.createElement("td");
    const tableAmount = document.createElement("td");
    const tablePaid = document.createElement("td");
    tableExpense.textContent = expenseName;
    tableAmount.textContent = amount;
    tablePaid.textContent = whoPaid;
      
    tableRow.appendChild(tableExpense);
    tableRow.appendChild(tableAmount);
    tableRow.appendChild(tablePaid);
    
    for (const a of people){
      const personColumn = document.createElement("td");
      personColumn.textContent = debtArray[a.position].value;
      tableRow.appendChild(personColumn);
    }

    unsharedTable.appendChild(tableRow);
  };
  makeLiquidation()
}

function makeLiquidation() {
  if (eqse.length + unse.length == 1){
    for (const person of people){
      const debt = document.createElement("td");
      debt.setAttribute("id", `${person.name}Debt`);
      debt.textContent = person.debt;
      liquidationTotal.appendChild(debt);
    };
  } else {
    for (const person of people){
      const tableDebt = document.getElementById(`${person.name}Debt`);
      tableDebt.textContent = person.debt;
    }
  }
};










// displayNameCards();//remover