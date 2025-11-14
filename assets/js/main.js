/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

/* Menu show */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

/* Menu hidden */
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () => {
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== DAY COUNTER FOR CHRISTMAS ===============*/
const titleData = document.getElementById('title-data'),
    numberData = document.getElementById('number-data'),
    textData = document.getElementById('text-data'),
    msgChristmas = document.getElementById('msg-christmas')

const loginPage = document.getElementById('login-page'),
    mainContent = document.getElementById('main-content'),
    codeInput = document.getElementById('code-input'),
    submitCodeBtn = document.getElementById('submit-code'),
    errorMessage = document.getElementById('error-message')

const invitationModal = document.getElementById('invitation-modal'),
    modalMessage = document.getElementById('modal-message'),
    invitationModalClose = document.getElementById('invitation-modal-close'),
    modalContinueButton = document.getElementById('modal-continue-button')

const employeeCodes = {
    '123': 'Баярсайхан',
    '456': 'Мөнхбат',
    '789': 'Уранчимэг'
}

let currentEmployeeName = '';

const christmasCountdown = () => {
    let now = new Date(),
        currentMonth = now.getMonth() + 1,
        currentDay = now.getDate()

    let nextChristmasYear = now.getFullYear()

    if (currentMonth == 12 && currentDay > 31) {
        nextChristmasYear += 1
    }

    let nextChristmasDate = `Dec 31, ${nextChristmasYear} 00:00:00`,
        christmasDay = new Date(nextChristmasDate),
        timeLeft = christmasDay - now

    let days = 0,
        hours = 0,
        minutes = 0,
        seconds = 0

    // Don't calculate the time left if it is Christmas day
    if (currentMonth != 12 || (currentMonth == 12 && currentDay != 31)) {
        days = Math.floor(timeLeft / 1000 / 60 / 60 / 24)
        hours = Math.floor(timeLeft / 1000 / 60 / 60) % 24
        minutes = Math.floor(timeLeft / 1000 / 60) % 64
        seconds = Math.floor(timeLeft / 1000) % 64
    }

    // Show missing days
    numberData.innerHTML = days < 10 ? `0${days}` : days
    textData.innerHTML = 'өдөр'

    // Show missing hours
    if (currentDay == 24) {
        numberData.innerHTML = hours < 10 ? `0${hours}` : hours
        textData.innerHTML = 'Hours'
    }

    // Show missing minutes. Countdown, 0 hours left, show minutes (00:59)
    if (currentDay == 24 && hours === 0) {
        numberData.innerHTML = minutes < 10 ? `0${minutes}` : minutes
        textData.innerHTML = 'Minutes'
    }

    // Show missing seconds. Countdown, 0 hours & 0 minutes left, show seconds (00:00:59)
    if (currentDay == 24 && hours === 0 && minutes === 0) {
        numberData.innerHTML = seconds < 10 ? `0${seconds}` : seconds
        textData.innerHTML = 'Seconds'
    }

    // Show message on Christmas Day
    if (currentMonth == 12 && currentDay == 31) {
        titleData.style.display = 'none'
        msgChristmas.style.display = 'block'
        msgChristmas.innerHTML = `Эрхэм ${currentEmployeeName}, Зул сарын баярын мэнд хүргэе!`
    }

    if (currentMonth == 12 && currentDay == 26) {
        titleData.style.display = 'block'
        msgChristmas.style.display = 'none'
    }
}

setInterval(christmasCountdown, 1000)


submitCodeBtn.addEventListener('click', () => {
    const code = codeInput.value;
    if (employeeCodes[code]) {
        currentEmployeeName = employeeCodes[code];
        errorMessage.textContent = '';
        loginPage.classList.add('hidden');

        modalMessage.innerHTML = `Эрхэм ${currentEmployeeName}, Шинэ жилийн мэнд хүргэе!`;
        invitationModal.classList.add('show-modal');

    } else {
        errorMessage.textContent = 'Буруу код. Дахин оролдоно уу.';
    }
});

// Close modal when clicking on (x)
invitationModalClose.addEventListener('click', () => {
    invitationModal.classList.remove('show-modal');
    mainContent.classList.remove('hidden');
    christmasCountdown();
    setInterval(christmasCountdown, 1000);
});

// Close modal when clicking outside of it
window.addEventListener('click', (event) => {
    if (event.target == invitationModal) {
        invitationModal.classList.remove('show-modal');
        mainContent.classList.remove('hidden');
        christmasCountdown();
        setInterval(christmasCountdown, 1000);
    }
});

// Continue to main content from modal button
modalContinueButton.addEventListener('click', () => {
    invitationModal.classList.remove('show-modal');
    mainContent.classList.remove('hidden');
    christmasCountdown();
    setInterval(christmasCountdown, 1000);
});