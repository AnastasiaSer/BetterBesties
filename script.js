const calendar = document.getElementById('calendar');
const monthYear = document.getElementById('monthYear');
const calendarPage = document.getElementById('calendarPage');
const dayPage = document.getElementById('dayPage');
const dayTitle = document.getElementById('dayTitle');
const tasksContainer = document.getElementById('tasksContainer');

let currentDate = new Date();
let completedDays = {};
let selectedDay = null;

const tasks = {
	fitness: ["Stretching", "Walk 5k steps", "Push-ups", "Yoga", "Dance"],
	food: ["Drink 2L water", "Eat fruit", "Avoid junk", "Cook at home", "Have breakfast"],
	selfcare: ["Meditate", "Read 10 pages", "Journal", "Skincare", "Sleep 8h"]
};

const emojiMap = {
	fitness: ["💪", "🚶", "🤸", "🧘", "💃"],
	food: ["💧", "🍎", "🚫🍟", "🍳", "🥣"],
	selfcare: ["🧘‍♀️", "📖", "📓", "🧴", "😴"]
};

function renderCalendar() {
	calendar.innerHTML = "";
	const year = currentDate.getFullYear();
	const month = currentDate.getMonth();
	monthYear.textContent = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

	const firstDay = new Date(year, month, 1).getDay();
	const daysInMonth = new Date(year, month + 1, 0).getDate();

	for (let i = 0; i < firstDay; i++) {
		calendar.innerHTML += "<div></div>";
	}

	for (let day = 1; day <= daysInMonth; day++) {
		const div = document.createElement('div');
		div.innerHTML = `<span>${day}</span>`;
		const key = `${year}-${month}-${day}`;
		if (completedDays[key]) div.classList.add('highlight');
		div.onclick = () => openDay(key);
		calendar.appendChild(div);
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
}

function backToCalendar() {
	dayPage.classList.add('hidden');
	calendarPage.classList.remove('hidden');
	renderCalendar();
}

function toggleAccordion(header, type) {
	const body = header.nextElementSibling;
	body.classList.toggle("open");

	if (body.innerHTML.trim() === "") {
		tasks[type].forEach((t, i) => {
			const div = document.createElement("div");
			div.className = "task-item";
			div.innerHTML = `<span class="emoji">${emojiMap[type][i]}</span> <span>${t}</span>`;
			div.onclick = () => div.classList.toggle("checked");
			body.appendChild(div);
		});
	}
}

function confirmDay() {
	completedDays[selectedDay] = true;
	backToCalendar();
}

renderCalendar();
