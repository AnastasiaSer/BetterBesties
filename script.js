const calendar = document.getElementById('calendar');
const monthYear = document.getElementById('monthYear');
const calendarPage = document.getElementById('calendarPage');
const dayPage = document.getElementById('dayPage');
const dayTitle = document.getElementById('dayTitle');
const accordion = document.getElementById('accordion');

let currentDate = new Date();
let completedDays = {}; // structure: { "year-month-day": { fitness: true/false, food: true/false, selfcare: true/false } }
let selectedDay = null;

const tasks = {
    fitness: [
        "💪 Stretching",
        "🚶 Walk 5k steps",
        "🤸 Push-ups",
        "🧘 Yoga",
        "💃 Dance"
    ],
    food: [
        "💧 Drink 2L water",
        "🍎 Eat fruit",
        "🍔 Avoid junk",
        "🍳 Cook at home",
        "🥐 Have breakfast"
    ],
    selfcare: [
        "🧘 Meditate",
        "📖 Read 10 pages",
        "📓 Journal",
        "💆 Skincare",
        "😴 Sleep 8h"
    ]
};

function renderCalendar() {
    calendar.innerHTML = "";

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth(); 
    const displayMonth = month + 1; 

    monthYear.textContent = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Empty cells before first day
    for (let i = 0; i < firstDay; i++) {
        calendar.innerHTML += "<div></div>";
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('day-wrapper');

        const div = document.createElement('div'); 
        const key = `${year}-${displayMonth}-${day}`;
        let barsContainer = document.createElement('div');
        let bar = document.createElement('div');
        let bar2 = document.createElement('div');
        let bar3 = document.createElement('div');
        bar.classList.add("bar");
        bar2.classList.add("bar");
        bar3.classList.add("bar");

        barsContainer.classList.add('bars-container');
        
        div.innerHTML = `<span>${day}</span>`;
        
        if (completedDays[key]) {
            div.classList.add('highlight');

            console.log("Completed days: " , completedDays);

            ["fitness", "food", "selfcare"].forEach(cat => {
                if (completedDays[key][cat]) {
                    switch(cat) {
                        case "fitness":
                            bar.classList.add("fitness");
                            break;
                        case "food":
                            bar2.classList.add("food")
                            break;
                        case "selfcare":
                            bar3.classList.add("selfcare")
                            break;
                        default:
                    }
                    console.log("cat: "+ cat);
                    console.log("key: "+ key);
                    
                    barsContainer.appendChild(bar);
                    barsContainer.appendChild(bar2);
                    barsContainer.appendChild(bar3);
                }
            });

            div.appendChild(barsContainer);
            console.log(barsContainer);
        }

        div.onclick = () => openDay(key);
        wrapper.appendChild(div);
        calendar.appendChild(wrapper);
    }
}

function changeMonth(delta) {
    currentDate.setMonth(currentDate.getMonth() + delta);
    renderCalendar();
}

function openDay(key) {
    selectedDay = key;
    dayTitle.textContent = "Tasks for " + key;

    calendarPage.classList.add('hidden');
    dayPage.classList.remove('hidden');

    accordion.innerHTML = "";

    Object.keys(tasks).forEach(category => {
        const item = document.createElement('div');
        item.className = "accordion-item";

        const header = document.createElement('div');
        header.className = "accordion-header";
        header.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        item.appendChild(header);

        const content = document.createElement('div');
        content.className = "accordion-content";

        tasks[category].forEach(task => {
            const taskDiv = document.createElement('div');
            taskDiv.className = "task-item";
            taskDiv.textContent = task;
            taskDiv.onclick = () => taskDiv.classList.toggle("checked");
            content.appendChild(taskDiv);
        });

        item.appendChild(content);

        header.onclick = () => content.classList.toggle("active");

        accordion.appendChild(item);
    });
}

function backToCalendar() {
    dayPage.classList.add('hidden');
    calendarPage.classList.remove('hidden');
    renderCalendar();
}

function confirmDay() {
    if (!completedDays[selectedDay]) {
        completedDays[selectedDay] = { fitness: false, food: false, selfcare: false };
    }

    ["fitness", "food", "selfcare"].forEach(cat => {
        const items = [...accordion.querySelectorAll(".accordion-item")];
        const catDiv = items.find(c => c.querySelector(".accordion-header").textContent.toLowerCase() === cat);
        if (catDiv) {
            const checked = catDiv.querySelectorAll(".task-item.checked").length > 0;
            
            // Only update to true if tasks are checked
            if (checked) {
                completedDays[selectedDay][cat] = true;
            }
        }
    });

    backToCalendar();
}


renderCalendar();
