const nextNumber = 1; // Inicializa com o primeiro número

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
    const data = { user: username, numbers: numbersToGrant };
    grantedNumbers.push(data);

    // Atualiza a lista na interface
    updateNumberList();
    document.getElementById('username').value = '';

    // Enviar os números para o servidor
    fetch('/save-numbers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
});

// Função para atualizar a lista
function updateNumberList() {
    const numberList = document.getElementById('numberList');
    numberList.innerHTML = ''; // Limpa a lista antes de atualizar

    grantedNumbers.forEach(record => {
        const li = document.createElement('li');
        li.textContent = `${record.user} recebeu os números: ${record.numbers.join(', ')}`;
        numberList.appendChild(li);
    });
}

// Função para carregar os números já concedidos ao carregar a página
function loadGrantedNumbers() {
    fetch('/get-numbers')
        .then(response => response.json())
        .then(data => {
            grantedNumbers = data; // Atualiza a lista com os números já concedidos
            updateNumberList(); // Atualiza a interface
        });
}

// Carregar os números ao iniciar a página
loadGrantedNumbers();
