// Get all navigation links
const navLinks = document.querySelectorAll("nav ul li a");

// Highlight current page
const currentPage = window.location.pathname.split("/").pop() || "About.html";

navLinks.forEach(link => {
    let linkPage = link.getAttribute("href");
    if (linkPage === currentPage) {
        link.classList.add("active");
    }
});

// Buttons popup (WhatsApp, LinkedIn, Facebook)
const footerButtons = document.querySelectorAll(".footer-links button");

footerButtons.forEach(button => {
    button.addEventListener("click", function () {
        // Just let the link handle the redirect, or show a toast if needed.
        // For now, removing the alert for better UX.
    });
});

