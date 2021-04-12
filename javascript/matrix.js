function loadMatrix() {
    let array = JSON.parse(localStorage.getItem('allTasks')) || [];
    for (let i = 0, y = 100; i < array.length; i++, y++) {
        if (array[i].importance == "High") {
            container = "do";
        } if (array[i].importance == "Low") {
            container = "schedule";
            if (array[i].importance == "Low" && array[i].time > 3) {
                container = "delegate";
            }
        }
        document.getElementById(container).innerHTML += `
  
     <div id="${i}" draggable="true" ondragstart="drag(event)" class="card">
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
        for (let x = 0; x < array[i].user.length; x++) {
            document.getElementById(y).innerHTML += `
    <img src="${array[i].user[x].img}">
    </div>`
        }
        document.getElementById(i).style.borderColor = colorMap.get(array[i].category);
    }
}

function deleteListItem(i) {
    allTasks = JSON.parse(localStorage.getItem('allTasks')) || [];
    allTasks.splice(i, 1);
    console.table(allTasks)
    localStorage.setItem('allTasks', JSON.stringify(allTasks));
    let containerIDs = ["do", "schedule", "delegate", "eliminate"];
    for (let i = 0; i < containerIDs.length; i++) {
        document.getElementById(Y[i]).innerHTML = "";
    }
    loadMatrix();

}

