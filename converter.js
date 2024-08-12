// Function to fetch exchange rates and populate the currency dropdowns
async function fetchExchangeRates() {
    try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await response.json();
        const currencyKeys = Object.keys(data.rates);

        const fromCurrencySelect = document.getElementById('fromCurrency');
        const toCurrencySelect = document.getElementById('toCurrency');

        currencyKeys.forEach(currency => {
            let option = document.createElement('option');
            option.value = currency;
            option.textContent = currency;
            fromCurrencySelect.appendChild(option);
            toCurrencySelect.appendChild(option.cloneNode(true));
        });
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
    }
}

// Function to convert currency
async function convertCurrency() {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    if (amount === '' || isNaN(amount)) {
        alert('Please enter a valid amount');
        return;
    }

    try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        const data = await response.json();
        const rate = data.rates[toCurrency];
        const convertedAmount = (amount * rate).toFixed(2);
        document.getElementById('convertedAmount').value = convertedAmount;
    } catch (error) {
        console.error('Error converting currency:', error);
    }
}

// Fetch exchange rates on page load
fetchExchangeRates();
