// Load saved debtors from local storage
let debtors = JSON.parse(localStorage.getItem('debtors')) || [];

function calculateLoan() {
    const name = document.getElementById('name').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const interest = 0.2 * amount;
    const total = amount + interest;
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 30);

    // Save debtor automatically
    if (!debtors.includes(name)) {
        debtors.push(name);
        saveDebtorsToStorage();
    }

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
      <h2>Loan Details</h2>
      <p><strong>Borrower's Name:</strong> ${name}</p>
      <p><strong>Loan Amount:</strong> ${amount}</p>
      <p><strong>Interest (20%):</strong> ${interest}</p>
      <p><strong>Total Amount Due:</strong> ${total}</p>
      <p><strong>Due Date:</strong> ${dueDate.toDateString()}</p>
    `;

    // Update debtor list
    updateDebtorsList();
}

function deleteDebtor(index) {
    debtors.splice(index, 1);
    updateDebtorsList();
    saveDebtorsToStorage();
    alert('Debtor deleted successfully!');
}

function updateDebtorsList() {
    const debtorList = document.getElementById('debtorList');
    debtorList.innerHTML = '<h2>Saved Debtors</h2>';

    debtors.forEach((debtor, index) => {
        debtorList.innerHTML += `
          <div>
            <p><strong>Borrower's Name:</strong> ${debtor}</p>
            <button onclick="deleteDebtor(${index})">Delete Debtor</button>
          </div>
        `;
    });
}

function saveDebtorsToStorage() {
    localStorage.setItem('debtors', JSON.stringify(debtors));
}

// Initial update of the debtor list on page load
updateDebtorsList();
