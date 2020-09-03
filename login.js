const getlogin = document.querySelector("#login");
const getregister = document.querySelector("#register");

const register = () => {
  getlogin.style.left = "-400px";
  getregister.style.left = "20px";
};
const login = () => {
  getlogin.style.left = "20px";
  getregister.style.left = "450px";
};
