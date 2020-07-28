const services =document.getElementById("services")

var elements =services.innerHTML.trim().split("")


for( let i = 0;i<elements.length; i++){
    elements[0].style.backgroundColor = "#7159c1"
}


console.log(services)

/*for (let i = 0; i < status.length; i++) {
    status[0].style.backgroundColor = "#7159c1"
    status[1].style.backgroundColor = "#fd951f"
    status[2].style.backgroundColor = "#04d361"
}

for (let i = 0; i < card.length; i++) {
    card[i].addEventListener("mouseenter", function () {
        if (card[i] == starter) {
            card[i].style.border = "1px solid #7159c1";
        } else if (card[i] == launchbase) {
            card[i].style.border = "1px solid #fd951f";
        } else if (card[i] == gostack) {
            card[i].style.border = "1px solid #04d361";
        }
        card[i].addEventListener("mouseleave", function () {
            card[i].style.border = " none";
        })
    })

}
for (let cards of card) {
    cards.addEventListener("click", function () {
        const videoId = cards.getAttribute("id")
        window.location.href = `/course/${videoId}`
    })
}
*/