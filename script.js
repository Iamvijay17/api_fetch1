let signUpForm = document.getElementById("signUpForm");
let signUpName = document.querySelector("#signfloatingName");
let signUpEmail = document.querySelector("#signfloatingEmail");
let signUpPassword = document.querySelector("#signfloatingPassword");
let signUpConPassword = document.querySelector("#signConfloatingPassword");
let signUpCheck = document.querySelector("#signUpCheck");

function signUp(e) {
  if (!signUpValidation()) {
    event.preventDefault();
  } else {
    //============= localStorage =============//

    let user = {
      username: signUpName.value,
      email: signUpEmail.value,
      password: signUpConPassword.value,
    };
    let jsonformat = JSON.stringify(user);
    localStorage.setItem(signUpName.value, jsonformat);
  
    event.preventDefault();
    
    //============= Alert =============//

    Swal.fire({
      title: "Do you want to Continue?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Yes",
      denyButtonText: `No`
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.pathname = "/api_fetch1/main.html";
      } else if (result.isDenied) {
        Swal.fire("Datas not saved", "", "error");
      }
    });
 
  }
}

function signUpValidation() {
  const signUpNameVal = signUpName.value.trim();
  const signUpEmailVal = signUpEmail.value.trim();
  const signUpPasswordVal = signUpPassword.value.trim();
  const signUpConPasswordVal = signUpConPassword.value.trim();
  const signUpCheckVal = signUpCheck.checked;
  let errorFree = true;
  // Name Validation
  if (signUpNameVal === "") {
    errorFree = false;
    setErr(signUpName, "Enter the Name");
  } else {
    setSuccess(signUpName);
  }

  // Email Validation
  if (signUpEmailVal === "") {
    errorFree = false;
    setErr(signUpEmail, "Enter the Email");
  } else if (!validatEmail(signUpEmailVal)) {
    errorFree = false;
    setErr(signUpEmail, "Please Enter the valid Email");
  } else {
    setSuccess(signUpEmail);
  }

  // Password Validation
  if (signUpPasswordVal === "") {
    errorFree = false;
    setErr(signUpPassword, "Enter the Password");
  } else {
    setSuccess(signUpPassword);
  }

  // ConPassword Validation
  if (signUpConPasswordVal === "") {
    errorFree = false;
    setErr(signUpConPassword, "Please Enter the Confirm Password");
  } else if (signUpConPasswordVal !== signUpPasswordVal) {
    errorFree = false;
    setErr(signUpConPassword, "Password does not match");
  } else {
    setSuccess(signUpConPassword);
  }

  // CheckBox Validation
  if (!signUpCheckVal) {
    errorFree = false;
    let check = document.querySelector(".form-check>.error");
    check.innerHTML = "Check the terms & conditions";
  } else {
    let check = document.querySelector(".form-check>.error");
    check.innerHTML = "";
  }
  return errorFree;
}

function setErr(element, msg) {
  const inputGroup = element.parentElement;
  const errorEl = inputGroup.querySelector(".error");
  const inputEl = inputGroup.querySelector(".form-control");
  inputEl.classList.add("border-danger");
  errorEl.innerText = msg;
}

function setSuccess(element) {
  const inputGroup = element.parentElement;
  const errorEl = inputGroup.querySelector(".error");
  const inputEl = inputGroup.querySelector(".form-control");
  inputEl.classList.remove("border-danger");
  inputEl.classList.add("border-success");
  errorEl.innerText = "";
}

// Mail Validation
const validatEmail = (signUpEmail) => {
  return String(signUpEmail)
    .toLowerCase()
    .match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);
};
//!===============================================================================================//
//!===============================================================================================//
//!===============================================================================================//

// Login Page Script
function login(e) {
  event.preventDefault();
  dataCheck();
}
function dataCheck() {
  let username = document.getElementById("loginfloatingName");
  let password = document.getElementById("loginConfloatingPassword");
  const terms = document.getElementById("loginCheck").checked;

  let userNameVl = username.value;
  let passwordVl = password.value;

  console.log(userNameVl, passwordVl);

  let user = localStorage.getItem(userNameVl);
  let data = JSON.parse(user);

  // Validations

  if (data == null) {
    setErr(username, "Please Enter the UserName");
    setErr(password, "Please Enter the Password");
  } else if (
    username.value == data.username &&
    password.value == data.password &&
    terms
  ) {
    window.location = "http://127.0.0.1:5500/main.html";
  } else {
    // setErr([username,password], "Enter the correct details")
    alert("Enter the correct details");
  }
}

fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((photos) => {
    let datas = "";
    photos.forEach((data) => {
      // let dataEl = document.createElement("div");
      // console.log(photos);
      datas += `<div class=" justify-content-center d-flex m-3">
        <div class="card " style="width: 18rem;">
          <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" class="card-img-top" alt="..."/>
          <div class="card-body">
          <h5 class="card-title">${data.name}</h5>
            <p class="card-text">${data.username}</p>
            <p class="card-text">${data.website}</p>
          </div>
        </div>
       </div>`;
    });
    document.getElementById("fetch").innerHTML = datas;
  })
  .catch((err) => console.log(err));
// fetch("https://jsonplaceholder.typicode.com/photos")
//   .then((response) => response.json())
//   .then((photos) => {
//     let datas = "";
//     photos.forEach((data) => {
//       // let dataEl = document.createElement("div");
//       console.log(photos);
//       datas += `<div class=" justify-content-center d-flex m-3">
//         <div class="card " style="width: 18rem;">
//           <img src="${data.url}" class="card-img-top" alt="..."/>
//           <div class="card-body">
//           <h5 class="card-title">${data.title}</h5>
//             <p class="card-text">${data.company.name}</p>
//           </div>
//         </div>
//        </div>`;
//     });
//     document.getElementById("fetch").innerHTML = datas;
//   })
//   .catch((err) => console.log(err));

//
