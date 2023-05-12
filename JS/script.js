function signUp(event) {
  event.preventDefault();
  // alert("Submit");

  let net_username = document.getElementById("n_username").value;
  let net_usernumber = document.getElementById("n_number").value;
  let net_useremail = document.getElementById("n_email").value;
  let net_userpassword = document.getElementById("n_password").value;

  if (net_username && net_usernumber && net_useremail && net_userpassword) {
    let net_userData = {
      username: net_username,
      number: net_usernumber,
      email: net_useremail,
      password: net_userpassword,
    };

    let dataFromLS = JSON.parse(localStorage.getItem("n_users")) || [];
    let flag = false;

    for (let i = 0; i < dataFromLS.length; i++) {
      if (dataFromLS[i].email === net_useremail) {
        flag = true;
      }
    }

    if (flag) {
      alert("User already exsited please log in");
    } else if (net_userpassword.length < 8) {
      alert("Password Must be of 8 characters");
    } else {
      dataFromLS.push(net_userData);
      localStorage.setItem("n_users", JSON.stringify(dataFromLS));
      document.getElementById("n_username").value = "";
      document.getElementById("n_number").value = "";
      document.getElementById("n_email").value = "";
      document.getElementById("n_password").value = "";
      window.location.href = "./Register.html";
      alert("Sign up sucessful");
    }
  } else {
    alert("Please fill all the fields");
  }
}

function Login(event) {
  event.preventDefault();
  // alert("Login");
  let net_email = document.getElementById("n_lemail").value;
  let net_password = document.getElementById("n_lpassword").value;

  if (net_email && net_password) {
    let dataFromLs = JSON.parse(localStorage.getItem("n_users"));
    let flag = false;
    let currentUser;

    for (let i = 0; i < dataFromLs.length; i++) {
      if (
        dataFromLs[i].email === net_email &&
        dataFromLs[i].password === net_password
      ) {
        flag = true;
        currentUser = dataFromLs[i];
      }
    }

    if (flag) {
      localStorage.setItem("net_currentUser", JSON.stringify(currentUser));
      document.getElementById("n_lemail").value = "";
      document.getElementById("n_lpassword").value = "";
      window.location.href = "./Index.html";
      alert("Login Sucessful");
    } else {
      alert("No User Found Please Login");
    }
  } else {
    alert("Please fill all the fields");
  }
}

function logout() {
  // alert("Logout");
  localStorage.removeItem("net_currentUser");
  window.location.href = "./Login.html";
}

function addShow(event) {
  event.preventDefault();
  // alert("Shows added");

  let n_showName = document.getElementById("n_showName").value;
  let n_showImage = document.getElementById("n_showImage").value;
  let n_showRating = document.getElementById("n_showDes").value;
  let n_showDes = document.getElementById("n_showRating").value;

  if (n_showDes && n_showImage && n_showName && n_showRating) {
    let dataFromLs = JSON.parse(localStorage.getItem("n_shows")) || [];
    dataFromLs.push({
      showName: n_showName,
      showImage: n_showImage,
      showRating: n_showRating,
      showDes: n_showDes,
    });

    localStorage.setItem("n_shows", JSON.stringify(dataFromLs));

    document.getElementById("n_showName").value = "";
    document.getElementById("n_showImage").value = "";
    document.getElementById("n_showDes").value = "";
    document.getElementById("n_showRating").value = "";
    alert("Shows are added");
  } else {
    alert("Please fill all fiels");
  }
}

function admin(event) {
  event.preventDefault();

  let adminName = document.getElementById("ad_name").value;
  let adminPass = document.getElementById("ad_pass").value;

  if (adminName === "admin" && adminPass === "password") {
    localStorage.setItem(
      "n_adminData",
      JSON.stringify({ adminName, adminPass })
    );
    alert("Login to Admin");
  } else {
    alert("Login unsucessful");
    document.getElementById("ad_pass").value = "";
    document.getElementById("ad_name").value = "";
  }
}

function addtoWatchList() {
  let userData = JSON.parse(localStorage.getItem("n_users"));
  let currentUser = JSON.parse(localStorage.getItem("net_currentUser"));
  let currentShow = JSON.parse(localStorage.getItem("n_currentShow"));

  if (currentUser) {
    for (let i = 0; i < userData.length; i++) {
      if (userData[i].email === currentUser.email) {
        if (userData[i].watchlist === undefined) {
          userData[i].watchlist = [currentShow];
        } else {
          userData[i].watchlist.push(currentShow);
        }
      }
    }
    localStorage.setItem("n_users",JSON.stringify(userData));

  } else {
    alert("login to Add watchlist");
  }
}
