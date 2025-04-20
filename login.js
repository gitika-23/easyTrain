document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    const userId = document.getElementById("User");
    const password = document.getElementById("Password");

    form.addEventListener("submit", function(event) {
        let valid = true;

        // Clear previous error messages
        document.querySelectorAll(".error").forEach(e => e.remove());

        // Validate User ID
        if (userId.value.trim() === "") {
            valid = false;
            showError(userId, "User ID is required.");
        }

        // Validate Password
        if (password.value.trim() === "") {
            valid = false;
            showError(password, "Password is required.");
        }

        if (!valid) {
            event.preventDefault(); // Prevent form submission if invalid
        }
    });

    function showError(input, message) {
        const error = document.createElement("div");
        error.className = "error";
        error.textContent = message;
        input.insertAdjacentElement("afterend", error);
    }
});
