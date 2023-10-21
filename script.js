let canvas = document.getElementById("canvas");
canvas.width=window.innerWidth;
canvas.height =window.innerHeight;
// console.log(canvas);


const c =canvas.getContext("2d");

let drawColor= "black";
let prevPosition = null;
function onMouseDown(e){
    prevPosition =[e.clientX, e.clientY];
    c.strokeStyle = drawColor;
    c.lineWidth = 2;
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseup", onMouseUp);

}
function onMouseMove(e){
     let curPosition = [e.clientX, e.clientY];
     c.beginPath();
     c.moveTo(...prevPosition);
     c.lineTo(...curPosition);
     c.stroke();
     c.closePath();
     prevPosition = curPosition;
}
function onMouseUp(e){
    canvas.removeEventListener("mousemove", onMouseMove);
}