function truncateText(message) {
    const maxLength = 43;
    if (message.text.length > maxLength) {
        return message.text.substring(0, maxLength) + "...";
    }
    return message.text;
}

function getMessage(message, index) {
    const c = Math.round(Math.random() * 3);
    let modalColor;
    if (c === 0) {
        modalColor = "#cfc";
    } else if (c === 1) {
        modalColor = "rgb(255, 255, 204)"; 
    } else if (c === 2){
        modalColor = "#ccf";
    } else {
        modalColor = "rgb(255, 203, 211)";
    }
    return `
        <li>
            <button type="button" class="btn btn-sticky-note c${c}" data-bs-toggle="modal" data-bs-target="#modal${index}" data-color="c${c}">
                <h4 class="username">${message.username}</h4>
                <div class="content">
                    <p>${truncateText(message)}</p>
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
                    </div>
                </div>
            </div>
        </li>
    `;
}
