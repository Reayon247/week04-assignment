console.log("hello world");

// send the message to the database when send is pressed
const messageForm = document.getElementById("messageform");

function handleSubmit(event) {
  event.preventDefault();

  const formData = new FormData(messageForm);
  const formValues = Object.fromEntries(formData);

  fetch("http://localhost:8080/newMessage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formValues),
  });
  console.log(formValues);
  location.replace(location.href);
}

messageForm.addEventListener("submit", handleSubmit);

//Retreive data and display it in the chat box

async function getMessage() {
  const response = await fetch("http://localhost:8080/message");
  const nalaMessages = await response.json();
  // console.log(nalaMessages);
  return nalaMessages;
}

// getMessage();

const messageBox = document.getElementById("user-messages");

function createMessageElements(messageArray) {
  messageArray.forEach((item) => {
    const messageName = document.createElement("h3");
    const messageMessage = document.createElement("p");
    const messageLikes = document.createElement("p");
    //get a like image aswell, heart?
    //make a delete button (Extra)

    messageName.textContent = item.name;
    messageMessage.textContent = item.message;
    messageLikes.textContent = item.likes;

    messageBox.appendChild(messageName);
    messageBox.appendChild(messageMessage);
    messageBox.appendChild(messageLikes);
  });
}

async function renderMessages() {
  const messageContent = await getMessage();
  console.log(messageContent);
  createMessageElements(messageContent);
}
renderMessages();
