let contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let name = document.getElementById("name").value;
    let subject = document.getElementById("subject-input").value;
    let body = document.getElementById("body-input").value;
    let email = document.getElementById("email").value;

    let sendToEmail = "contact-form-en@chris-prickartz.de";
    let subjectPrefix = "CONTACT-FORM";
    let bodyPrefix = "NEW CONTACT FORM SUBMISSION";

    let sendSubject = subjectPrefix + " || " + name + " || " + subject;

    let sendBody =  bodyPrefix + "\n"
                    + "______________________________________________________________________________________________________________\n\n" 
                    + "NAME: " + name + "\n"
                    + "EMAIL: " + email + "\n"
                    + "SUBJECT: " + subject + "\n"
                    + "______________________________________________________________________________________________________________\n\n"
                    + body
                    + "\n\n______________________________________________________________________________________________________________";

    window.location.href = "mailto:" + sendToEmail + "?subject=" + encodeURIComponent(sendSubject) + "&body=" + encodeURIComponent(sendBody);
});