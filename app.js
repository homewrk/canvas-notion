// https://canvas.instructure.com/doc/api/users.html
// 
// refer to the "list upcoming assignments, calendar events" section
// 

require("dotenv").config();

const CANVAS_URL = "https://uw.instructure.com/api/v1";
const NOTION_URL = "https://api.notion.com/v1";

let canvas_options = {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${process.env.CANVAS_TOKEN}`
    }
}

let notion_get = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        'Notion-Version': '2022-06-28',
        'Authorization': `Bearer ${process.env.NOTION_TOKEN}`
    }
}

let notion_post = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Notion-Version': '2022-06-28',
      'content-type': 'application/json',
      'Authorization': `Bearer ${process.env.NOTION_TOKEN}`
    },
    body: JSON.stringify({
        'parent': { 
            'type': 'page_id',
            'page_id': `${process.env.NOTION_PAGE_ID}` 
        },
        "title": [
            {
                "type": "text",
                "text": {
                    "content": "Canvas Assignments",
                    "link": null
                }
            }
        ],
        "properties": {
            "Assignment": {
                "title": {}
            },
            "Description": {
                "rich_text": {}
            },
            "Due Date": {
                "date": {}
            }
        }
    })
}

let notion_update = {
    method: 'PATCH',
    headers: {
      accept: 'application/json',
      'Notion-Version': '2022-06-28',
      'content-type': 'application/json',
      'Authorization': `Bearer ${process.env.NOTION_TOKEN}`
    },
    body: JSON.stringify({
        'parent': { 
            'type': 'page_id',
            'page_id': `${process.env.NOTION_PAGE_ID}` 
        },
        "title": [
            {
                "type": "text",
                "text": {
                    "content": "Canvas Assignments",
                    "link": null
                }
            }
        ],
        "properties": {
            "Assignment": {
                "title": {
                    "type": "text",
                    "text": {
                      "content": "assignment"
                    }
                }
            },
            "Description": {
                "rich_text": {
                    "type": "text",
                    "text": {
                      "content": "a cool project"
                    }
                }
            },
            "Due Date": {
                "date": {
                    "end": "2021-05-07"
                }
            }
        }
    })
}

let notion_search = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Notion-Version': '2022-06-28',
      'content-type': 'application/json',
      'Authorization': `Bearer ${process.env.NOTION_TOKEN}`
    },
    body: JSON.stringify({
      filter: {
        property: 'object',
        value: 'page'
      },
    }),
}

async function fetchUsername() {

    let response = await fetch(`${CANVAS_URL}/users/self`, canvas_options);

    console.log(response.status); // 200 is a W
    console.log(response.statusText); // OK is a W

    if (response.status === 200) {
        let data = JSON.parse(await response.text());
        console.log(data.name);
    }
}

async function fetchUpcomingEvents() {

    let response = await fetch(`${CANVAS_URL}/users/self/upcoming_events`, canvas_options);

    console.log(response.status); // 200 is a W
    console.log(response.statusText); // OK is a W

    if (response.status === 200) {
        let data = JSON.parse(await response.text());
        for (let i = 0; i < data.length; i++) {
            console.log(data[i].title);
            console.log(data[i].end_at);
        }
    }
}


async function test() {

    let response = await fetch(`${NOTION_URL}/databases`, notion_post);

    console.log(response.status); // 200 is a W
    console.log(response.statusText); // OK is a W

    if (response.status === 200) {
        console.log("DUBS UP");
    }

    console.log(await response.json())
}

async function testsearch() {

    let response = await fetch(`${NOTION_URL}/search`, notion_search);

    console.log(response.status); // 200 is a W
    console.log(response.statusText); // OK is a W

    if (response.status === 200) {
        console.log("DUBS UP");
    }

    console.log(await response.json())
}

async function testupdate() {

    let response = await fetch(`${NOTION_URL}/databases/${NOTION_DATABASE_ID}`, notion_update);

    console.log(response.status); // 200 is a W
    console.log(response.statusText); // OK is a W

    if (response.status === 200) {
        console.log("DUBS UP");
    }

    console.log(await response.json())
}

// testsearch();
testupdate();
// time is in ISO8601

