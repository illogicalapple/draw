var drawing = [];
const DOWN = "DOWN";
const UP = "UP";
var redraw;
var functions = {
	normal: e => e,
	sine: (e, s, a) => [e[0] + Math.sin(Date.now() * s + e[1]) * a, e[1] + Math.sin(Date.now() * s + e[0]) * a]
};
addEventListener("load", function() {
	const canvas = document.querySelector("canvas#draw");
	const context = canvas.getContext("2d");
	var x, y, mouseDown;
	function mouseDownEvent(event) { [x, y, mouseDown] = [event.clientX - 17.5, event.clientY - 92.5, true]; drawing.push([x, y]); drawing.push(DOWN); };
	function mouseUpEvent() { mouseDown = false; drawing.push(UP); };
	function mouseMoveEvent(event) {
		if(mouseDown) {
			context.strokeStyle = "black";
			context.lineCap = "round";
			context.lineWidth = 5;
			context.beginPath();
			context.moveTo(x, y);
			[x, y] = [event.clientX - 17.5, event.clientY - 92.5];
			context.lineTo(x, y);
			context.stroke();
			drawing.push([x, y]);
		}
	};
	redraw = function redraw(destroy, ...args) {
		mouseDown = false;
		canvas.width += 0; //clear
		canvas.width = canvas.getBoundingClientRect().width;
		canvas.height = canvas.getBoundingClientRect().height;
		for(let element of drawing) {
			if(element === DOWN) {
				mouseDown = true;
			} else if(element === UP) {
				mouseDown = false;
			} else {
				if(mouseDown) {
					context.beginPath();
					context.strokeStyle = "black";
					context.lineCap = "round";
					context.lineWidth = 5;
					context.moveTo(x, y);
					[x, y] = destroy(element);
					context.lineTo(x, y);
					context.stroke();
				} else {
					[x, y] = destroy(element, ...args);
				}
			}
		}
	}
	canvas.addEventListener("mousedown", mouseDownEvent);
	document.addEventListener("mouseup", mouseUpEvent);
	canvas.addEventListener("touchstart", mouseDownEvent);
	document.addEventListener("touchend", mouseUpEvent);
	document.addEventListener("mousemove", mouseMoveEvent);
	document.addEventListener("touchmove", mouseMoveEvent);
	canvas.width = canvas.getBoundingClientRect().width;
	canvas.height = canvas.getBoundingClientRect().height;
	addEventListener("resize", function() {
		canvas.width = canvas.getBoundingClientRect().width;
		canvas.height = canvas.getBoundingClientRect().height;
		drawing = [];
	});
});
