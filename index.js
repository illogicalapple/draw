var drawing = [];
const DOWN = "DOWN";
const UP = "UP";
var redraw;
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
	redraw = function redraw(destroy) {
		context.strokeStyle = "black";
		context.lineCap = "round";
		context.lineWidth = 5;
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
					context.moveTo(x, y);
					[x, y] = element;
					context.lineTo(x, y);
					context.stroke();
				} else {
					[x, y] = destroy(element);
				}
			}
		}
	}
	document.addEventListener("mousedown", mouseDownEvent);
	document.addEventListener("mouseup", mouseUpEvent);
	document.addEventListener("touchstart", mouseDownEvent);
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
