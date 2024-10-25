
let totalBudget = parseFloat(localStorage.getItem('totalBudget')) || 0;
let totalSpent = parseFloat(localStorage.getItem('totalSpent')) || 0;
let foodSpent = parseFloat(localStorage.getItem('foodSpent')) || 0;
let clothesSpent = parseFloat(localStorage.getItem('clothesSpent')) || 0;
let booksSpent = parseFloat(localStorage.getItem('booksSpent')) || 0;
let otherSpent = parseFloat(localStorage.getItem('otherSpent')) || 0;

document.addEventListener('DOMContentLoaded', function() {
    if (totalBudget) {
        document.getElementById('total-budget').value = totalBudget;
    }
    updateResults();
    updateBudgetBar();
    updateLegend();
});

// Event listener for adding expenses
document.getElementById('add-expense-btn').addEventListener('click', function() {
    const expenseDesc = document.getElementById('expense-desc').value.toLowerCase();
    const expenseAmount = parseFloat(document.getElementById('expense-amount').value) || 0;

    if (expenseDesc && expenseAmount) {
        categorizeExpense(expenseDesc, expenseAmount);
        updateResults();
        updateBudgetBar();
        updateLegend();
        saveToLocalStorage();
    } else {
        alert('Please enter both a description and amount.');
    }
});

document.getElementById('total-budget').addEventListener('input', function() {
    totalBudget = parseFloat(document.getElementById('total-budget').value) || 0;
    updateResults();
    updateBudgetBar();
    updateLegend();
    saveToLocalStorage();
});

function categorizeExpense(desc, amount) {
    if (desc.includes('food') || desc.includes('lunch') || desc.includes('dinner') || desc.includes('snack')) {
        foodSpent += amount;
    } else if (desc.includes('clothes') || desc.includes('shirt') || desc.includes('jeans') || desc.includes('t-shirt')) {
        clothesSpent += amount;
    } else if (desc.includes('book') || desc.includes('notebook') || desc.includes('textbook')) {
        booksSpent += amount;
    } else {
        otherSpent += amount;
    }
    totalSpent += amount;
}

function updateResults() {
    const remainingBudget = totalBudget - totalSpent;

    document.getElementById('total-spent').innerText = `Total Spent: INR ${totalSpent.toFixed(2)}`;
    document.getElementById('remaining-budget').innerText = `Remaining Budget: INR ${remainingBudget.toFixed(2)}`;
}

function updateBudgetBar() {
    const foodPercentage = (foodSpent / totalBudget) * 100;
    const clothesPercentage = (clothesSpent / totalBudget) * 100;
    const booksPercentage = (booksSpent / totalBudget) * 100;
    const othersPercentage = (otherSpent / totalBudget) * 100;

    document.getElementById('food-bar').style.width = `${foodPercentage}%`;
    document.getElementById('clothes-bar').style.width = `${clothesPercentage}%`;
    document.getElementById('books-bar').style.width = `${booksPercentage}%`;
    document.getElementById('others-bar').style.width = `${othersPercentage}%`;
}

function updateLegend() {
    const legendContainer = document.getElementById('color-legend');
    legendContainer.innerHTML = '';

    const categories = [
        { name: 'Food', amount: foodSpent, color: '#ff9f43' },
        { name: 'Clothes', amount: clothesSpent, color: '#2ed573' },
        { name: 'Books', amount: booksSpent, color: '#1e90ff' },
        { name: 'Others', amount: otherSpent, color: '#ff4757' }
    ];

    categories.sort((a, b) => b.amount - a.amount);

    categories.forEach(category => {
        const legendItem = document.createElement('div');
        legendItem.classList.add('legend-item');

        const colorSquare = document.createElement('div');
        colorSquare.classList.add('legend-color');
        colorSquare.style.backgroundColor = category.color;

        const categoryLabel = document.createElement('span');
        categoryLabel.innerText = `${category.name}: INR ${category.amount.toFixed(2)}`;

        legendItem.appendChild(colorSquare);
        legendItem.appendChild(categoryLabel);
        legendContainer.appendChild(legendItem);
    });
}

function saveToLocalStorage() {
    localStorage.setItem('totalBudget', totalBudget);
    localStorage.setItem('totalSpent', totalSpent);
    localStorage.setItem('foodSpent', foodSpent);
    localStorage.setItem('clothesSpent', clothesSpent);
    localStorage.setItem('booksSpent', booksSpent);
    localStorage.setItem('otherSpent', otherSpent);
}
