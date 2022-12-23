require("dotenv").config();

const URL = "https://uw.instructure.com/api/v1";

let options = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${process.env.CANVAS_TOKEN}`
    }
}

async function fetchUsername() {

    let response = await fetch(`${URL}/users/self`, options);

    console.log(response.status); // 200 is a W
    console.log(response.statusText); // OK is a W

    if (response.status === 200) {
        let data = JSON.parse(await response.text());
        console.log(data.name);
    }
}

async function fetchUpcomingEvents() {

    let response = await fetch(`${URL}/users/self/upcoming_events`, options);

    console.log(response.status); // 200 is a W
    console.log(response.statusText); // OK is a W

    if (response.status === 200) {
        let data = JSON.parse(await response.text());
        for (let i = 0; i < data.length; i++) {
            console.log(data[i].title);
        }
    }
}
