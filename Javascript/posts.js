/* Posts Page JavaScript */

"use strict";

function like(postId) {
    fetch(apiBaseURL + "/api/likes", {
        method: "POST",
        headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.token
        },
        body: JSON.stringify({ postId: postId })
    }).then(response => {
        if (response.ok) {
            console.log("Liked post:", postId);
        } else {
            console.error("Failed to like post:", response.statusText);
        }
    }).catch(error => {
        console.error("Error liking post:", error);
    });
}

document.getElementById("buttonPostMessage").addEventListener("click", e => {
    fetch(apiBaseURL + "/api/posts", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.token
        },
        body: JSON.stringify({ text: document.getElementById("messageElement").value })
    }).then(response => {
        if (response.ok) {
            console.log("Post created");
            location.reload();  // force refresh
        } else {
            console.error("Failed to create post:", response.statusText);
        }
    }).catch(error => {
        console.error("Error creating post:", error);
    });
});

function showMessages(messages) {
    if (messages.hasOwnProperty("message")) {
        location = "/";
        return;
    }
    document.getElementById("messagesOutput").innerHTML = "<ul>" + messages.map((message, index) => getMessage(message, index)).join("") + "</ul>";
}

fetch(apiBaseURL + "/api/posts?limit=1000&offset=0", {
    method: "GET",
    headers: { Authorization: "Bearer " + localStorage.token }
}).then(response => {
    if (response.status >= 400) {
        console.log(response);
        location = "/";
    }
    return response.json();
}).then(showMessages).catch(error => {
    console.error("Error fetching posts:", error);
});
