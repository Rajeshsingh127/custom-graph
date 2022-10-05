async function localJson(){
    let data = await fetch("./data.json");
    let barData = await data.json();

    const barHolder = document.querySelector(".graph-bar");
    let max = barData[0];
    for(const value of barData){
        if(max.amount < value.amount){
            max = value;
        }
        barHolder.innerHTML += barMaker(value);
    }

    document.querySelector(`.bar-height.${max.day}`).classList.add('max-bar')

}


function barMaker(data){
    return `
        <div class="bar ">
            <span class="tooltip">$${data.amount}</span>
            <div class="bar-height ${data.day}" style="height:calc(${data.amount}px*3.4);"></div>
            <span class="bar-day">${data.day}</span>
        </div> 
          `;
}

localJson();




// animation on numbers

const totalMn = document.querySelectorAll(".total-counter");


const updateCounter = function(elm){ 
    const target = parseFloat(elm.getAttribute("data-max"));
    const speed = 100;
    let increment = Math.max(Math.trunc(target/speed),0.7);
    let count = parseInt(elm.textContent);

    if(count < target){
        
      elm.textContent = Math.ceil(count+increment);
      setTimeout(updateCounter,1,elm);
    }
    else{
        
        elm.textContent = target;
    }
}


totalMn.forEach(elm => {
    updateCounter(elm);
})
