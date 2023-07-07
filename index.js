import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, remove, onValue} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-ebbf6-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addBtn = document.getElementById("add-btn")
const shoppingList = document.getElementById("shopping-list")

onValue(shoppingListInDB, function(snapshot){
    
    if(snapshot.exists()) {
        let listItemsArray = Object.entries(snapshot.val())

        clearShoppingList()
        
        for (let i = 0; i< listItemsArray.length; i++) {
            let currentItem = listItemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            appendItemToShoppingListEl(currentItem)
        }
    } else {
        shoppingList.innerHTML = "No items here yet..."
    }

})

addBtn.addEventListener("click", function(){

    if (inputFieldEl.value){

        let inputValue  = inputFieldEl.value
        
        push(shoppingListInDB, inputValue)
    
        
        clearInputFieldEl() 
    }
})

function appendItemToShoppingListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]
    let newEl = document.createElement("li")
    newEl.textContent = itemValue
    shoppingList.append(newEl)

    newEl.addEventListener("click", function(){
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        remove(exactLocationOfItemInDB)
    })
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function clearShoppingList() {
    shoppingList.innerHTML = ""
}