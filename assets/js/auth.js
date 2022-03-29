// input fields focus effect
const textInputs = document.querySelectorAll("input");
textInputs.forEach(textInput => {
    textInput.addEventListener('focus',()=>
    {
        let parent = textInput.parentNode;
        parent.classList.add("active");
    })

    textInput.addEventListener('blur',()=>
    {
        let parent = textInput.parentNode;
        parent.classList.remove("active");
    })
})

// password show/hide
const passwordInput = document.querySelector('.pass-input');
const eyeBtn = document.querySelector('.eye-btn');

eyeBtn.addEventListener('click',()=>{
    if(passwordInput.type === 'password')
    {
        passwordInput.type = 'text';
        eyeBtn.innerHTML= '<i class="fa-solid fa-eye"></i>';
    }

    else{
        passwordInput.type = 'password';
        eyeBtn.innerHTML= '<i class="fa-solid fa-eye-slash"></i>';
    }
})

// username/email
function validate() {
    let field = document.getElementById('text1').value;

    // CHeck if email
    if (/\@/.test(field)) {
        field.type = 'email';
        field.name = 'email'
    }
    else {
        // Validate username
        
        field.name = 'username'
    }
}

// Toggling sign in and sign up

const signUpBtn = document.querySelector('.sign-up-btn');
const signInBtn = document.querySelector('.sign-in-btn');
const signUpForm = document.querySelector('.sign-up-form');
const signInForm = document.querySelector('.sign-in-form');

signUpBtn.addEventListener('click',()=>{
    signInForm.classList.add('hide');
    signUpForm.classList.add('show');

    signInForm.classList.remove('show');
})

signInBtn.addEventListener('click',()=>{
    signInForm.classList.remove('hide');
    signUpForm.classList.remove('show');

    signInForm.classList.add('show');
})