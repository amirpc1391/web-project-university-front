const form = document.querySelector("form");
const inputs = document.querySelectorAll("input");
const toastContainer = document.querySelector("#toast-container");

function remove() {
  let x = 5
  let temp = setInterval(() => {
    if (x <= 0) {
      toastContainer.innerHTML=""
      clearInterval(temp);
    }
    x -= 1
  }, 1000)
}
form.addEventListener("submit", (event) => {
  event.preventDefault();

  fetch("http://localhost:3000/user/signin", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({
      username: inputs[0].value,
      password: inputs[1].value
    })
  })
    .then(async (response) => {
      const data = await response.json();

      if (response.status === 201) {
        // console.log('پیام: عملیات با موفقیت انجام شد');
        toastContainer.innerHTML = `<div class="toast toast-success"><div class="toast-message">${data.message}</div></div>`
        remove()
        console.log('پیام:', data.message);
        window.location.href = '../dashboard'; // هدایت به صفحه داشبورد
      } else {
        // console.error('خطا: عملیات ناموفق بود');
        toastContainer.innerHTML = `<div class="toast toast-error"><div class="toast-message">${data.message}</div></div>`
        remove()
        console.error('پیام:', data.message);
      }
    })
    .catch(error => {
       toastContainer.innerHTML = `<div class="toast toast-error"><div class="toast-message">${error.message}</div></div>`
      console.error('خطا:', error.message);
    });
});


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
      .then(response => {
          if (response.status === 201) {
            toastContainer.innerHTML = `<div class="toast toast-success"><div class="toast-message">you're logined</div></div>`
              // console.log('پیام: عملیات با موفقیت انجام شد');
              window.location.href = '../dashboard';
          } else {
              // console.error('خطا: عملیات ناموفق بود');
          }
          return response.json();
      })
      .then(data => {
          // دریافت اطلاعات با موفقیت
          console.log(data);
      })
      .catch(error => {
          console.error('خطا:', error.message);
      });

})

