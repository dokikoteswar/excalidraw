let canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext("2d");

const form = document.querySelector(".form");
const actionButtons = document.querySelectorAll("#activebuttons> .btn")

let formState = {
  strokewidth: 2,
  strokestyle: "black",
};

const actions ={
    freehand: false,
    rectangle: false,
    eraser: false,
    line: false,
    circle: false,
};



// menu
function toggleMenu() {
  form.classList.toggle("hide");
}

// memu inputs
function onInput(element) {
  const newValue = element.value;
  if (element.name === "strokewidth") {
    formState[element.name] = parseInt(newValue);
  } else {
    formState[element.name] = newValue;
  }
  console.log(formState);
}

function  onActionClick(element){
      const actionName = element.id;
      actionButtons.forEach(btn =>{
        if(btn.classList.contains("active") && btn.id != actionName){
            btn.classList.remove("active");
        }
      })
      element.classList.toggle("active")
      
      actionButtons.forEach(btn =>{
        const isActive = btn.classList.contains("active");
       
            actions[btn.id] = isActive;
            console.log()
    
      })
     

}