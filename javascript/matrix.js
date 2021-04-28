allTasks = JSON.parse(backend.getItem('allTasks'));
/**
 * generating the HTML of each listitem within a nested Forloop with different parameters
 * @param {number} i start value of 0 increase every loop
 * @param {number} x start value of 0 increase every loop
 * @param {number} y start value of 100 increase very loop
 */
function fillArray() {
    let array = JSON.parse(backend.getItem("allTasks"));
    for (let i = 0, y = 100; i < array.length; i++, y++) {
        document.getElementById(array[i].priority).innerHTML += `
     <div id="${i}" draggable="true" ondragstart="drag(event,${i})" class="card">
         <div class="left">
             <div class="top-bar">
                 <p>${array[i].date}</p>
                 <svg onclick="deleteListItem(${i})" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red"
                     class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                     <path
                         d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                 </svg>
             </div>
             <div class="text-bar">
                 <p>${array[i].title}</p>
                 <p>${array[i].description}</p>
             </div>
             <div class="bottom-bar">
                 <button class="btn  btn-primary btn-sm">${array[i].category}</button>
                 <div id="${y}" class="users">
                    
                 </div>
             </div>
         </div>
         <div class="right">

         </div>
     </div>
 `
        if (array[i].user.length == 0) {
            console.log("User.legth == 0")
        }
        else {
            for (let x = 0; x < array[i].user.length; x++) {
                if (array[i].user[x].img == undefined) {
                } else {
                    document.getElementById(y).innerHTML += `
                    <img src="${array[i].user[x].img}">
                    </div>`
                }
            }
        }
        document.getElementById(i).style.borderColor = colorMap.get(array[i].category);
    }
}
/**
 * splice the selected item out of the array and save it to the database
 * if the location is "list" run loadlist() if the location is "matrix" run clearContainer() and fillArray()
 * @param {number} i position in the array allTasks 
 * @example if (window.location.href.indexOf('list') > -1) {
        document.getElementById("list").innerHTML = "";
        loadList();
    }
    if (window.location.href.indexOf('matrix') > -1) {
        clearContainer();
        fillArray();
    }
 */
function deleteListItem(i) {
    allTasks = JSON.parse(backend.getItem("allTasks"));
    allTasks.splice(i, 1);
    backend.setItem('allTasks', JSON.stringify(allTasks));
    if (window.location.href.indexOf('list') > -1) {
        document.getElementById("list").innerHTML = "";
        loadList();
    } if (window.location.href.indexOf("matrix") > -1) {
        clearContainer();
        fillArray();
    }
}

/**
 * @param {array} containerids an array of the container ids
 * clear the innerHTML of the container in the loop
 * @example for (let i = 0; i < 4; i++) {
        document.getElementById(containerids[i]).innerHTML = "";
    }
 */
function clearContainer() {
    let containerids = ["do", "schedule", "delegate", "eliminate"];
    for (let i = 0; i < 4; i++) {
        document.getElementById(containerids[i]).innerHTML = "";
    }
}