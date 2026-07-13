// ========================================
// Mission Console Logger
// ========================================

function logMessage(message) {

    const consoleOutput = document.getElementById("console-output");

    const time = new Date().toLocaleTimeString();

    const log = document.createElement("div");

    log.className = "console-message";

    log.textContent = `[${time}] ${message}`;

    consoleOutput.appendChild(log);

    // Automatically scroll to the newest message
    consoleOutput.scrollTop = consoleOutput.scrollHeight;

    // Keep only the latest 100 messages
    while (consoleOutput.children.length > 100) {
        consoleOutput.removeChild(consoleOutput.firstChild);
    }
}