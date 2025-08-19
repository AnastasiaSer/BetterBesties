const calendar = document.getElementById('calendar');
const monthYear = document.getElementById('monthYear');
const calendarPage = document.getElementById('calendarPage');
const dayPage = document.getElementById('dayPage');
const dayTitle = document.getElementById('dayTitle');
const accordion = document.getElementById('accordion');

let currentDate = new Date();
let completedDays = {};
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

	// switch views
	calendarPage.classList.add('hidden');
	dayPage.classList.remove('hidden');

	// build accordion
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

		header.onclick = () => {
			content.classList.toggle("active");
		};

		accordion.appendChild(item);
	});
}

function backToCalendar() {
	dayPage.classList.add('hidden');
	calendarPage.classList.remove('hidden');
	renderCalendar();
}

function confirmDay() {
	completedDays[selectedDay] = true;
	backToCalendar();
}

renderCalendar();
