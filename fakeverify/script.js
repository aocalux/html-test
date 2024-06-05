const checkboxBtn = document.getElementById("b-checkbox");
const checkboxBtnSpinner = document.getElementById("d-spinner");

checkboxBtn.addEventListener("click", event => event.preventDefault());

function verifyCaptcha() {
    checkboxBtn.innerText = "✓";
    setTimeout(() => afterVerify(), 2000);
}

function afterVerify() {
    const urlParams = new URLSearchParams(window.location.search);
    const ref = urlParams.get('ref');

    if (ref) {
        window.location.href = `https://gochris.li/verify/${ref}`;
    } else {
        alert("Missing ref argument!");
    } 
}

function toggleCaptcha(display, radius, margin, opacity) {
    checkboxBtn.style.width = display;
    checkboxBtn.style.height = display;
    checkboxBtn.style.borderRadius = radius;
    checkboxBtn.style.margin = margin;
    checkboxBtn.style.opacity = opacity;
}

function toggleLoading(visibility, opacity) {
    checkboxBtnSpinner.style.visibility = visibility;
    checkboxBtnSpinner.style.opacity = opacity;
}

function runClickedCheckboxEffects() {
    toggleCaptcha("4px", "50%", "33px 0 0 25px", "0");
    setTimeout(() => toggleLoading("visible", "1"), 500);
    setTimeout(() => {
        toggleCaptcha("100%", "2px", "21px 0 0 12px", "1");
        toggleLoading("hidden", "0");
        setTimeout(verifyCaptcha, 8);
    }, 5000);
}

runClickedCheckboxEffects();
