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

    // Adiciona os números concedidos ao array de registros
    grantedNumbers.push
