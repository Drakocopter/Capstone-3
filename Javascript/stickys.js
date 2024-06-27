// Function to truncate text if it exceeds a maximum length
function truncateText(text, maxLength) {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + "...";
    }
    return text;
}

// Function to generate HTML for displaying a message/sticky note
function getMessage(message, index) {
    const c = Math.round(Math.random() * 3);
    let modalColor;
    if (c === 0) {
        modalColor = "#cfc";
    } else if (c === 1) {
        modalColor = "rgb(255, 255, 204)";
    } else if (c === 2) {
        modalColor = "#ccf";
    } else {
        modalColor = "rgb(255, 203, 211)";
    }

    const truncatedText = truncateText(message.text, 43); // Truncate text to 43 characters

    return `
    <li>
        <button type="button" class="btn btn-sticky-note c${c}" data-bs-toggle="modal" data-bs-target="#modal${index}" data-color="c${c}" data-post-id="${message._id}">
            <h4 class="username">${message.username}</h4>
            <div class="content">
                <p>${truncatedText}</p>
            </div>
        </button>
        <div class="modal fade" id="modal${index}" tabindex="-1" aria-labelledby="modalLabel${index}" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content" style="background-color: ${modalColor};">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalLabel${index}">${message.username}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        ${message.text}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-like" onclick="toggleLike(this)" data-post-id="${message._id}" data-liked="false">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-suit-heart" viewBox="0 0 16 16">
                                <path d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.6 7.6 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </li>
    `;
}

// Function to toggle like/unlike on a post
function toggleLike(button) {
    const postId = button.getAttribute('data-post-id');
    const isLiked = button.getAttribute('data-liked') === 'true';

    // Determine the endpoint and HTTP method based on whether it's a like or unlike action
    const endpoint = isLiked ? `/api/likes/${postId}` : '/api/likes';
    const method = isLiked ? 'DELETE' : 'POST';

    fetch(apiBaseURL + endpoint, {
        method: method,
        headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.token
        },
        body: isLiked ? null : JSON.stringify({ postId })
    }).then(response => {
        if (response.ok) {
            console.log(`${isLiked ? 'Unliked' : 'Liked'} post:`, postId);

            // Update UI to reflect the like/unlike action
            button.innerHTML = isLiked ? `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-suit-heart" viewBox="0 0 16 16">
                    <path d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.6 7.6 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z"/>
                </svg>` : `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-suit-heart-fill" viewBox="0 0 16 16">
                    <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1"/>
                </svg>`;

            button.setAttribute('data-liked', !isLiked); // Toggle liked state
        } else {
            console.error(`${isLiked ? 'Failed to unlike' : 'Failed to like'} post:`, response.statusText);
        }
    }).catch(error => {
        console.error(`Error ${isLiked ? 'unliking' : 'liking'} post:`, error);
    });
}

// Example usage:
// const message = {
//     _id: "123abc",
//     username: "example_user",
//     text: "This is a test message.",
// };
// const messageHTML = getMessageHTML(message, 1);
// console.log(messageHTML);
