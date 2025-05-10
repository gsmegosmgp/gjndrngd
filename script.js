document.addEventListener("DOMContentLoaded", function() {
    let stopwatchInterval;
    let stopwatchSeconds = 0;
    let isStopwatchRunning = false;

    const stopwatchDisplay = document.getElementById("stopwatchDisplay");
    const tonDisplay = document.getElementById("tonDisplay");

    const startStopwatch = document.getElementById("startStopwatch");
    const stopStopwatch = document.getElementById("stopStopwatch");
    const resetStopwatch = document.getElementById("resetStopwatch");
    const getTonPrice = document.getElementById("getTonPrice");

    const tabs = document.querySelectorAll(".tab-btn");
    const contents = document.querySelectorAll(".tab-content");

    tabs.forEach(tab => {
        tab.addEventListener("click", function() {
            tabs.forEach(t => t.classList.remove("active"));
            contents.forEach(c => c.classList.remove("active"));

            tab.classList.add("active");
            document.getElementById(tab.dataset.target).classList.add("active");
        });
    });

    function formatTime(seconds) {
        const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
        const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
        const secs = String(seconds % 60).padStart(2, "0");
        return ${hrs}:${mins}:${secs};
    }

    function startStopwatchFunc() {
        if (!isStopwatchRunning) {
            stopwatchInterval = setInterval(() => {
                stopwatchSeconds++;
                stopwatchDisplay.textContent = formatTime(stopwatchSeconds);
            }, 1000);
            isStopwatchRunning = true;
        }
    }

    function stopStopwatchFunc() {
        clearInterval(stopwatchInterval);
        isStopwatchRunning = false;
    }

    function resetStopwatchFunc() {
        stopStopwatchFunc();
        stopwatchSeconds = 0;
        stopwatchDisplay.textContent = "00:00:00";
    }

    startStopwatch.addEventListener("click", startStopwatchFunc);
    stopStopwatch.addEventListener("click", stopStopwatchFunc);
    resetStopwatch.addEventListener("click", resetStopwatchFunc);

    async function fetchTonPrice() {
        try {
            const response = await fetch("https://api.bybit.com/v2/public/tickers?symbol=TONUSDT");
            const data = await response.json();
            const price = data.result[0].last_price;
            tonDisplay.textContent = ${price} USDT;
        } catch (error) {
            tonDisplay.textContent = "Ошибка!";
            console.log("Ошибка при получении курса TON:", error);
        }
    }

    getTonPrice.addEventListener("click", fetchTonPrice);
});
