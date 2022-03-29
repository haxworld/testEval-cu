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