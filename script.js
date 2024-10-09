let availableNumbers = Array.from({length: 10000}, (_, i) => i + 1);
let grantedNumbers = [];

document.getElementById('requestNumber').addEventListener('click', () => {
    const username = document.getElementById('username').value.trim();
    
    if (!username) {
        alert("Por favor, digite seu nome.");
        return;
    }

    if (availableNumbers.length === 0) {
        alert("Todos os números já foram solicitados.");
        return;
    }

    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    const grantedNumber = availableNumbers.splice(randomIndex, 1)[0];

    grantedNumbers.push({ user: username, number: grantedNumber });
    
    updateNumberList();
    document.getElementById('username').value = '';
});

function updateNumberList() {
    const numberList = document.getElementById('numberList');
    numberList.innerHTML = '';

    grantedNumbers.forEach(record => {
        const li = document.createElement('li');
        li.textContent = `${record.user} recebeu o número ${record.number}`;
        numberList.appendChild(li);
    });
}
