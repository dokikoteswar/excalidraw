let pencil = document.getElementById("pencil");
let isPencilActive = false;

let colorPic = document.getElementById("color-picker");

colorPic.addEventListener("change", ()=>{
    drawColor =colorPic.value;
    console.log(drawColor);
})
function onPencilClick(){
       pencil.classList.toggle("active")
       isPencilActive = !isPencilActive;
       if(isPencilActive){
        canvas.style.cursor = "crosshair";
        canvas.addEventListener("mousedown", onMouseDown); 
       }
       else{
        canvas.style.cursor = "auto";
        canvas.removeEventListener("mousedown", onMouseDown); 
       }
}

pencil.addEventListener("click" , onPencilClick)