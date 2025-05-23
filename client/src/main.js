console.log("hello world");

// send the message to the database when send is pressed
const messageForm = document.getElementById("messageform");

function handleSubmit(event) {
  event.preventDefault();

  const formData = new FormData(messageForm);
  const formValues = Object.fromEntries(formData);

  fetch("https://week04-assignment-w92u.onrender.com/newMessage", {
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
  const response = await fetch(
    "https://week04-assignment-w92u.onrender.com/message"
  );
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
    const messageLikeButton = document.createElement("img");
    //make a delete button (Extra)

    messageName.textContent = item.name;
    messageMessage.textContent = item.message;
    messageLikes.textContent = item.likes;
    messageLikes.className = "likes";
    messageLikeButton.src = "./src/heart.png";
    messageLikeButton.alt = "A heart shaped like button";
    messageLikeButton.className = "heartButton";

    messageBox.appendChild(messageName);
    messageBox.appendChild(messageMessage);
    messageBox.appendChild(messageLikes);
    messageBox.appendChild(messageLikeButton);

    messageLikeButton.addEventListener("click", () => {
      item.likes += 1;
      messageLikeButton.src = "./src/heart-liked.png";
      messageLikes.textContent = item.likes;
      //Attempted to update likes but I dont think I fully understand the update function or how to go about it
      // fetch("http://localhost:8080/updateLike", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(item.likes),
      // });
    });
  });
}

async function renderMessages() {
  const messageContent = await getMessage();
  console.log(messageContent);
  createMessageElements(messageContent);
}
renderMessages();
