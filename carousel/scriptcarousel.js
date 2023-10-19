var slider = document.querySelector(".slide-wr");

document.getElementById("back").onclick = () => {
  const c = 33.33;
  let left = slider.style.transform.split("%")[0].split("(")[1];
  if (left) {
    var num = Number(left) + Number(c);
  } else {
    var num = Number(c);
  }
  slider.style.transform = `translateX(${num}%)`;

  if (left == -166.65) {
    slider.addEventListener("transitionend", myfunc);
    function myfunc() {
      this.style.transition = "none";
      this.style.transform = `translateX(-299.97%)`;
      slider.removeEventListener("transitionend", myfunc);
    }
  } else {
    slider.style.transition = "all 0.5s";
  }
};

document.getElementById("forward").onclick = () => {
  const c = -33.33;
  let left = slider.style.transform.split("%")[0].split("(")[1];
  if (left) {
    var num = Number(left) + Number(c);
  } else {
    var num = Number(c);
  }

  slider.style.transform = `translateX(${num}%)`;

  if (left == -299.97) {
    console.log("reached the border");
    slider.addEventListener("transitionend", myfunc);
    function myfunc() {
      this.style.transition = "none";
      this.style.transform = `translateX(-166.65%)`;
      slider.removeEventListener("transitionend", myfunc);
    }
  } else {
    slider.style.transition = "all 0.5s";
  }
};

const sliderChildren = document.getElementsByClassName("slide-wr")[0].children;
slider.style.transform = `translateX(${sliderChildren.length * -33.33}%)`;
Array.from(sliderChildren)
  .slice()
  .reverse()
  .forEach((child) => {
    let cln = child.cloneNode(true);
    cln.classList += " cloned before";
    slider.insertBefore(cln, sliderChildren[0]);
  });

Array.from(sliderChildren).forEach((child) => {
  let cln = child.cloneNode(true);
  if (child.classList.contains("cloned") === false) {
    cln.classList += " cloned after";
    slider.appendChild(cln);
  }
});
