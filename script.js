function getAngles (t/*Date*/){
	let mSec = t.getTime() % 3600000;
	let hours = t.getHours()%12;
	hours = 360/12*(hours + mSec/1000/60/60);
	let minutes = 360/60*mSec/1000/60;
	let seconds = 360/60*mSec/1000;
	return [hours, minutes, seconds];
}
function updateHands(root){
	let t = new Date();
	let angles = getAngles(t);
	let seconds = root.querySelector(".hands .second");
	let minutes = root.querySelector(".hands .minute");
	let hours = root.querySelector(".hands .hour");
	seconds.style.transform = `rotate(${angles[2]}deg)`;
	minutes.style.transform = `rotate(${angles[1]}deg)`;
	hours.style.transform = `rotate(${angles[0]}deg)`;
}
function createDisplay(root){
	let container = root.querySelector(".display");
	let template = container.querySelector("div");
	for (let i=1; i<12; i++){
		let angle = 30*i;
		let clone = template.cloneNode(true);
		clone.style.transform = `rotate(${angle}deg)`;
		let span = clone.querySelector("span");
		span.style.transform = `rotate(${-angle}deg)`;
		span.innerText = i;
		container.appendChild(clone);
	}
}
function createTicks(root){
	let container = root.querySelector(".ticks");
	let template = container.querySelector("li");
	for (let i=1; i<30; i++){
		let angle = 6*i;
		let clone = template.cloneNode(true);
		clone.style.transform = `rotate(${angle}deg)`;
		if (i % 5 === 0) clone.classList.add("thick");
		container.appendChild(clone);
	}
	template.classList.add("thick");
}
function init(root){
	root = root || document.querySelector(".clock");
	createTicks(root);
	createDisplay(root);
	requestAnimationFrame(drawFrame);
	function drawFrame(){
		updateHands(root);
		requestAnimationFrame(drawFrame);
	}
}
init();