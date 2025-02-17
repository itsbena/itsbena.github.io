function isMobileDevice() {
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function checkScreenSize() {
    if (isMobileDevice() && window.location.pathname !== "/mobile.html") {
        window.location.href = "mobile.html";
    } else if (!isMobileDevice() && window.location.pathname !== "/index.html") {
        window.location.href = "index.html";
    }
}

document.addEventListener("DOMContentLoaded", checkScreenSize);
