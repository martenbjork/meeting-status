const fetch = require("node-fetch");
const isCameraOn = require("is-camera-on");
let lastStatus = -1;

const updateStatus = async () => {
  const newStatus = await isCameraOn();
  if (lastStatus !== newStatus) {
    fetch(
      "https://meeting-status-d0db6.firebaseio.com/users/2ee2e222-164d-457d-9677-07324526429f/.json",
      {
        method: "PATCH",
        body: JSON.stringify({
          status: newStatus ? 2 : 0,
        }),
      }
    ).catch((error) => console.log(error));
    lastStatus = newStatus;
  }
};

setInterval(updateStatus, 5000);
