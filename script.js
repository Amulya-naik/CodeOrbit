document.addEventListener("DOMContentLoaded", () => {

    // Remove portfolio loading screen
    setTimeout(() => {
        const loader = document.querySelector(".loader");

        if (loader) {
            loader.style.opacity = "0";
            loader.style.visibility = "hidden";
            loader.style.pointerEvents = "none";
        }
    }, 800);

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", function (e) {
            const target = document.querySelector(this.getAttribute("href"));

            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

    // Reveal sections while scrolling
    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        },
        { threshold: 0.12 }
    );

    sections.forEach(section => observer.observe(section));
});

// THEME TOGGLE
const themeToggle = document.getElementById("theme-toggle");

if (themeToggle) {
    themeToggle.addEventListener("click", function () {
        document.body.classList.toggle("light-theme");

        if (document.body.classList.contains("light-theme")) {
            themeToggle.innerHTML = "🌙";
        } else {
            themeToggle.innerHTML = "☀️";
        }
    });
}

// MOBILE MENU
const menuToggle = document.getElementById("menu-toggle");
const mobileNav = document.querySelector(".navbar nav");

if (menuToggle && mobileNav) {

    menuToggle.addEventListener("click", function () {

        mobileNav.classList.toggle("mobile-open");

        if (mobileNav.classList.contains("mobile-open")) {
            menuToggle.textContent = "✕";
        } else {
            menuToggle.textContent = "☰";
        }

    });

    mobileNav.querySelectorAll("a").forEach(function(link) {

        link.addEventListener("click", function() {
            mobileNav.classList.remove("mobile-open");
            menuToggle.textContent = "☰";
        });

    });
}