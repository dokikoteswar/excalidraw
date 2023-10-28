let intialPosition = null;

const history =[];
let historyIndex = -1;

function onMouseDown(e) {
 if (
    !(actions.circle || actions.rectangle || actions.eraser || actions.freehand || actions.line )) {
    return;
  }
  
  intialPosition ={x: e.clientX, y: e.clientY};
  startIndex = history.length-1;
  // c.beginPath();
  c.strokeStyle = formState.strokestyle;
  c.lineWidth =  formState.strokewidth;
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mouseup", onMouseUp);
}


function onMouseMove(e){
   const currentPosition ={x: e.clientX, y: e.clientY};
   if (actions.freehand) {
        drawFreeHand(currentPosition);
   }
   else if(actions.eraser){
        // resetToOriginalImage();
        drawEraser(currentPosition);
   }
   else if(actions.circle){
          resetToOriginalImage();
         drawCircle(currentPosition);
   }else if(actions.rectangle){
          resetToOriginalImage();
        drawRectangle(currentPosition)
   }else if(actions.line){
         resetToOriginalImage();
         drawLine(currentPosition);
         console.log("line");
   }
}


function onMouseUp(){
     history.push(c.getImageData(0,0, canvas.width, canvas.height))
    canvas.removeEventListener("mousemove", onMouseMove);
    canvas/removeEventListener("mouseup", onMouseUp);
}

canvas.addEventListener("mousedown", onMouseDown);

function resetToOriginalImage() {
  if (startIndex !== -1) {
    
      c.putImageData(history[startIndex], 0, 0);
  }
  else {
    
      c.clearRect(0, 0, canvas.width, canvas.height);
  }
}


function drawFreeHand(currentPosition){
    c.beginPath();
    c.moveTo(intialPosition.x , intialPosition.y);
    c.lineTo(currentPosition.x , currentPosition.y);
    c.lineCap = "round";
    c.lineJoin = "round";
    c.stroke();
    c.closePath();
    intialPosition = currentPosition;
}

function drawEraser(currentPosition){
    c.clearRect(currentPosition.x, currentPosition.y, 10,10)
}

function drawCircle(currentPosition){
  
  c.beginPath();
  const radius = Math.sqrt(
      (currentPosition.x - intialPosition.x) ** 2 +
      (currentPosition.y - intialPosition.y) ** 2
  );

  c.arc(intialPosition.x, intialPosition.y, radius, 0, 2 * Math.PI, true);
  c.stroke();
}
function drawRectangle(currentPosition){
  c.beginPath();
  // draw rectangle
  let width = currentPosition.x - intialPosition.x;
  let height = currentPosition.y - intialPosition.y;
  c.strokeRect(intialPosition.x, intialPosition.y, width, height);
}






function drawLine(currentPosition) {
  c.beginPath();
  c.moveTo(intialPosition.x, intialPosition.y);
  c.lineTo(currentPosition.x, currentPosition.y);
  c.stroke();
}

const undo = document.getElementById("undo");
const redo = document.getElementById("redo");

function onUndo() {
  if (historyIndex) {
    console.log(history)
    history.pop();
    historyIndex--;
    if (historyIndex === -1) {
      c.clearRect(0, 0, canvas.width, canvas.height);
    } else {
      // c.putImageData(history[historyIndex], 0, 0);
      c.putImageData(history[historyIndex], 0, 0);
    }
  }
}

// function onRedo() {
  
//  ctx.putImageData(drawingFuture[0], 0, 0);
//  drawingFuture.shift();
// }

undo.addEventListener("click", onUndo);
// redo.addEventListener("click", onRedo);