let isLoggedIn: boolean = false;
let userName: string = "";
function loginUserg(name: string) {
  isLoggedIn = true;
  userName = name;
}
function logoutUser() {
  isLoggedIn = false;
  userName = "";
}
