const form = document.getElementById('contactForm');
const webhookURL = 'https://discord.com/api/webhooks/1274751530435870720/JNkHOcbeGQtswEblepzUJaXKuHewjLi3E-XoUV7PyijiCBCVXnKpNcjpkG4lMQTILQQC'; // Replace with your actual webhook URL

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const namef = document.getElementById("name").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;
    const email = document.getElementById("email").value;

    if (confirm("Durch die Nutzung dieser Funktion stimmen Sie zu, dass Ihre Daten an Discord gesendet und auf deren Infrastruktur verarbeitet werden. Bitte beachten Sie die Datenschutzbestimmungen von Discord unter \nhttps://discord.com/privacy.")) {
        sendDataToWebhook(webhookURL,
            "NEW CONTACT FORM SUBMISSION:\n"
            + "-\n\n" 
            + "NAME: " + namef + "\n"
            + "EMAIL: " + email + "\n"
            + "SUBJECT: " + subject + "\n"
            + "-\n\n"
            + message
            + "\n\n-"
        );
    }
});

function sendDataToWebhook(webhookUrl, data) {
    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content: data,
            embeds: null,
            attachments: []
        })
    })
    .then(response => {
        console.log('Data sent successfully:', response.status);  
        console.log("response.status =", response.status);
        if (response.status === 400) {
            alert("Die Nachricht konnte nicht gesendet werden, da sie zu lang ist. Bitte versuchen Sie es alternativ per E-Mail: \nemail@mail.de");
        }
    })
    .catch(error => {
        console.error('Error sending data:', error);
        alert('Error sending data:', error);
    });
  }