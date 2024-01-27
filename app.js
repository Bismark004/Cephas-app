function calculateLoan() {
  let name = document.getElementById('name').value;
  let amount = document.getElementById('amount').value;
  let debtorList = document.getElementById('debtorList');
  let percentage = document.getElementById('Percentage').value;

  // Validation check
  if (name === '' || amount === '') {
    alert('Enter name and amount');
  } else {
    // Save data to local storage
    saveToLocalStorage(name, amount, value);

    // Retrieve all loan data from local storage and display
    displayAllData();

    // Clear input fields
    document.getElementById('name').value = '';
    document.getElementById('amount').value = '';
    document.getElementById('percentage').value='';
  }
}

function saveToLocalStorage(name, amount, percentage) {
  // Retrieve existing data from local storage or initialize an empty array
  let existingData = JSON.parse(localStorage.getItem('loanData')) || [];

  // Create a new data object
  let newData = {
    name: name,
    amount: amount,
    percentage: percentage,
    interest: amount * percentage,
    totalAmount: (amount * percentage) + parseFloat(amount),
    date: new Date().toLocaleDateString(),
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
  };

  // Add the new data to the existing data array
  existingData.push(newData);

  // Save the updated data array back to local storage
  localStorage.setItem('loanData', JSON.stringify(existingData));
}

function displayAllData() {
  // Retrieve all loan data from local storage
  let allData = JSON.parse(localStorage.getItem('loanData')) || [];

  // Display all data in debtorList
  let debtorList = document.getElementById('debtorList');
  debtorList.innerHTML = ''; // Clear existing data in debtorList

  for (let i = 0; i < allData.length; i++) {
    let data = allData[i];

    let result = document.createElement('ul');
    result.innerHTML = `<li class="borrower">
      <p> Name: ${data.name} </p>
      <p> Amount: ${data.amount} </p>
      <p> Interest: ${data.interest} </p>
      <p> Total Amount: ${data.totalAmount} </p>
      <p> Date: ${data.date} </p>
      <p> Due Date: ${data.dueDate} </p>
      <button onclick="markAsPaid(${i})"> Paid </button>
    </li>`;

    debtorList.appendChild(result);
  }
}

function markAsPaid(index) {
  // Retrieve existing data from local storage
  let existingData = JSON.parse(localStorage.getItem('loanData')) || [];

  // Remove the item at the specified index
  existingData.splice(index, 1);

  // Save the updated data array back to local storage
  localStorage.setItem('loanData', JSON.stringify(existingData));

  // Refresh the displayed data
  displayAllData();
}

// Call displayAllData when the page loads to show existing data
displayAllData();
