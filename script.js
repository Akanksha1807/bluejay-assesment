const input = document.getElementById("file-input");
const table = document.getElementById("excel-table");
const analyzeButton = document.getElementById("analyze-button");

let originalData = null;

input.addEventListener('change', (event) => {
    const file = event.target.files[0];
    readXlsxFile(file).then((rows) => {
        console.log(rows);
        table.innerHTML = "";
        originalData = rows;
        rows.forEach((row) => {
            let tr = document.createElement('tr');
            row.forEach((cell) => {
                const td = document.createElement('td');
                td.textContent = cell;
                tr.appendChild(td);
            });
            table.appendChild(tr);
        });
    });
});

analyzeButton.addEventListener('click', () => {
    if (originalData) {
        analyzeConsecutiveDays(originalData);
    } else {
        console.error('No data to analyze. Please upload an Excel file first.');
    }
});

// Function to analyze employees with 7 consecutive days
function analyzeConsecutiveDays(data) {
    const results = [];

    // Iterate through the data to find employees with 7 consecutive days
    for (let i = 0; i < data.length - 6; i++) {
        const employee = data[i];

        // Check if the employee has worked for 7 consecutive days
        const consecutiveDays = [];
        for (let j = 0; j < 7; j++) {
            const currentDate = employee[j]; // Assuming date information is in the first 7 columns
            const hasWorked = data.some(entry => entry[j] === currentDate);
            consecutiveDays.push(hasWorked);
        }

        // If the employee has worked for 7 consecutive days, add to results
        if (consecutiveDays.every(day => day)) {
            results.push(employee);
        }
    }

    // Display results
    displayResults(results);
}

// Function to display results in the console and on the page
function displayResults(results) {
    console.log('Results:', results);
    table.innerHTML = ''; // Clear the table
    results.forEach((row) => {
        let tr = document.createElement('tr');
        row.forEach((cell) => {
            const td = document.createElement('td');
            td.textContent = cell;
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });
}
