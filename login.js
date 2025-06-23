  


  const loginLink = document.getElementById('loginLink');
  const loginContainer = document.getElementById('loginContainer');
  const otpContainer = document.getElementById('otpContainer');
  const overlay = document.getElementById('overlay');
  const sendOtpBtn = document.getElementById('sendOtpBtn');
  const phoneInput = document.getElementById('phone');
  const displayPhone = document.getElementById('displayPhone');
  const loginBtn = document.getElementById('loginBtn');
  let overlay = document.getElementById('overlay');
  let timerElement = document.getElementById('timer');

  loginLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginContainer.style.display = 'block';
    overlay.style.display = 'block';
  });




  sendOtpBtn.addEventListener('click', () => {
  const phone = phoneInput.value;
  if (phone.length === 10) {
    loginContainer.style.display = 'none';
    otpContainer.style.display = 'block';
    overlay.style.display = 'block';
    displayPhone.innerText = '+91 ' + phone;
  } else {
    alert('Enter a valid 10-digit number.');
  }
});


 function sendOTP(phone) {
      // 👇 Replace with real API Key and phone number handling
      console.log("Sending OTP to:", phone);

      // Fast2SMS Example (simulated)
      fetch("https://www.fast2sms.com/dev/bulkV2", {
        method: "POST",
        headers: {
          "Authorization": "dZuIPgDh31n4saEvCebym89tX5W2SpYUQlHcBRoqrGVOf6wjA7GXLsdmtvKiB4FANYPgCZhjrq63RVM7", // Replace with real key
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          route: "otp",
          variables_values: "123456", // demo OTP
          numbers: phone
        })
      })
      .then(res => res.json())
      .then(data => {
        console.log("OTP sent successfully:", data);
      })
      .catch(err => {
        console.error("Error sending OTP:", err);
      });
    }
  loginBtn.addEventListener('click', () => {
    otpContainer.style.display = 'none';
    overlay.style.display = 'none';
   
    window.location.href = "home.html";  // make sure this file exists
  });

  loginBtn.addEventListener('click', () => {
  alert("Login clicked");
  window.location.href = "menu.html";
});


  document.getElementById('changeNumber').addEventListener('click', (e) => {
    e.preventDefault();
    otpContainer.style.display = 'none';
    loginContainer.style.display = 'block';
  });

  overlay.addEventListener('click', () => {
    loginContainer.style.display = 'none';
    otpContainer.style.display = 'none';
    overlay.style.display = 'none';
  });

 
 function logout() {
  localStorage.removeItem('isLoggedIn');
  location.reload(); // refresh to reset state
}
