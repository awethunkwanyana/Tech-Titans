// Get all navigation links
const navLinks = document.querySelectorAll("nav ul li a");

// Loop through each link
navLinks.forEach(link => {
    link.addEventListener("click", function () {
        // Get the page name from href
        let pageName = this.getAttribute("href");

        // Show popup message
        alert("WELCOME TO ICT CAREER GUIDE!");
    });
});


// Highlight current page
const currentPage = window.location.pathname.split("/").pop();

navLinks.forEach(link => {
    let linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {
        link.style.fontWeight = "bold";
        link.style.color = "red";
    }
});



// Buttons popup (WhatsApp, LinkedIn, Facebook)
const buttons = document.querySelectorAll(".footer-links button");

buttons.forEach(button => {
    button.addEventListener("click", function () {
        alert("Redirecting you to: " + this.innerText);
    });
});


let page = window.location.pathname.split("/").pop();

if (page === "About.html") {
    alert("You are on Home page");
}

