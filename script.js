// JavaScript to trigger animations on scroll
document.addEventListener("DOMContentLoaded", () => {
    const hiddenElements = document.querySelectorAll(".hidden");

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    hiddenElements.forEach(element => observer.observe(element));
});

// JavaScript to hide/show header on scroll (mobile only)
document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("header");
    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", () => {
        if (window.innerWidth <= 768) { // Apply only for mobile devices
            if (window.scrollY > lastScrollY) {
                // Scrolling down
                header.style.transform = "translateY(-100%)"; // Hide header
            } else {
                // Scrolling up
                header.style.transform = "translateY(0)"; // Show header
            }
            lastScrollY = window.scrollY;
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav ul li a");

    // Function to update the active link based on scroll position
    const updateActiveLink = () => {
        let currentSection = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            // Adjust the threshold for mobile and desktop
            const threshold = window.innerWidth <= 768 ? 0.2 : 0.3;

            // Check if the current scroll position is within the section
            if (
                window.scrollY >= sectionTop - sectionHeight * threshold &&
                window.scrollY < sectionTop + sectionHeight * (1 - threshold)
            ) {
                currentSection = section.getAttribute("id");
            }
        });

        // If no section is detected, find the closest section
        if (!currentSection) {
            let closestSection = sections[0];
            let closestDistance = Math.abs(window.scrollY - closestSection.offsetTop);

            sections.forEach((section) => {
                const distance = Math.abs(window.scrollY - section.offsetTop);
                if (distance < closestDistance) {
                    closestSection = section;
                    closestDistance = distance;
                }
            });

            currentSection = closestSection.getAttribute("id");
        }

        // Update the active class on the navigation links
        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(currentSection)) {
                link.classList.add("active");
            }
        });
    };

    // Add scroll event listener
    window.addEventListener("scroll", updateActiveLink);

    // Run the function on page load to set the initial active link
    updateActiveLink();
});

// JavaScript for expanding certificate images
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    const closeModal = document.querySelector(".close");

    // Add click event to all certificate images
    document.querySelectorAll(".certificate-image").forEach((image) => {
        image.addEventListener("click", () => {
            modal.style.display = "flex"; // Show the modal
            modalImage.src = image.src; // Set the modal image source
            modalImage.classList.remove("pop-out"); // Remove pop-out class if it exists
            modalImage.classList.add("popup"); // Add popup animation
        });
    });

    // Close the modal when the close button is clicked
    closeModal.addEventListener("click", () => {
        modalImage.classList.remove("popup"); // Remove popup animation
        modalImage.classList.add("pop-out"); // Add pop-out animation

        // Wait for the pop-out animation to finish before hiding the modal
        setTimeout(() => {
            modal.style.display = "none"; // Hide the modal
        }, 400); // Match the duration of the pop-out animation
    });

    // Close the modal when clicking outside the image
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modalImage.classList.remove("popup"); // Remove popup animation
            modalImage.classList.add("pop-out"); // Add pop-out animation

            // Wait for the pop-out animation to finish before hiding the modal
            setTimeout(() => {
                modal.style.display = "none"; // Hide the modal
            }, 400); // Match the duration of the pop-out animation
        }
    });
});

//Javascript for the contact form submission
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const popupMessage = document.getElementById("popupMessage");
    const popupText = document.getElementById("popupText");
    const loadingAnimation = document.querySelector(".loading-animation");
    const tickMarkImage = document.querySelector(".tick-mark-image");

    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent the default form submission

        const formData = new FormData(form);

        // Show the popup with "Sending..." message
        popupText.textContent = "Sending...";
        popupMessage.style.display = "flex";
        popupMessage.classList.remove("exit"); // Reset exit animation
        loadingAnimation.classList.remove("tick"); // Reset to spinner
        tickMarkImage.style.display = "none"; // Hide the tick mark image

        // Simulate sending animation
        setTimeout(() => {
            // Send the form data to Google Forms
            fetch(form.action, {
                method: "POST",
                body: formData,
                mode: "no-cors", // Prevent CORS issues
            })
                .then(() => {
                    // Update the popup message to "Message Sent"
                    popupText.textContent = "Message Sent";

                    // Show the tick mark image and stop the spinner
                    loadingAnimation.classList.add("tick");
                    tickMarkImage.style.display = "block";

                    // Hide the popup after 1 second with exit animation
                    setTimeout(() => {
                        popupMessage.classList.add("exit"); // Add exit animation class
                        setTimeout(() => {
                            popupMessage.style.display = "none"; // Hide after animation ends
                        }, 500); // Match the duration of the exit animation
                    }, 1000);

                    // Clear the form fields
                    form.reset();
                })
                .catch(() => {
                    // Show an error message in the popup
                    popupText.textContent = "Error sending message. Please try again.";
                    popupMessage.style.backgroundColor = "#dc3545"; // Red background for errors
                    setTimeout(() => {
                        popupMessage.classList.add("exit"); // Add exit animation class
                        setTimeout(() => {
                            popupMessage.style.display = "none"; // Hide after animation ends
                        }, 500); // Match the duration of the exit animation
                    }, 1000);
                });
        }, 1000); // Simulate a 1-second sending animation
    });
});

document.addEventListener("DOMContentLoaded", () => {
    // Check if the screen width is for desktop
    if (window.innerWidth >= 992) {
        // Scroll to the top of the page on load
        window.scrollTo(0, 0);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("header");
    let lastScrollY = window.scrollY;

    // Add a class to indicate the animation is complete
    header.addEventListener("animationend", () => {
        header.classList.add("animation-complete");
    });

    // Scroll logic for mobile devices
    window.addEventListener("scroll", () => {
        if (window.innerWidth <= 768) { // Apply only for mobile devices
            if (window.scrollY > lastScrollY) {
                // Scrolling down
                header.style.transform = "translateY(-100%)"; // Hide header
            } else {
                // Scrolling up
                header.style.transform = "translateY(0)"; // Show header
            }
            lastScrollY = window.scrollY;
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const textElement = document.querySelector(".logo");
    const text = "Anandamalya Mukhopadhyay";
    let index = 0;

    const type = () => {
        if (index < text.length) {
            textElement.textContent += text.charAt(index);
            index++;
            requestAnimationFrame(() => setTimeout(type, 70)); // Smooth typing with delay
        }
    };

    // Clear the text content and start typing
    textElement.textContent = "";
    type();
});