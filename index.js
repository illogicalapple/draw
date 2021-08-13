var mouseDown = false;
addEventListener("load", function() {
	const canvas = document.querySelector("canvas#draw");
	const context = canvas.getContext("2d");
	var x, y;
	canvas.addEventListener("mousedown", function() { mouseDown = true });
	canvas.addEventListener("mouseup", function() { mouseDown = false });
	canvas.width = canvas.getBoundingClientRect().width;
	canvas.height = canvas.getBoundingClientRect().height;
	addEventListener("resize", function() {
		canvas.width = canvas.getBoundingClientRect().width;
		canvas.height = canvas.getBoundingClientRect().height;
	});
	context.strokeStyle = "black";
	context.lineCap = "round";
	context.lineWidth = 10;
	canvas.addEventListener("mousemove", function(event) {
		if(mouseDown) {
			context.beginPath();
			context.moveTo(x, y);
			[x, y] = [event.clientX - 17.5, event.clientY - 92.5];
			context.lineTo(x, y);
			context.stroke();
		}
	});
});
