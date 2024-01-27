const form = document.getElementById('form');
const UserName = document.getElementById('UserName');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const password = document.getElementById('password');
const confirmpassword = document.getElementById('confirmpassword');

// Add event
form.addEventListener('submit', (event) => {
    event.preventDefault();
    validate();
});

const sendData = (UserNameVal, sRate, count) => {
    if (sRate === count) {
        alert('Registration Successful');
        // Using SweetAlert for a more user-friendly alert
        Swal.fire({
            icon: 'success',
            title: 'Registration Successful',
            text: `Welcome, ${UserNameVal}!`,
        }).then(() => {
            // Redirecting to demo.html with username parameter after SweetAlert is closed
            window.location.href = `demo.html?username=${encodeURIComponent(UserNameVal)}`;
        });
    }
}

// Final
const showSuccessAlert = () => {
    Swal.fire({
        title: 'Welcome!',
        text: 'Registration successful',
        icon: 'success',
        timer: 3000, // Show the alert for 3 seconds
        timerProgressBar: true,
        showConfirmButton: false // Disable the "OK" button
    });
};

const SuccessMsg = (UserNameVal) => {
    let formCon = document.getElementsByClassName('form-control');
    var count = formCon.length - 1;
    for (var i = 0; i < formCon.length; i++) {
        if (formCon[i].classList.contains('error')) {
            return false; // If any form control is not successful, exit early
        }
    }

    // If all form controls are successful, proceed with success message
    var sRate = formCon.length; // Assuming you want to count all successful form controls
    console.log(sRate);
    sendData(UserNameVal, sRate, count);
    showSuccessAlert(); // Call the function to show the SweetAlert
};

// Email more validation
const isEmail = (emailVal) => {
    let atSymbol = emailVal.indexOf('@');
    if (atSymbol < 1) return false;
    let dot = emailVal.lastIndexOf('.');
    if (dot <= atSymbol + 2 || dot === emailVal.length - 1) return false;
    return true;
};

// Define the validate function
const validate = () => {
    const UserNameVal = UserName.value.trim();
    const emailVal = email.value.trim();
    const phoneVal = phone.value.trim();
    const passwordVal = password.value.trim();
    const confirmpasswordVal = confirmpassword.value.trim();

    // Validate username
    if (UserNameVal === '') {
        setErrorMsg(UserName, 'Username cannot be blank');
    } else if (UserNameVal.length <= 2) {
        setErrorMsg(UserName, 'Username must contain at least 3 characters');
    } else {
        setSuccessMsg(UserName);
    }

    // Validate email
    if (emailVal === '') {
        setErrorMsg(email, 'Email cannot be blank');
    } else if (!isEmail(emailVal)) {
        setErrorMsg(email, 'Invalid Email');
    } else {
        setSuccessMsg(email);
    }

    // Validate phone number
    if (phoneVal === '') {
        setErrorMsg(phone, 'Mobile number cannot be blank');
    } else if (phoneVal.length !== 10) {
        setErrorMsg(phone, 'Not a valid mobile number');
    } else {
        setSuccessMsg(phone);
    }

    // Validate Password
    if (passwordVal === '') {
        setErrorMsg(password, 'Password Cannot be null');
    } else if (passwordVal.length < 8) {
        setErrorMsg(password, 'Password must contain at least 8 characters');
    } else {
        setSuccessMsg(password);
    }

    // Validate Re-enter password
    if (confirmpasswordVal === '') {
        setErrorMsg(confirmpassword, 'Password Cannot be null');
    } else if (passwordVal !== confirmpasswordVal) {
        setErrorMsg(confirmpassword, 'Passwords Must Match');
    } else {
        setSuccessMsg(confirmpassword);
    }

    SuccessMsg(UserNameVal);

    function setErrorMsg(input, errorMsg) {
        const formControl = input.parentElement;
        const small = formControl.querySelector('small');
        formControl.classList.remove('success');
        formControl.classList.add('error');
        small.innerText = errorMsg;
    }

    function setSuccessMsg(input) {
        const formControl = input.parentElement;
        formControl.classList.remove('error');
        formControl.classList.add('success');
    }
};
