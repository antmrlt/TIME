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
        menu.style.borderRight = '1px solid #D4D4D4';
    } else {
        timeContainer.style.width = '100%';
        menu.style.width = '0';
        menu.style.borderRight = 'none';
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

function copyTime() {
    const timeText = document.getElementById('time').innerText;
    const copyIcon = document.getElementById('copyIcon');

    navigator.clipboard.writeText(timeText).then(() => {
        copyIcon.src = "check.svg"; // Change to checkmark icon
        
        setTimeout(() => {
            copyIcon.src = "copy.svg"; // Revert back after 3 seconds
        }, 3000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

function updateCSS() {
    const bgColorInput = document.getElementById('bgColorInput');
    const textColorInput = document.getElementById('textColorInput');
    const menuColorInput = document.getElementById('menuColorInput');

    const defaultBgColor = '#FFFFFF';
    const defaultTextColor = '#000000';
    const defaultMenuColor = '#E4E4E4';

    const limitInputLength = (input) => {
        if (input) {
            input.addEventListener('input', () => {
                if (input.value.length > 6) {
                    input.value = input.value.slice(0, 6);
                }
            });
        }
    };

    limitInputLength(bgColorInput);
    limitInputLength(textColorInput);
    limitInputLength(menuColorInput);

    if (bgColorInput) {
        bgColorInput.addEventListener('input', () => {
            document.querySelector('.time-container').style.backgroundColor = bgColorInput.value ? `#${bgColorInput.value}` : defaultBgColor;
            document.querySelector('#chevron').style.backgroundColor = bgColorInput.value ? `#${bgColorInput.value}` : defaultBgColor;
            document.querySelector('.selected').style.backgroundColor = bgColorInput.value ? `#${bgColorInput.value}` : defaultBgColor;
        });
    }

    if (textColorInput) {
        textColorInput.addEventListener('input', () => {
            document.body.style.color = textColorInput.value ? `#${textColorInput.value}` : defaultTextColor;
        });
    }

    if (menuColorInput) {
        menuColorInput.addEventListener('input', () => {
            document.querySelector('.menu').style.backgroundColor = menuColorInput.value ? `#${menuColorInput.value}` : defaultMenuColor;
        });
    }
}

updateCSS();

function toggleCSSChanger() {
    const cssChanger = document.querySelector('.csschanger');
    const chevronHaut = document.getElementById('chevron-haut');
    const chevronBas = document.getElementById('chevron-bas');
    const chevron = document.querySelector('.chevron-csschanger');

    if (cssChanger.classList.contains('show')) {
        cssChanger.classList.remove('show');
        chevronHaut.style.display = 'block';
        chevronBas.style.display = 'none';
        chevron.style.bottom = '10px';
    } else {
        cssChanger.classList.add('show');
        chevronHaut.style.display = 'none';
        chevronBas.style.display = 'block';
        chevron.style.bottom = '90px';
    }
}

function hideNews() {
    const news = document.querySelector('.news');
    news.style.top = '-100px';
}