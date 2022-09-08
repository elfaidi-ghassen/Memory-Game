let btn = document.querySelector(".main-menu span")
let nameInput = document.querySelector(".main-menu input")
let menu = document.querySelector(".main-menu")
let nbTries = document.querySelector(".tries span")
let audioCorrect = document.querySelector(".correct")



btn.addEventListener("click", function() {
  let name = nameInput.value || 'Unknown'
  document.querySelector(".info .name span").innerHTML = name
  menu.remove()
})


let duration = 650
let tries = 0

let game = document.querySelector(".memory-game")

let elements = shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19])

function randInt(a, b) {
	return a + Math.floor(Math.random(b - a) * (b - a));
}

function shuffle(arr) {
	let shuffled = [];
	while (arr.length > 0) {
		let r = randInt(0, arr.length);
		shuffled.push(arr[r]);
		arr = arr.filter((_, i) => i != r);
	}
	return shuffled;
}

for(let i = 0; i < elements.length; i++) {
  game.children[i].style.order = elements[i]
}



Array.from(game.children).forEach(element => {
  element.addEventListener("click", function() {
    element.classList.add("flipped")
    let flipped = Array.from(document.querySelectorAll(".flipped")).filter(e => !e.classList.contains("done"))
    console.log(flipped);
    if (flipped.length === 2) {
      if (flipped[0].getAttribute("data-name") === flipped[1].getAttribute("data-name")) {
        flipped[0].classList.add("done")
        flipped[1].classList.add("done")
        audioCorrect.play()
      } else {

        setTimeout(
          function() {
            flipped.forEach(e => e.classList.remove("flipped"))
            tries++
            nbTries.innerHTML = tries
          }, duration);
      }
    }
    else if(flipped.length === 3) {
      flipped.forEach(e => e.classList.remove("flipped"))
      element.classList.add("flipped")
    }
    console.log(flipped);
  })
});
