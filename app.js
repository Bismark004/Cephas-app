function calculateLoan() {
    const name = document.getElementById('name').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const interest = 0.2 * amount;
    const total = amount + interest;
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 30);
  
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
      <h2>Loan Details</h2>
      <p><strong>Borrower's Name:</strong> ${name}</p>
      <p><strong>Loan Amount:</strong> ${amount}</p>
      <p><strong>Interest (20%):</strong> ${interest}</p>
      <p><strong>Total Amount Due:</strong> ${total}</p>
      <p><strong>Due Date:</strong> ${dueDate.toDateString()}</p>
    `;
  }
  