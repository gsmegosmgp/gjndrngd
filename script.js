document.addEventListener("DOMContentLoaded", function() {
    const button = document.getElementById("sendDataButton");

    // Telegram WebApp API
    const tg = window.Telegram.WebApp;
    tg.expand(); // Разворачивает WebApp на полный экран

    button.addEventListener("click", function() {
        const data = {
            message: "Привет, это данные из Web App!",
            timestamp: new Date().toISOString()
        };

        tg.sendData(JSON.stringify(data));
        button.textContent = "Отправлено!";
        button.style.backgroundColor = "#2ecc71";
    });
});