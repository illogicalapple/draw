addEventListener("load", function() {
	const canvas = document.querySelector("canvas#draw");
	const context = canvas.getContext("2d");
	var x, y, mouseDown;
	document.addEventListener("mousedown", function(event) { [x, y, mouseDown] = [event.clientX - 17.5, event.clientY - 92.5, true] });
	document.addEventListener("mouseup", function() { mouseDown = false });
	canvas.width = canvas.getBoundingClientRect().width;
	canvas.height = canvas.getBoundingClientRect().height;
	addEventListener("resize", function() {
		canvas.width = canvas.getBoundingClientRect().width;
		canvas.height = canvas.getBoundingClientRect().height;
	});
	context.strokeStyle = "black";
	context.lineCap = "round";
	context.lineWidth = 10;
	document.addEventListener("mousemove", function(event) {
		if(mouseDown) {
			context.beginPath();
			context.moveTo(x, y);
			[x, y] = [event.clientX - 17.5, event.clientY - 92.5];
			context.lineTo(x, y);
			context.stroke();
		}
	});
});
