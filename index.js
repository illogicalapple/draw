addEventListener("load", function() {
	const canvas = document.querySelector("canvas#draw");
	const context = canvas.getContext("2d");
	var mouseDown = false;
	canvas.addEventListener("mousedown", function() { mouseDown = true });
	canvas.addEventListener("mouseup", function() { mouseDown = false });
	context.strokeStyle = "black";
	context.lineCap = "round";
	context.lineWidth = 10;
	canvas.addEventListener("mousemove", function(event) {
		if(mouseDown) {
			context.beginPath();
			context.lineTo(event.clientX - 17.5, event.clientY - 92.5);
			context.stroke();
		}
	});
});
