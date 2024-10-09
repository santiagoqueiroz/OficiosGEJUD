let nextNumber = 1; // Inicializa com o primeiro número
let grantedNumbers = [];

document.getElementById('requestNumber').addEventListener('click', () => {
    const username = document.getElementById('username').value.trim();
    
    if (!username) {
        alert("Por favor, digite seu nome.");
        return;
    }

    if (nextNumber > 10000) {
        alert("Todos os números já foram solicitados.");
        return;
    }

    const grantedNumber = nextNumber; // Concede o próximo número
    grantedNumbers.push({ user: username, number: grantedNumber });

    nextNumber++; // Incrementa para o próximo número

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
