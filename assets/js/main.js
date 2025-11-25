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

/*=============== SECTION NAVIGATION ===============*/
const sectionMap = {
    'home': 'home',
    'card': 'card-section',
    'agenda': 'agenda-section'
}

const showSection = (sectionName) => {
    const targetSectionId = sectionMap[sectionName]
    if (!targetSectionId) return

    const sections = document.querySelectorAll('.section')
    const navLinks = document.querySelectorAll('.nav__link[data-section]')

    sections.forEach(section => {
        if (section.id === targetSectionId) {
            section.classList.remove('hidden')
        } else {
            section.classList.add('hidden')
        }
    })

    navLinks.forEach(link => {
        if (link.getAttribute('data-section') === sectionName) {
            link.classList.add('active-link')
        } else {
            link.classList.remove('active-link')
        }
    })
}

const navLinks = document.querySelectorAll('.nav__link[data-section]')
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault()
        const sectionName = link.getAttribute('data-section')
        showSection(sectionName)
    })
})

/*=============== SORT AGENDA CHRONOLOGICALLY ===============*/
const sortAgendaChronologically = () => {
    const agendaList = document.querySelector('.agenda__list')
    if (!agendaList) return

    const items = Array.from(agendaList.querySelectorAll('.agenda__item'))
    
    items.sort((a, b) => {
        const dayA = parseInt(a.getAttribute('data-day') || a.querySelector('.agenda__day').textContent.trim())
        const dayB = parseInt(b.getAttribute('data-day') || b.querySelector('.agenda__day').textContent.trim())
        return dayA - dayB
    })

    items.forEach(item => agendaList.appendChild(item))
}

// Sort agenda when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', sortAgendaChronologically)
} else {
    sortAgendaChronologically()
}

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

const employeeCodes = {
    '101': 'Алтандуулга',
    '102': 'Алтанцэцэг',
    '103': 'Бадмаараг',
    '104': 'Бат-Оргил',
    '105': 'Дарамбазар',
    '106': 'Инабат',
    '107': 'Лхагвадорж',
    '108': 'Лхагвасугар',
    '109': 'Мягмарсүрэн',
    '110': 'Мөнхзул',
    '111': 'Намхай',
    '112': 'Нандинзаяа',
    '113': 'Номин',
    '114': 'Нямхүү',
    '115': 'Одбаяр Даваацэрэн',
    '116': 'Оюунтунгалаг',
    '117': 'Пүрэвсүрэн',
    '118': 'Солонго',
    '119': 'Тэнгис',
    '120': 'Төгөлдөрчимэг',
    '121': 'Энхманлай',
    '122': 'Энхтүвшин'
}

let currentEmployeeName = '';
const STORAGE_KEY = 'greetEmployeeName';
const storedEmployeeName = localStorage.getItem(STORAGE_KEY);

if (storedEmployeeName) {
    currentEmployeeName = storedEmployeeName;
    loginPage.classList.add('hidden');
    mainContent.classList.remove('hidden');
}

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
        localStorage.setItem(STORAGE_KEY, currentEmployeeName);
        window.location.href = `greeting.html?name=${encodeURIComponent(currentEmployeeName)}`;

    } else {
        errorMessage.textContent = 'Буруу код. Дахин оролдоно уу.';
    }
});

/*=============== GREET BUTTON ===============*/
const greetButton = document.getElementById('greet-button');
if (greetButton) {
    greetButton.addEventListener('click', (e) => {
        e.preventDefault();
        const employeeName = localStorage.getItem(STORAGE_KEY) || currentEmployeeName;
        if (employeeName) {
            window.location.href = `greeting.html?name=${encodeURIComponent(employeeName)}`;
        } else {
            window.location.href = 'greeting.html';
        }
    });
}

/*=============== TODAY'S EVENT MODAL ===============*/
const navNotification = document.getElementById('nav-notification')
const eventModal = document.getElementById('event-modal')
const eventModalOverlay = document.getElementById('event-modal-overlay')
const eventModalClose = document.getElementById('event-modal-close')
const eventModalDay = document.getElementById('event-modal-day')
const eventModalBody = document.getElementById('event-modal-body')

const getCurrentDate = () => {
    const now = new Date()
    const currentMonth = now.getMonth() + 1
    const currentDay = now.getDate()
    
    if ((currentMonth === 11 && currentDay >= 24 && currentDay <= 28) || 
        (currentMonth === 12 && currentDay >= 1 && currentDay <= 31)) {
        return { month: currentMonth, day: currentDay }
    }
    return null
}

const findTodayEvent = () => {
    const today = getCurrentDate()
    if (!today) return null

    const agendaItems = document.querySelectorAll('.agenda__item')
    const todayEvents = []

    agendaItems.forEach(item => {
        const itemMonth = parseInt(item.getAttribute('data-month')) || 12 // Default 12 сар
        const itemDay = parseInt(item.getAttribute('data-day'))
        
        if (itemMonth === today.month && itemDay === today.day) {
            const activity = item.querySelector('.agenda__activity')?.textContent || ''
            const description = item.querySelector('.agenda__description')?.textContent || ''
            todayEvents.push({ activity, description, day: today.day, month: today.month })
        }
    })

    return todayEvents.length > 0 ? todayEvents : null
}

const showTodayEvent = () => {
    const events = findTodayEvent()
    const today = getCurrentDate()

    if (!today) {
        eventModalDay.textContent = ''
        eventModalBody.innerHTML = '<p class="event-modal__no-event">Ямар нэг үйл ажиллагаа байхгүй байна.</p>'
    } else {
        const monthName = today.month === 11 ? '11 сарын' : '12 сарын'
        eventModalDay.textContent = `${monthName} ${today.day} өдөр`
        
        if (events && events.length > 0) {
            eventModalBody.innerHTML = events.map(event => `
                <div class="event-modal__event">
                    <h3 class="event-modal__activity">${event.activity}</h3>
                    <p class="event-modal__description">${event.description}</p>
                </div>
            `).join('')
        } else {
            eventModalBody.innerHTML = '<p class="event-modal__no-event">Өнөөдөр тусгай үйл ажиллагаа байхгүй байна.</p>'
        }
    }

    eventModal.classList.remove('hidden')
}

const hideEventModal = () => {
    eventModal.classList.add('hidden')
}

if (navNotification) {
    navNotification.addEventListener('click', (e) => {
        e.stopPropagation()
        showTodayEvent()
    })
}

if (eventModalOverlay) {
    eventModalOverlay.addEventListener('click', hideEventModal)
}

if (eventModalClose) {
    eventModalClose.addEventListener('click', hideEventModal)
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !eventModal.classList.contains('hidden')) {
        hideEventModal()
    }
})
