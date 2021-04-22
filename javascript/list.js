function loadList() {
    let array = JSON.parse(localStorage.getItem('allTasks')) || [];
    for (let i = 0, y = 100; i < array.length; i++, y++) {
        document.getElementById("list").innerHTML += ` <div id="${i}"  class="list-item">
        <div id="${y}" class="first">       
        </div>
        <div class="second">
        <p>${array[i].title}</p>
        <p>${array[i].description}</p>
        </div>
        <div class="third">
        <p>${array[i].category}</p>
        </div>
        </div>
        `
        for (let x = 0; x < array[i].user.length; x++) {
            if (array[i].user[x].username == undefined) {
            } else {
                document.getElementById(y).innerHTML += `<div class="user">
            <img src="${array[i].user[x].img}">
            <div class="user-data">
            <p>${array[i].user[x].username}</p>
            <p>${array[i].user[x].email}</p>
            </div>
            </div>`
            }
        }
        document.getElementById(i).style.borderColor = colorMap.get(array[i].category);
    }
}