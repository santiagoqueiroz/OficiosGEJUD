let nextNumber = 1; // Inicializa com o primeiro número
let grantedNumbers = [];

document.getElementById('requestNumber').addEventListener('click', () => {
    const username = document.getElementById('username').value.trim();
    const quantity = parseInt(document.getElementById('quantity').value);

    // Validação dos inputs
    if (!username) {
        alert("Por favor, digite seu nome.");
        return;
    }

    if (isNaN(quantity) || quantity <= 0) {
        alert("Por favor, insira uma quantidade válida.");
        return;
    }

    if (nextNumber > 10000) {
        alert("Todos os números já foram solicitados.");
        disableRequestButton();
        return;
    }

    // Concede os números conforme a quantidade solicitada
    const numbersToGrant = grantNumbers(quantity);

    // Obtém a data e hora atual no fuso horário de Rio Branco (UTC-5)
    const date = new Date();
    const formattedDate = new Intl.DateTimeFormat('pt-BR', {
        timeZone: 'America/Rio_Branco',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }).format(date);

    // Adiciona os números concedidos ao array de registros
    grantedNumbers.push({
        user: username,
        numbers: numbersToGrant,
        timestamp: formattedDate
    });

    // Atualiza a lista na interface
    updateNumberList();
    document.getElementById('username').value = '';
});

function grantNumbers(quantity) {
    const numbersToGrant = [];
    for (let i = 0; i < quantity; i++) {
        if (nextNumber <= 10000) {
            numbersToGrant.push(nextNumber);
            nextNumber++;
        } else {
            break; // Para se não houver mais números disponíveis
        }
    }
    return numbersToGrant;
}

function updateNumberList() {
    const numberList = document.getElementById('numberList');
    numberList.innerHTML = '';

    grantedNumbers.forEach(record => {
        const li = document.createElement('li');
        li.textContent = `${record.user} recebeu os números: ${record.numbers.join(', ')} em ${record.timestamp}`;
        numberList.appendChild(li);
    });
}

function disableRequestButton() {
    document.getElementById('requestNumber').disabled = true;
}
