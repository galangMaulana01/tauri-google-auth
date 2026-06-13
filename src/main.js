import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithRedirect,
  getRedirectResult,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD2E-132qkC6sAmuPEAgnOr3QUg2nO7UuM",
  authDomain: "ionic-499116.firebaseapp.com",
  projectId: "ionic-499116",
  storageBucket: "ionic-499116.firebasestorage.app",
  messagingSenderId: "304025860925",
  appId: "1:304025860925:web:df7414f6389281097f2354"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  client_id: "304025860925-lhf78thaj8p1ncq8sqavk5vktsqcumfd.apps.googleusercontent.com"
});

// Elemen UI
const btnLogin = document.getElementById("btn-login");
const btnLogout = document.getElementById("btn-logout");
const loginSection = document.getElementById("login-section");
const userInfo = document.getElementById("user-info");
const userName = document.getElementById("user-name");
const userEmail = document.getElementById("user-email");
const userPhoto = document.getElementById("user-photo");

// Cek hasil redirect setelah login Google
getRedirectResult(auth).then((result) => {
  if (result?.user) {
    console.log("Login berhasil:", result.user);
  }
}).catch((error) => {
  console.error("Error redirect:", error);
});

// Pantau status login
onAuthStateChanged(auth, (user) => {
  if (user) {
    loginSection.style.display = "none";
    userInfo.style.display = "block";
    userName.textContent = user.displayName;
    userEmail.textContent = user.email;
    userPhoto.src = user.photoURL;
  } else {
    loginSection.style.display = "block";
    userInfo.style.display = "none";
  }
});

// Tombol login
btnLogin.addEventListener("click", () => {
  signInWithRedirect(auth, provider);
});

// Tombol logout
btnLogout.addEventListener("click", () => {
  signOut(auth).then(() => {
    console.log("Logout berhasil");
  });
});
