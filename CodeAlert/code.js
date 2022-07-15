let codeStatus = {
	timerRunning: false,
	timer: {
		hours: 0,
		minutes: 0,
		seconds: 0,
	},
	pulseCheck: {
		minutes: 0,
		seconds: 1,
	},
};
let events = [];

document.getElementById("startCode").addEventListener("click", (e) => {
	document.getElementById("startCode").disabled = true;
	const date = new Date();
	codeStatus.timerRunning = true;
	events.push(`Code started at ${date.getHours()}:${date.getMinutes()}`);
});

setInterval(() => {
	//Pulse Check Timer
	if (codeStatus.timerRunning === true) {
		if (codeStatus.pulseCheck.seconds > 0) {
			codeStatus.pulseCheck.seconds--;
		} else if (codeStatus.pulseCheck.minutes !== 0) {
			codeStatus.pulseCheck.minutes--;
			codeStatus.pulseCheck.seconds = 59;
		} else {
			document.getElementById("pulseModal").style.display = "block";
			codeStatus.pulseCheck.minutes = 2;
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
