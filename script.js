const nextNumber = 1; // Inicializa com o primeiro número
let grantedNumbers = [];

document.getElementById('requestNumber').addEventListener('click', () => {
    const username = document.getElementById('username').value.trim();
    const quantity = parseInt(document.getElementById('quantity').value);

    if (!username) {
        alert("Por favor, digite seu nome.");
        return;
    }

    // Concede os números conforme a quantidade solicitada
    const numbersToGrant = [];
    for (let i = 0; i < quantity; i++) {
        if (nextNumber <= 10000) {
            numbersToGrant.push(nextNumber);
            nextNumber++;
        } else {
            break; // Para se não houver mais números disponíveis
        }
    }

    // Adiciona os números concedidos ao array de registros
    grantedNumbers.push({ user: username, numbers: numbersToGrant });

    // Atualiza a lista na interface
    updateNumberList();
    document.getElementById('username').value = '';
});

function updateNumberList() {
    const numberList = document.getElementById('numberList');
    numberList.innerHTML = ''; // Limpa a lista antes de atualizar

    grantedNumbers.forEach(record => {
        const li = document.createElement('li');
        li.textContent = `${record.user} recebeu os números: ${record.numbers.join(', ')}`;
        numberList.appendChild(li);
    });
}
