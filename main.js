
const scoreDiv = document.querySelector(".resulter")
let tableHeaders = ["Currency", "Value"] 

const createCurrencyTable = () => {
    while (scoreDiv.firstChild)  
    scoreDiv.removeChild(scoreDiv.firstChild)

    //  Create the table element
    let currencyTable = document.createElement('table')
    currencyTable.className = 'currencyTable'

    // Create the group table head tags
    let currencyTableHead = document.createElement('thead')

    // Create the row for the head tags
    let currencyTableHeaderRow = document.createElement('tr')

    // Loop through tableHeaders list 
    // append to headers and append headers to row
    tableHeaders.forEach(header => {
        let currencyHeader = document.createElement('th')
        currencyHeader.innerText = header 
        currencyTableHeaderRow.append(currencyHeader)
    })
    currencyTableHead.append(currencyTableHeaderRow)
    currencyTable.append(currencyTableHead)

    let currencyTableBody = document.createElement('tbody')
    currencyTable.append(currencyTableBody)

    scoreDiv.append(currencyTable)
}

const appendCurrency = (currencyParam, valueParam) => {
    const currencyTable = document.querySelector('.currencyTable')
    let currencyTableBodyRow = document.createElement('tr')

    let currencyName = document.createElement('td')
    currencyName.innerText = currencyParam

    let currencyValue = document.createElement('td')
    currencyValue.innerText = valueParam 

    currencyTableBodyRow.append(currencyName, currencyValue)

    currencyTable.append(currencyTableBodyRow)
}

function dater(){
    fetch(`https://api.exchangeratesapi.io/latest`)
    .then(response => response.json())
    .then(data => {
        console.log(data.date)
        document.querySelector('.date').innerHTML = data.date
    })
}

document.querySelector('#form').onsubmit = () => {
    const currency = document.querySelector('#currency').value.toUpperCase();
    const money = document.querySelector('#money').value.toUpperCase();
    fetch(`https://api.exchangeratesapi.io/latest?base=${money}&symbols=${currency}`)
    .then(response => response.json())
    .then(data => {
        const contents = `1 ${money} = ${data.rates[currency].toFixed(2)} ${currency}`
        document.querySelector('.result').innerHTML = contents;
    })
    .catch(() => {
        document.querySelector('.result').innerHTML = 
        'There was an error.';
    });
    return false;
};

document.querySelector('#former').onsubmit = () => {
    const exchange = document.querySelector('#exchange').value.toUpperCase();
    fetch(`https://api.exchangeratesapi.io/latest?base=${exchange}`)
    .then(response => response.json())
    .then(data => {
        createCurrencyTable()
        for (let key in data){
            for(let val in data["rates"]){
                let currencyRates = data["rates"][val].toFixed(2)
            appendCurrency(val, currencyRates)
                }
                break
            }
    }
)
.catch(() => {
    document.querySelector('.resulter1').innerHTML = 
    'There was an error'
})
 return false;
}

