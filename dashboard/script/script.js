const person = document.querySelector(".navbar-menu .menu-item .right-sidebar-toggle");
const sidebarRight = document.querySelector("#sidebar-right")
const floatRight = document.querySelector(".pane-header .float-right")
const toastContainer = document.querySelector("#toast-container");
const profileUser = document.querySelector(".profile-user");
const formUpdateProfile = document.querySelectorAll(".form-update-profile input");
const formUpdateProfileButton = document.querySelector(".form-update-profile");
const addListButton = document.querySelector(".add-list-button");
const addListModal = document.querySelector(".add-list-modal");
const modalBackDrop = document.querySelector(".modal-backdrop");
const addListModalButton = document.querySelectorAll(".add-list-modal button")
const addListModalInput = document.querySelectorAll(".add-list-modal input")
const listUl = document.querySelector(".list-decoration-ul")
const tableTask = document.querySelector('.table-task tbody')
const addTaskTable = document.querySelector('.add-task-table')

const addTaskModal = document.querySelector(".add-task-modal");
const addTaskModalButton = document.querySelectorAll(".add-task-modal button")
const addTaskModalInput = document.querySelectorAll(".add-task-modal input")

const statusSectionProgress = document.querySelector(".status-section-progress")

const tableReport = document.querySelector('.table-report tbody')
const addReportTable = document.querySelector('.add-report-table')
const addReportModal = document.querySelector(".add-report-modal");
const addReportModalButton = document.querySelectorAll(".add-report-modal button")

///////////Error remove
function remove() {
    let x = 1
    let temp = setInterval(() => {
        if (x <= 0) {
            toastContainer.innerHTML = ""
            clearInterval(temp);
        }
        x -= 1
    }, 1000)
}

////////slide open and close
person.addEventListener("click", () => {
    if (sidebarRight.className === "") {
        sidebarRight.className = "sidebar-open"
    } else {
        sidebarRight.className = ""
    }
})

///////load data when refreash web page
window.addEventListener("load", () => {
    fetch("http://localhost:3000/user/protected-route", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
        })
    })
        .then(async (response) => {
            const data = await response.json();

            if (response.status === 201) {
                // toastContainer.innerHTML = `<div class="toast toast-success"><div class="toast-message">${data.message}</div></div>`
                // remove()
            } else {
                // console.error('خطا: عملیات ناموفق بود');
                toastContainer.innerHTML = `<div class="toast toast-error"><div class="toast-message">${data.message}</div></div>`
                remove()
                window.location.href = '../signin';
                // console.error('پیام:', data.message);
            }
        })
        .catch(error => {
            toastContainer.innerHTML = `<div class="toast toast-error"><div class="toast-message">${error.message}</div></div>`
            // console.error('خطا:', error.message);
        });



    fetch("http://localhost:3000/user/get", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
        })
    })
        .then(async (response) => {
            const data = await response.json();

            if (response.status === 201) {
                const userObj = data["data"]["user"];

                formUpdateProfile[0].value = userObj["fullname"]
                formUpdateProfile[1].value = userObj["email"]
                formUpdateProfile[2].value = userObj["username"]
                formUpdateProfile[3].value = userObj["password"]
                


                // toastContainer.innerHTML = `<div class="toast toast-success"><div class="toast-message">${data.message}</div></div>`
                // remove()
            } else {
                // console.error('خطا: عملیات ناموفق بود');
                toastContainer.innerHTML = `<div class="toast toast-error"><div class="toast-message">${data.message}</div></div>`
                remove()
                window.location.href = '../signin';
                // console.error('پیام:', data.message);
            }
        })
        .catch(error => {
            toastContainer.innerHTML = `<div class="toast toast-error"><div class="toast-message">${error.message}</div></div>`
            // console.error('خطا:', error.message);
        });


    //////////////////////
    fetch("http://localhost:3000/list/get", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
        })
    })
        .then(async (response) => {
            const data = await response.json();

            if (response.status === 201) {

                const listObj = data["data"]["list"]

                listObj.forEach(element => {
                    // ایجاد عنصر li
                    const li = document.createElement('li');
                    li.id = `idList_${element.lid}`;
                    li.className = 'active center-between-flex padding-list-li';

                    // ایجاد عنصر a
                    const a = document.createElement('a');
                    a.className = 'a-flex-no-padding';

                    // ایجاد عنصر img برای لیست
                    const imgList = document.createElement('img');
                    imgList.src = 'img/list-ul-alt-svgrepo-com.svg';
                    imgList.className = 'img-icon';
                    imgList.alt = 'img-icon-list';

                    // ایجاد عنصر span
                    const span = document.createElement('span');
                    span.className = 'menu-text';
                    span.textContent = element.title;

                    // ایجاد عنصر button
                    const button = document.createElement('button');
                    button.className = 'btn btn-sm btn-info-delete-small';

                    // ایجاد عنصر img برای دکمه حذف
                    const imgDelete = document.createElement('img');
                    imgDelete.src = 'img/delete-svgrepo-com.svg';
                    imgDelete.className = 'img-icon-small';
                    imgDelete.alt = 'delete';

                    // اضافه کردن img و span به a
                    a.appendChild(imgList);
                    a.appendChild(span);

                    // اضافه کردن img به button
                    button.appendChild(imgDelete);

                    // اضافه کردن a و button به li
                    li.appendChild(a);
                    li.appendChild(button);

                    // فرض بر این است که می‌خواهید این li را به یک ul با id='myList' اضافه کنید
                    
                    listUl.appendChild(li);

                    button.addEventListener("click", () => {
                        fetch("http://localhost:3000/list/delete", {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            credentials: 'include',
                            body: JSON.stringify({
                                "lid": element.lid
                            })
                        })
                            .then(async (response) => {
                                const data = await response.json();

                                if (response.status === 201) {
                                    toastContainer.innerHTML = `<div class="toast toast-success"><div class="toast-message">${data.message}</div></div>`

                                    localStorage.removeItem('listId');

                                    li.remove()
                                    // location.reload();
                                   
                                    remove()
                                } else {
                                    // console.error('خطا: عملیات ناموفق بود');
                                    toastContainer.innerHTML = `<div class="toast toast-error"><div class="toast-message">${data.message}</div></div>`
                                    remove()
                                    // console.error('پیام:', data.message);
                                }
                            })
                            .catch(error => {
                                toastContainer.innerHTML = `<div class="toast toast-error"><div class="toast-message">${error.message}</div></div>`
                                // console.error('خطا:', error.message);
                            });
                    })



                    a.addEventListener("click", () => {
                        fetch("http://localhost:3000/task/get", {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            credentials: 'include',
                            body: JSON.stringify({
                                "lid": element.lid
                            })
                        })
                            .then(async (response) => {
                                const data = await response.json();

                                if (response.status === 201) {


                                    // ایجاد یک عنصر <tr>

                                    const taskObj = data["data"]["task"]

                                    localStorage.setItem('listId', element.lid);
                                    tableTask.innerHTML = ""
                                    taskObj.forEach(element => {
                                        const tr = document.createElement('tr');
                                        const td1 = document.createElement('td');
                                        td1.textContent = element.tid;
                                        tr.appendChild(td1);

                                        const td2 = document.createElement('td');
                                        td2.textContent = element.title;
                                        td2.setAttribute('contenteditable', 'true');
                                        tr.appendChild(td2);

                                        const td3 = document.createElement('td');
                                        td3.textContent = element.description;
                                        td3.setAttribute('contenteditable', 'true');
                                        tr.appendChild(td3);


                                        let select = document.createElement('select');
                                        select.id = 'status-select';

                                        // ساختن گزینه‌ها
                                        let options = [
                                            { value: 'open', text: 'Open' },
                                            { value: 'in-progress', text: 'in-progress' },
                                            { value: 'close', text: 'Close' }
                                        ];

                                        // اضافه کردن گزینه‌ها به select
                                        for (let i = 0; i < options.length; i++) {
                                            let option = document.createElement('option');
                                            option.value = options[i].value;
                                            option.text = options[i].text;
                                            select.appendChild(option);
                                        }

                                        const td4 = document.createElement('td');
                                        td4.appendChild(select)
                                        // td4.setAttribute('contenteditable', 'true');
                                        select.value = element.status;
                                        tr.appendChild(td4);
                                        // ایجاد و افزودن عنصر <td> برای دکمه‌ها
                                        const tdButtons = document.createElement('td');
                                        tdButtons.classList.add('text-center');

                                        // دکمه Report
                                        const btnReport = document.createElement('button');
                                        btnReport.classList.add('btn', 'btn-sm', 'btn-info-Report');
                                        const imgReport = document.createElement('img');
                                        imgReport.src = 'img/report-svgrepo-com.svg';
                                        imgReport.classList.add('img-icon-small');
                                        imgReport.alt = 'report';
                                        btnReport.appendChild(imgReport);
                                        btnReport.appendChild(document.createTextNode(' Report'));
                                        tdButtons.appendChild(btnReport);

                                        // دکمه Edit
                                        const btnEdit = document.createElement('button');
                                        btnEdit.classList.add('btn', 'btn-sm', 'btn-info');
                                        const imgEdit = document.createElement('img');
                                        imgEdit.src = 'img/edit-clipboard-svgrepo-com.svg';
                                        imgEdit.alt = 'edit';
                                        btnEdit.appendChild(imgEdit);
                                        btnEdit.appendChild(document.createTextNode(' Edit'));
                                        tdButtons.appendChild(btnEdit);

                                        // دکمه Delete
                                        const btnDelete = document.createElement('button');
                                        btnDelete.classList.add('btn', 'btn-sm', 'btn-info-delete');
                                        const imgDelete = document.createElement('img');
                                        imgDelete.src = 'img/delete-svgrepo-com.svg';
                                        imgDelete.alt = 'delete';
                                        btnDelete.appendChild(imgDelete);
                                        btnDelete.appendChild(document.createTextNode(' Delete'));
                                        tdButtons.appendChild(btnDelete);

                                        // افزودن <td> دکمه‌ها به <tr>
                                        tr.appendChild(tdButtons);

                                        // افزودن <tr> به جدول یا بدنه آن (مثلاً tbody)
                                        tableTask.appendChild(tr);


                                        // console.log(td2.innerHTML);
                                        btnDelete.addEventListener("click", () => {

                                            fetch("http://localhost:3000/task/delete", {
                                                method: 'POST',
                                                headers: {
                                                    'Content-Type': 'application/json'
                                                },
                                                credentials: 'include',
                                                body: JSON.stringify({
                                                    "tid": element.tid
                                                })
                                            })
                                                .then(async (response) => {
                                                    const data = await response.json();

                                                    if (response.status === 201) {
                                                        // const userObj = data["data"]["user"];

                                                        tr.remove();
                                                        // location.reload();
                                                        // window.location.href = '../signin';
                                                        toastContainer.innerHTML = `<div class="toast toast-success"><div class="toast-message">${data.message}</div></div>`
                                                        remove()
                                                    } else {
                                                        // console.error('خطا: عملیات ناموفق بود');
                                                        toastContainer.innerHTML = `<div class="toast toast-error"><div class="toast-message">${data.message}</div></div>`
                                                        remove()
                                                        // window.location.href = '../signin';
                                                        // console.error('پیام:', data.message);
                                                    }
                                                })
                                                .catch(error => {
                                                    toastContainer.innerHTML = `<div class="toast toast-error"><div class="toast-message">${error.message}</div></div>`
                                                    // console.error('خطا:', error.message);
                                                    remove()
                                                });
                                        })
                                        btnEdit.addEventListener("click", () => {

                                            fetch("http://localhost:3000/task/update", {
                                                method: 'POST',
                                                headers: {
                                                    'Content-Type': 'application/json'
                                                },
                                                credentials: 'include',
                                                body: JSON.stringify({
                                                    "tid": element.tid,
                                                    "title": td2.textContent,
                                                    "description": td3.textContent,
                                                    "status": select.value
                                                })
                                            })
                                                .then(async (response) => {
                                                    const data = await response.json();

                                                    if (response.status === 201) {
                                                        const userObj = data["data"]["user"];

                                                        // formUpdateProfile[0].value = userObj["fullname"]
                                                        // formUpdateProfile[1].value = userObj["email"]
                                                        // formUpdateProfile[2].value = userObj["username"]
                                                        // formUpdateProfile[3].value = userObj["password"]
                                                        // profileUser.innerHTML = "online"


                                                        toastContainer.innerHTML = `<div class="toast toast-success"><div class="toast-message">${data.message}</div></div>`
                                                        remove()
                                                    } else {
                                                        // console.error('خطا: عملیات ناموفق بود');
                                                        toastContainer.innerHTML = `<div class="toast toast-error"><div class="toast-message">${data.message}</div></div>`
                                                        remove()
                                                        // window.location.href = '../signin';
                                                        // console.error('پیام:', data.message);
                                                    }
                                                })
                                                .catch(error => {
                                                    toastContainer.innerHTML = `<div class="toast toast-error"><div class="toast-message">${error.message}</div></div>`
                                                    // console.error('خطا:', error.message);
                                                    remove()
                                                });
                                        })
                                        btnReport.addEventListener("click", () => {
                                            console.log(element.tid);
                                            fetch("http://localhost:3000/report/get", {
                                                method: 'POST',
                                                headers: {
                                                    'Content-Type': 'application/json'
                                                },
                                                credentials: 'include',
                                                body: JSON.stringify({
                                                    "tid": element.tid
                                                })
                                            })
                                                .then(async (response) => {
                                                    const data = await response.json();

                                                    if (response.status === 201) {


                                                        const reportObj = data["data"]["report"]
                                                        console.log(data);
                                                        localStorage.setItem('taskId', element.tid);
                                                        tableReport.innerHTML = ""
                                                        reportObj.forEach(element => {
                                                            const tr = document.createElement('tr');
                                                            const td1 = document.createElement('td');
                                                            td1.textContent = element.rid;
                                                            tr.appendChild(td1);

                                                            const td2 = document.createElement('td');
                                                            td2.textContent = element.description;
                                                            td2.setAttribute('contenteditable', 'true');
                                                            tr.appendChild(td2);




                                                            // ایجاد و افزودن عنصر <td> برای دکمه‌ها
                                                            const tdButtons = document.createElement('td');
                                                            tdButtons.classList.add('text-center');

                                                            // دکمه Edit
                                                            const btnEdit = document.createElement('button');
                                                            btnEdit.classList.add('btn', 'btn-sm', 'btn-info');
                                                            const imgEdit = document.createElement('img');
                                                            imgEdit.src = 'img/edit-clipboard-svgrepo-com.svg';
                                                            imgEdit.alt = 'edit';
                                                            btnEdit.appendChild(imgEdit);
                                                            btnEdit.appendChild(document.createTextNode(' Edit'));
                                                            tdButtons.appendChild(btnEdit);

                                                            // دکمه Delete
                                                            const btnDelete = document.createElement('button');
                                                            btnDelete.classList.add('btn', 'btn-sm', 'btn-info-delete');
                                                            const imgDelete = document.createElement('img');
                                                            imgDelete.src = 'img/delete-svgrepo-com.svg';
                                                            imgDelete.alt = 'delete';
                                                            btnDelete.appendChild(imgDelete);
                                                            btnDelete.appendChild(document.createTextNode(' Delete'));
                                                            tdButtons.appendChild(btnDelete);

                                                            // افزودن <td> دکمه‌ها به <tr>
                                                            tr.appendChild(tdButtons);

                                                            // افزودن <tr> به جدول یا بدنه آن (مثلاً tbody)
                                                            tableReport.appendChild(tr);
                                                            btnDelete.addEventListener("click", () => {

                                                                fetch("http://localhost:3000/report/delete", {
                                                                    method: 'POST',
                                                                    headers: {
                                                                        'Content-Type': 'application/json'
                                                                    },
                                                                    credentials: 'include',
                                                                    body: JSON.stringify({
                                                                        "rid": element.rid
                                                                    })
                                                                })
                                                                    .then(async (response) => {
                                                                        const data = await response.json();

                                                                        if (response.status === 201) {
                                                                            // const userObj = data["data"]["user"];

                                                                            tr.remove();
                                                                            // location.reload();
                                                                            // window.location.href = '../signin';
                                                                            toastContainer.innerHTML = `<div class="toast toast-success"><div class="toast-message">${data.message}</div></div>`
                                                                            remove()
                                                                        } else {
                                                                            // console.error('خطا: عملیات ناموفق بود');
                                                                            toastContainer.innerHTML = `<div class="toast toast-error"><div class="toast-message">${data.message}</div></div>`
                                                                            remove()
                                                                            // window.location.href = '../signin';
                                                                            // console.error('پیام:', data.message);
                                                                        }
                                                                    })
                                                                    .catch(error => {
                                                                        toastContainer.innerHTML = `<div class="toast toast-error"><div class="toast-message">${error.message}</div></div>`
                                                                        // console.error('خطا:', error.message);
                                                                        remove()
                                                                    });
                                                            })
                                                            btnEdit.addEventListener("click", () => {

                                                                fetch("http://localhost:3000/report/update", {
                                                                    method: 'POST',
                                                                    headers: {
                                                                        'Content-Type': 'application/json'
                                                                    },
                                                                    credentials: 'include',
                                                                    body: JSON.stringify({
                                                                        "rid": element.rid,
                                                                        "description": td2.textContent
                                                                    })
                                                                })
                                                                    .then(async (response) => {
                                                                        const data = await response.json();

                                                                        if (response.status === 201) {
                                                                 

                                                    
                                                                            toastContainer.innerHTML = `<div class="toast toast-success"><div class="toast-message">${data.message}</div></div>`
                                                                            remove()
                                                                        } else {
                                                                            // console.error('خطا: عملیات ناموفق بود');
                                                                            toastContainer.innerHTML = `<div class="toast toast-error"><div class="toast-message">${data.message}</div></div>`
                                                                            remove()
                                                                            // window.location.href = '../signin';
                                                                            // console.error('پیام:', data.message);
                                                                        }
                                                                    })
                                                                    .catch(error => {
                                                                        toastContainer.innerHTML = `<div class="toast toast-error"><div class="toast-message">${error.message}</div></div>`
                                                                        // console.error('خطا:', error.message);
                                                                        remove()
                                                                    });
                                                            })

                                                        })
                                                        toastContainer.innerHTML = `<div class="toast toast-success"><div class="toast-message">${data.message}</div></div>`
                                                        remove()
                                                    } else {
                                                        // console.error('خطا: عملیات ناموفق بود');
                                                        toastContainer.innerHTML = `<div class="toast toast-error"><div class="toast-message">${data.message}</div></div>`
                                                        remove()
                                                        // window.location.href = '../signin';
                                                        // console.error('پیام:', data.message);
                                                    }
                                                })
                                                .catch(error => {
                                                    toastContainer.innerHTML = `<div class="toast toast-error"><div class="toast-message">${error.message}</div></div>`
                                                    // console.error('خطا:', error.message);
                                                    remove()
                                                });
                                        })

                                    });

                                    // toastContainer.innerHTML = `<div class="toast toast-success"><div class="toast-message">${data.message}</div></div>`
                                    // location.reload();
                                    // window.location.href = '../signin';
                                    // remove()
                                } else {
                                    // console.error('خطا: عملیات ناموفق بود');
                                    toastContainer.innerHTML = `<div class="toast toast-error"><div class="toast-message">${data.message}</div></div>`
                                    remove()
                                    // console.error('پیام:', data.message);
                                }
                            })
                            .catch(error => {
                                toastContainer.innerHTML = `<div class="toast toast-error"><div class="toast-message">${error.message}</div></div>`
                                // console.error('خطا:', error.message);
                            });
                    })



                });

                // toastContainer.innerHTML = `<div class="toast toast-success"><div class="toast-message">${data.message}</div></div>`
                // remove()
            } else {
                // console.error('خطا: عملیات ناموفق بود');
                toastContainer.innerHTML = `<div class="toast toast-error"><div class="toast-message">${data.message}</div></div>`
                remove()
                window.location.href = '../signin';
                // console.error('پیام:', data.message);
            }
        })
        .catch(error => {
            toastContainer.innerHTML = `<div class="toast toast-error"><div class="toast-message">${error.message}</div></div>`
            // console.error('خطا:', error.message);
        });




    fetch("http://localhost:3000/status/getcount", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
        })
    })
        .then(async (response) => {
            const data = await response.json();

            if (response.status === 201) {
                toastContainer.innerHTML = `<div class="toast toast-success"><div class="toast-message">${data.message}</div></div>`
                remove()
                const statusCountObj = data["data"]
                // console.log(statusCountObj);

                const h3TitleAll = statusSectionProgress.querySelectorAll("h3")
                h3TitleAll[0].textContent = statusCountObj["open"]
                h3TitleAll[1].textContent = statusCountObj["progress"]
                h3TitleAll[2].textContent = statusCountObj["close"]


                const progressBarAll = statusSectionProgress.querySelectorAll("div.progress-bar")
                progressBarAll[0].style.width = 100 - (statusCountObj["open"] / statusCountObj["statusall"] * 100) + "%"
                progressBarAll[1].style.width = 100 - (statusCountObj["progress"] / statusCountObj["statusall"] * 100) + "%"
                progressBarAll[2].style.width = (statusCountObj["close"] / statusCountObj["statusall"] * 100) + "%"
                // location.reload();

            } else {
                // console.error('خطا: عملیات ناموفق بود');
                toastContainer.innerHTML = `<div class="toast toast-error"><div class="toast-message">${data.message}</div></div>`
                remove()
                // console.error('پیام:', data.message);
            }
        })
        .catch(error => {
            toastContainer.innerHTML = `<div class="toast toast-error"><div class="toast-message">${error.message}</div></div>`
            // console.error('خطا:', error.message);
        });





})

/////log out
floatRight.addEventListener("click", (event) => {
    fetch("http://localhost:3000/user/logout", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
        })
    })
        .then(async (response) => {
            const data = await response.json();

            if (response.status === 201) {
                toastContainer.innerHTML = `<div class="toast toast-success"><div class="toast-message">${data.message}</div></div>`
                window.location.href = '../signin';
                remove()
            } else {
                // console.error('خطا: عملیات ناموفق بود');
                toastContainer.innerHTML = `<div class="toast toast-error"><div class="toast-message">${data.message}</div></div>`
                remove()
                // console.error('پیام:', data.message);
            }
        })
        .catch(error => {
            toastContainer.innerHTML = `<div class="toast toast-error"><div class="toast-message">${error.message}</div></div>`
            // console.error('خطا:', error.message);
        });
})

//////update user
formUpdateProfileButton.addEventListener("submit", (event) => {
    event.preventDefault();
    fetch("http://localhost:3000/user/update", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
            "fullname": formUpdateProfile[0].value,
            "email": formUpdateProfile[1].value,
            "username": formUpdateProfile[2].value,
            "password": formUpdateProfile[3].value
        })
    })
        .then(async (response) => {
            const data = await response.json();

            if (response.status === 201) {
                toastContainer.innerHTML = `<div class="toast toast-success"><div class="toast-message">${data.message}</div></div>`
                // window.location.href = '../signin';
                remove()
            } else {
                // console.error('خطا: عملیات ناموفق بود');
                toastContainer.innerHTML = `<div class="toast toast-error"><div class="toast-message">${data.message}</div></div>`
                remove()
                // console.error('پیام:', data.message);
            }
        })
        .catch(error => {
            toastContainer.innerHTML = `<div class="toast toast-error"><div class="toast-message">${error.message}</div></div>`
            // console.error('خطا:', error.message);
        });
})

addListButton.addEventListener("click", (event) => {

    addListModal.style.display = "block"
    modalBackDrop.style.display = "block"

    modalBackDrop.classList.add("show")
    addListModal.classList.add('show');
})

function removeModalAddList(event) {
    addListModal.style.display = "none"
    modalBackDrop.style.display = "none"
    modalBackDrop.classList.remove("show")
    addListModal.classList.remove('show');
}
addListModalButton[0].addEventListener("click", removeModalAddList)
addListModalButton[1].addEventListener("click", removeModalAddList)


addListModalButton[2].addEventListener("click", (event) => {

    fetch("http://localhost:3000/list/insert", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
            "title": addListModalInput[0].value
        })
    })
        .then(async (response) => {
            const data = await response.json();

            if (response.status === 201) {
                toastContainer.innerHTML = `<div class="toast toast-success"><div class="toast-message">${data.message}</div></div>`
                removeModalAddList()
                remove()
                location.reload();

            } else {
                // console.error('خطا: عملیات ناموفق بود');
                toastContainer.innerHTML = `<div class="toast toast-error"><div class="toast-message">${data.message}</div></div>`
                remove()
                // console.error('پیام:', data.message);
            }
        })
        .catch(error => {
            toastContainer.innerHTML = `<div class="toast toast-error"><div class="toast-message">${error.message}</div></div>`
            // console.error('خطا:', error.message);
        });
})

/////////////////////////////////////////////
addTaskTable.addEventListener("click", (event) => {
    addTaskModal.style.display = "block"
    modalBackDrop.style.display = "block"

    modalBackDrop.classList.add("show")
    addTaskModal.classList.add('show');
})



function removeModalAddTask(event) {
    addTaskModal.style.display = "none"
    modalBackDrop.style.display = "none"
    modalBackDrop.classList.remove("show")
    addTaskModal.classList.remove('show');
}
addTaskModalButton[0].addEventListener("click", removeModalAddTask)
addTaskModalButton[1].addEventListener("click", removeModalAddTask)


addTaskModalButton[2].addEventListener("click", (event) => {
    if (!localStorage.getItem("listId")) {
        toastContainer.innerHTML = `<div class="toast toast-error"><div class="toast-message">please select a list</div></div>`
        remove()
        removeModalAddList()
        return;
    }
    fetch("http://localhost:3000/task/insert", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
            "lid": localStorage.getItem("listId"),
            "title": addTaskModalInput[0].value,
            "description": addTaskModal.querySelector("textarea").value
        })
    })
        .then(async (response) => {
            const data = await response.json();

            if (response.status === 201) {
                toastContainer.innerHTML = `<div class="toast toast-success"><div class="toast-message">${data.message}</div></div>`
                removeModalAddList()
                remove()
                location.reload();

            } else {
                // console.error('خطا: عملیات ناموفق بود');
                toastContainer.innerHTML = `<div class="toast toast-error"><div class="toast-message">${data.message}</div></div>`
                remove()
                // console.error('پیام:', data.message);
            }
        })
        .catch(error => {
            toastContainer.innerHTML = `<div class="toast toast-error"><div class="toast-message">${error.message}</div></div>`
            // console.error('خطا:', error.message);
        });
})


/////////////////////////////////

addReportTable.addEventListener("click", (event) => {
    addReportModal.style.display = "block"
    modalBackDrop.style.display = "block"

    modalBackDrop.classList.add("show")
    addReportModal.classList.add('show');
})



function removeModalAddReport(event) {
    addReportModal.style.display = "none"
    modalBackDrop.style.display = "none"
    modalBackDrop.classList.remove("show")
    addReportModal.classList.remove('show');
}
addReportModalButton[0].addEventListener("click", removeModalAddReport)
addReportModalButton[1].addEventListener("click", removeModalAddReport)


addReportModalButton[2].addEventListener("click", (event) => {
    if (!localStorage.getItem("taskId")) {
        toastContainer.innerHTML = `<div class="toast toast-error"><div class="toast-message">please select a task</div></div>`
        remove()
        removeModalAddReport()
        return;
    }
    fetch("http://localhost:3000/report/insert", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
            "tid": localStorage.getItem("taskId"),
            "description": addReportModal.querySelector("textarea").value
        })
    })
        .then(async (response) => {
            const data = await response.json();

            if (response.status === 201) {
                toastContainer.innerHTML = `<div class="toast toast-success"><div class="toast-message">${data.message}</div></div>`
                removeModalAddReport()
                remove()
                location.reload();

            } else {
                // console.error('خطا: عملیات ناموفق بود');
                toastContainer.innerHTML = `<div class="toast toast-error"><div class="toast-message">${data.message}</div></div>`
                remove()
                // console.error('پیام:', data.message);
            }
        })
        .catch(error => {
            toastContainer.innerHTML = `<div class="toast toast-error"><div class="toast-message">${error.message}</div></div>`
            // console.error('خطا:', error.message);
        });
})