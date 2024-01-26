const AUTH_CODE = "1234";

// reject non-numbers
document.querySelector(".mfa-form").addEventListener("keypress", (e) => {
  console.log(e.target.value);
  if(e.target.matches(".mfa-field")) {
    if(/\D/.test(e.key) || !!e.target.value) {
      e.preventDefault();
    }
  }
});

// how do we go next?
const inputs = [...document.querySelectorAll('.mfa-field')];

document.querySelector('.mfa-form').addEventListener("input", (e) => {
  if(e.target.matches(".mfa-field")) {
    const index = inputs.indexOf(e.target);

    const nextInput = inputs[index + 1];

    if(nextInput) {
      nextInput.focus();
    }
  }
});

// gow do we go back?
// backspace
document.querySelector('.mfa-form').addEventListener("keydown", (e) => {
  if(e.target.matches(".mfa-field") && e.keyCode === 8 && e.target.selectionStart === 0 && e.target.selectionEnd === 0) {
    const index = inputs.indexOf(e.target);
    const prevInput = inputs[index - 1];

    if(prevInput) {
      prevInput.focus();
      prevInput.value = "";
    }
  }
});

function submitCode(code) {
  if(code === AUTH_CODE) {
    alert('is correct code');
  } else {
    alert('is not correct');
  }
}

document.querySelector(".mfa-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const code = inputs.map((input) => input.value).join("");
  submitCode(code);
});
