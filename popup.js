let itemArray = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : []
console.log(itemArray);
let chosen_note = document.querySelector('.chosen-note')
let shown = document.querySelector("#note")
let close_btn = document.querySelector(".close-btn")


close_btn.addEventListener("click", () => {
    chosen_note.style.display = "none";
})
document.querySelector('#add-button').addEventListener("click", () => {
    let item = document.querySelector('#input-text')
    if (item != "")
        createItem(item);
})

function createItem(item) {
    let itemVal = item.value;
    itemArray.push(itemVal);
    localStorage.setItem("items", JSON.stringify(itemArray))
    location.reload();

}
function displayItems() {
    let items = "";
    for (let i = 0; i < itemArray.length; i++) {
        items += `
        <div id = ${i} class="notes">
            <div class="content">
                <p>${itemArray[i]}</p>
            </div>
            <div>
                <i class="bi bi-trash"></i>
            </div> 
        </div>
        `
    }
    document.querySelector('.notes-container').innerHTML = items;
    deleteEventListener();
    viewEventListener();
}
function deleteEventListener() {
    let deleteBtn = document.querySelectorAll(".delete")
    deleteBtn.forEach((db, i) => {
        db.addEventListener("click", (e) => {
            deleteElement(i)
            e.stopPropagation()
        })

    })
    
}
function deleteElement(i) {
    itemArray.splice(i, 1);
    localStorage.setItem("items", JSON.stringify(itemArray));
    location.reload()
}
function viewEventListener() {
    let notes = document.querySelectorAll('.notes');

    notes.forEach((note,i) => {
        const content = note.children[0];
        const del = note.children[1];
        content.addEventListener("click", (e) => {

            chosen_note.style.display = "flex";
            shown.innerText = e.target.innerText;
        })
        del.addEventListener("click", (e) => {

            deleteElement(i);
        })
        
    })
}



window.onload = () => {
    displayItems()
}