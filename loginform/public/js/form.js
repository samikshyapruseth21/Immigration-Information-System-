// form loading animation

// window.onload(async () => {
// window.firebase = await import("https://www.gstatic.com/firebasejs/10.10.0/firebase-app-compat.js")
// window.firestore = await import("https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore-compat.js")
// })

// <script src="https://www.gstatic.com/firebasejs/10.10.0/firebase-app-compat.js"></script>
// <script src="https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore-compat.js"></script>


// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAKI5BuKArHOvAayXifS0zpiqnaE06Y184",
    authDomain: "database-for-login-11421.firebaseapp.com",
    projectId: "database-for-login-11421",
    storageBucket: "database-for-login-11421.appspot.com",
    messagingSenderId: "881161623163",
    appId: "1:881161623163:web:d7cdb3f98c5a0caa0bb4de"
};
let db;
window.addEventListener("load", async function () {
    db = window.firebase.firestore(window.firebase.initializeApp(firebaseConfig))
})
// let firestore;
// // Load Firebase script synchronously
// const firebaseScript = document.createElement('script');
// firebaseScript.src = 'https://www.gstatic.com/firebasejs/10.10.0/firebase-app-compat.js';
// firebaseScript.onload = function () {
//     // Initialize Firebase
//     const app = window.firebase.initializeApp(firebaseConfig);
//     window.firestore = window.firebase.getFirestore(app);
//     // Code that depends on Firebase can go here
//     initializeForm();
// };
// document.head.appendChild(firebaseScript);
// // Rest of your code remains unchanged

// Add a new user to the "users" collection
async function addUser(username, password, email) {
    try {
        const userRef = await db.collection("users").add({ username, password, email });
        console.log("User added with ID: ", userRef.id);
        return Promise.resolve(userRef)
    } catch (error) {
        console.error("Error adding user: ", error);
        return Promise.reject()
    }
}
const form = [...document.querySelector('.form').children]
form.forEach((item, i) => {
    setTimeout(() => {
        item.style.opacity = 1;
    }, i * 100);
})
form.forEach((item) => {
    item.addEventListener("submit", (e) => {
        e.preventDefault()
    })
})
// form validation
const name = document.querySelector('.name') || null;
const email = document.querySelector('.email');
const password = document.querySelector('.password');
const submitBtn = document.querySelector('.submit-btn');
if (this.name == null) { // means login page is open
    submitBtn.addEventListener('click', () => {
        fetch('/login-user', {
            method: 'post',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({
                email: email.value,
                password: password.value
            })
        })
            .then(res => res.json())
            .then(data => {
                validateData(data);
            })
    })
} else { // means register page is open
    submitBtn.addEventListener('click', () => {
        // fetch('/register-user', {
        //     method: 'post',
        //     headers: new Headers({ 'Content-Type': 'application/json' }),
        //     body: JSON.stringify({
        //         name: this.name.value,
        //         email: email.value,
        //         password: password.value
        //     })
        // })
        //     .then(res => res.json())
        //     .then(data => {
        //         validateData(data);
        //     })
        validateData({ name: "aditya", email: "adityamishra.6174@gmail.com" })
    })
}
const validateData = async (data) => {
    console.log(data)
    if (!data.name) {
        alertBox(data);
    } else {
        sessionStorage.name = data.name;
        sessionStorage.email = data.email;
        let password = "kjhgfg"
        const user = await addUser(data.name, password, data.email)
        if (!!user) {
            window.location = window.origin + "/basics.html"
            console.log(data)
        }
    }
}
const alertBox = (data) => {
    const alertContainer = document.querySelector('.alert-box');
    const alertMsg = document.querySelector('.alert');
    alertMsg.innerHTML = data;

    alertContainer.style.top = `5%`;
    setTimeout(() => {
        alertContainer.style.top = null;
    }, 5000);
}
