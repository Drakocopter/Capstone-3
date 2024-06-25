function truncateText(message) {
    const maxLength = 44;
    if (message.text.length > maxLength) {
        return message.text.substring(0, maxLength) + "...";
    }
    return message.text;
}

function getMessage(message, index) {
    return `
        <li>
            <button type="button" class="btn btn-sticky-note" data-bs-toggle="modal" data-bs-target="#modal${index}">
                <h4 class="username">${message.username}</h4>
                <div class="content">
                    <p>${truncateText(message)}</p>
                </div>
            </button>
            <div class="modal fade" id="modal${index}" tabindex="-1" aria-labelledby="modalLabel${index}" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div class="modal-content">
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
