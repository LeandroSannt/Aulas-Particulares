const currentPage =location.pathname
const menuItems = document.querySelectorAll("header .menu a ")

for(item of menuItems){
    if(currentPage .includes(item.getAttribute("href"))){
        item.classList.add("active")
}
}


const formDelete =document.querySelector("#form-delete")
console.log(formDelete)
formDelete.addEventListener("submit",function(event){

const confirmation = confirm("Deseja Deletar?")
if(!confirmation){
event.preventDefault()
}
})