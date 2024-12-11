// Mapeamento de IDs para nomes dos técnicos
const tecnicos = {
    1: 'andreilson',
    2: 'pedro',
    3: 'everton',
    4: 'juliano',
    5: 'julio cesar'
};

// Função para gerar o QR Code
document.getElementById('gerarQRCodeBtn').addEventListener('click', function() {
    // Lê o ID do técnico inserido no campo de entrada
    const tecnicoId = parseInt(document.getElementById('tecnicoId').value.trim());

    // Verifica se o ID é válido (1 a 5)
    if (tecnicoId >= 1 && tecnicoId <= 5) {
        // Pega o nome do técnico baseado no ID
        const nomeTecnico = tecnicos[tecnicoId];

        // Obtém o container onde o QR Code será exibido
        const qrCodeContainer = document.getElementById('qrCode');
        
        // Limpa qualquer conteúdo existente no container de QR Code
        qrCodeContainer.innerHTML = '';

        // Gerar a URL para o QR Code (vai redirecionar para a página de avaliação)
        const qrCodeUrl = `avaliacao.html?id=${tecnicoId}`;

        // Usar a biblioteca QRCode para gerar o QR Code
        QRCode.toCanvas(qrCodeContainer, qrCodeUrl, function (error) {
            if (error) {
                console.error('Erro ao gerar o QR Code', error);
            }
        });

        // Exibir o nome do técnico ao lado do QR Code
        qrCodeContainer.insertAdjacentHTML('beforeend', `<p>Escaneie para avaliar o técnico: ${nomeTecnico}</p>`);
    } else {
        // Alerta em caso de ID inválido
        alert('Por favor, insira um ID válido (1 a 5).');
    }
});
