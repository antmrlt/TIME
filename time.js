let intervalId = null;

function startTimestamp(format, element) {
    if (intervalId) clearInterval(intervalId);

    let options = document.querySelectorAll('.options');
    options.forEach(option => {
        option.classList.remove('selected');
        option.classList.add('unselected');
    });

    element.classList.add('selected');
    element.classList.remove('unselected');

    const updateTime = () => {
        let timeStr = '';
        const now = new Date();

        switch (format) {
            case 'unix':
                timeStr = Math.round(Date.now() / 1000);
                break;
            case 'iso':
                timeStr = now.toISOString();
                break;
            case 'us':
                timeStr = now.toLocaleString('en-US');
                break;
            case 'european':
                timeStr = now.toLocaleString('en-GB');
                break;
            case 'rfc1123':
                timeStr = now.toUTCString();
                break;
            case 'military':
                timeStr = now.toLocaleString('en-GB', { hour12: false });
                break;
            default:
                timeStr = 'Invalid format';
        }

        document.getElementById('time').innerHTML = timeStr;
    };

    updateTime();
    intervalId = setInterval(updateTime, 1000);
}

startTimestamp('unix', document.querySelector('.selected'));

function menu() {
    const timeContainer = document.querySelector('.time-container');
    const menu = document.querySelector('.menu');

    if (timeContainer.style.width === '100%') {
        timeContainer.style.width = '80%';
        menu.style.width = '20%';
    } else {
        timeContainer.style.width = '100%';
        menu.style.width = '0';
    }
}

function chevron() {
    const chevronRight = document.getElementById('chevron-right');
    const chevronLeft = document.getElementById('chevron-left')

    if (chevronLeft.style.display === 'none') {
        chevronLeft.style.display = 'block';
        chevronRight.style.display = 'none';
    } else {
        chevronRight.style.display = 'block';
        chevronLeft.style.display = 'none';
    }
}