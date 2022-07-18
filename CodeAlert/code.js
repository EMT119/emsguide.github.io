let codeStatus = {
	timerRunning: false,
	timer: {
		hours: 0,
		minutes: 0,
		seconds: 0,
	},
	pulseCheck: {
		minutes: 0,
		seconds: 5,
	},
};

let currentPulseCheck;

let events = [];

const date = new Date();

const formattedDate = () => {
	let hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
	let minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
	return `${hours}:${minutes}`;
};

const codeStartBtn = document.getElementById("startCode");
const codeStopBtn = document.getElementById("stopCode");

codeStartBtn.addEventListener("click", (e) => {
	codeStartBtn.disabled = true;
	codeStopBtn.disabled = false;
	codeStatus.timerRunning = true;
	events.push(`Code started at ${formattedDate()}`);
});

codeStopBtn.addEventListener("click", () => {
	let reason = prompt("What reason was code stopped? ROSC or Priority 4?");
	events.push(`Code stopped at ${formattedDate()}. ${reason}`);
	codeStatus.timerRunning = false;
});

/*Pulse Check Modal */

const pulseBtn = document.getElementById("pulseCheckPulse");
const noPulseBtn = document.getElementById("pulseCheckNoPulse");

pulseBtn.addEventListener("click", () => {
	currentPulseCheck = "Pulse";
	console.log("Pulse Btn clicked");
	noPulseBtn.disabled = false;
	pulseBtn.disabled = true;
});

noPulseBtn.addEventListener("click", () => {
	currentPulseCheck = "No pulse";
	noPulseBtn.disabled = true;
	pulseBtn.disabled = false;
});

document.getElementById("saveCheck").addEventListener("click", () => {
	let rhythm = document.getElementById("cardiacRhythm").value;
	events.push(`Pulse Check at ${formattedDate()}: ${currentPulseCheck} with ${rhythm}`);
	document.getElementById("pulseModal").style.display = "none";
});

document.getElementById("resetCheck").addEventListener("click", () => {
	codeStatus.pulseCheck.minutes = 0;
	codeStatus.pulseCheck.seconds = 30;
	document.getElementById("pulseModal").style.display = "none";
});

document.querySelectorAll(".defibrillate").forEach((e) => {
	e.addEventListener("click", (btnValue) => {
		events.push(`Defibrillation at ${formattedDate()} with ${btnValue.target.value} Joules`);
	});
});

document.querySelectorAll(".procedure").forEach((e) => {
	e.addEventListener("click", (btn) => {
		events.push(`${btn.target.value} performed at ${formattedDate()}`);
	});
});

/*Pulse Check Timer */

setInterval(() => {
	//Pulse Check Timer
	if (codeStatus.timerRunning === true) {
		if (codeStatus.pulseCheck.seconds > 0) {
			codeStatus.pulseCheck.seconds--;
		} else if (codeStatus.pulseCheck.minutes !== 0) {
			codeStatus.pulseCheck.minutes--;
			codeStatus.pulseCheck.seconds = 59;
		} else {
			pulseBtn.disabled = false;
			noPulseBtn.disabled = false;
			document.getElementById("pulseModal").style.display = "block";
			codeStatus.pulseCheck.seconds = 30;
		}

		let pulseCheckFormat = {
			seconds: codeStatus.pulseCheck.seconds < 10 ? `0${codeStatus.pulseCheck.seconds}` : codeStatus.pulseCheck.seconds,
		};

		document.getElementById("pulseCheck").innerText = `${codeStatus.pulseCheck.minutes}:${pulseCheckFormat.seconds}`;
	}

	//Code Timer
	if (codeStatus.timerRunning === true) {
		if (codeStatus.timer.seconds < 60) {
			//seconds formatter
			codeStatus.timer.seconds++;
		} else {
			codeStatus.timer.minutes++;
			codeStatus.timer.seconds = 0;
		}

		if (codeStatus.timer.minutes === 60) {
			codeStatus.timer.hours++;
			codeStatus.timer.minutes = 0;
		}
	}

	let timerFormat = {
		seconds: codeStatus.timer.seconds < 10 ? `0${codeStatus.timer.seconds}` : codeStatus.timer.seconds,
		minutes: codeStatus.timer.minutes < 10 ? `0${codeStatus.timer.minutes}` : codeStatus.timer.minutes,
		hours: codeStatus.timer.hours < 10 ? `0${codeStatus.timer.hours}` : codeStatus.timer.hours,
	};

	document.getElementById("codeTimer").innerText = `${timerFormat.hours}:${timerFormat.minutes}:${timerFormat.seconds}`;
}, 1000);
