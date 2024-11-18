const names = ["MIGUEL", "VIVIANA", "OMAR", "CATALINA", "GINNA", "DIEGO", "ALEX", 
    "KATA", "ERIKA", "BRAYAN", "LUCIA", "CARLOS", "JAVIER", "MAFE", "ARLY", "JUAN"];
let winners = [];

function startGame() {
const username = document.getElementById('username').value.toUpperCase();

if (!names.includes(username)) {
alert('Tu nombre no está en la lista.');
return;
}

const filteredNames = names.filter(name => name !== username && !winners.includes(name));

if (filteredNames.length === 0) {
alert('No hay suficientes participantes restantes para jugar.');
return;
}

document.getElementById('login').style.display = 'none';
document.getElementById('wheelCanvas').style.display = 'block';
drawWheel(filteredNames);
spinWheel(filteredNames);
}

function drawWheel(filteredNames, rotation = 0) {
const canvas = document.getElementById('wheelCanvas');
const ctx = canvas.getContext('2d');
const radius = canvas.width / 2;
const sliceAngle = (2 * Math.PI) / filteredNames.length;

ctx.clearRect(0, 0, canvas.width, canvas.height);

for (let i = 0; i < filteredNames.length; i++) {
const startAngle = rotation + i * sliceAngle;
const endAngle = startAngle + sliceAngle;

ctx.beginPath();
ctx.moveTo(radius, radius);
ctx.arc(radius, radius, radius, startAngle, endAngle);
ctx.fillStyle = `hsl(${(i * 360) / filteredNames.length}, 70%, 70%)`;
ctx.fill();
ctx.stroke();

// Add text
ctx.save();
const textAngle = startAngle + sliceAngle / 2;
ctx.translate(
radius + Math.cos(textAngle) * (radius / 1.5),
radius + Math.sin(textAngle) * (radius / 1.5)
);
ctx.rotate(textAngle);
ctx.fillStyle = "#000";
ctx.fillText(filteredNames[i], -ctx.measureText(filteredNames[i]).width / 2, 0);
ctx.restore();
}
}

function spinWheel(filteredNames) {
const canvas = document.getElementById('wheelCanvas');
const totalRotation = Math.random() * 360 + 360 * 5; // 5 full rotations + random
const duration = 3000; // Spin for 3 seconds
const startTime = performance.now();

function animateWheel(currentTime) {
const elapsed = currentTime - startTime;
const progress = Math.min(elapsed / duration, 1);
const easeOut = Math.pow(progress, 0.5); // Ease-out effect

const rotation = (totalRotation * easeOut) * (Math.PI / 180); // Convert to radians
drawWheel(filteredNames, rotation);

if (progress < 1) {
requestAnimationFrame(animateWheel);
} else {
// Show the winner after the spin
const winnerIndex = Math.floor((rotation / (2 * Math.PI)) * filteredNames.length) % filteredNames.length;
const winner = filteredNames[winnerIndex];
winners.push(winner);

document.getElementById('winner').innerText = `¡Ganador: ${winner}!`;
}
}

requestAnimationFrame(animateWheel);
}
