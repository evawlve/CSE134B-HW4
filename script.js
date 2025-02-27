document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form-js");
    const nameField = document.getElementById("name");
    const emailField = document.getElementById("email");
    const messageField = document.getElementById("message");
    const formErrorsField = document.getElementById("form-errors");
  
    let formErrors = [];
  
    /**
     * A helper function to set a custom error message for a field
     * and track that error in `formErrors`.
     */
    function validateField(field, customMsg) {
      const errorEl = field.nextElementSibling;
      
      if (!field.checkValidity()) {
        // The field is invalid according to built-in constraints
        field.setCustomValidity(customMsg);
        errorEl.textContent = customMsg;
        errorEl.style.opacity = "1";
  
        // Push this error into our array
        formErrors.push({ 
          field: field.name, 
          value: field.value, 
          error: customMsg 
        });
      } else {
        // Clear any previous error
        field.setCustomValidity("");
        errorEl.textContent = "";
        errorEl.style.opacity = "0";
      }
    }
  
    // ====== NAME FIELD REAL-TIME CHECKS ======
    nameField.addEventListener("input", () => {
      const errorEl = nameField.nextElementSibling;
      const value = nameField.value.trim();
  
      // Check min length
      if (value.length < 2) {
        nameField.setCustomValidity("Name must be at least 2 characters.");
        errorEl.textContent = "Name must be at least 2 characters.";
        errorEl.style.opacity = "1";
        return;
      }
  
      // Check pattern (letters + spaces)
      const regex = /^[A-Za-z\s]+$/;
      if (!regex.test(value)) {
        nameField.setCustomValidity("Only letters and spaces are allowed.");
        errorEl.textContent = "Only letters and spaces are allowed.";
        errorEl.style.opacity = "1";
        return;
      }
  
      // Clear error if all is good
      nameField.setCustomValidity("");
      errorEl.textContent = "";
      errorEl.style.opacity = "0";
    });
  
    // ====== EMAIL FIELD EVENTS ======
  
    // Light real-time checks on input
    emailField.addEventListener("input", () => {
      emailField.setCustomValidity(""); // Clear old error
      const errorEl = emailField.nextElementSibling;
  
      // Check built-in validity
      if (!emailField.validity.valid) {
        emailField.setCustomValidity("Please enter a valid email.");
        errorEl.textContent = emailField.validationMessage;
        errorEl.style.opacity = "1";
      } else {
        errorEl.textContent = "";
        errorEl.style.opacity = "0";
      }
    });
  
    // Show error only after user leaves the field (blur)
    emailField.addEventListener("blur", () => {
      emailField.setCustomValidity("");
      const errorEl = emailField.nextElementSibling;
  
      if (!emailField.validity.valid) {
        emailField.setCustomValidity("Please enter a valid email.");
        errorEl.textContent = emailField.validationMessage;
        errorEl.style.opacity = "1";
      } else {
        errorEl.textContent = "";
        errorEl.style.opacity = "0";
      }
    });
  
    // Clear error on focus (optional)
    emailField.addEventListener("focus", () => {
      const errorEl = emailField.nextElementSibling;
      emailField.setCustomValidity("");
      errorEl.textContent = "";
      errorEl.style.opacity = "0";
    });
  
    // ====== MESSAGE FIELD: Character Countdown ======
    messageField.addEventListener("input", () => {
      const infoEl = messageField.nextElementSibling; // .js-info-message
      const maxChars = 500;
      const remaining = maxChars - messageField.value.length;
  
      infoEl.textContent = `Remaining characters: ${remaining}`;
      if (remaining <= 50 && remaining > 10) {
        infoEl.style.color = "orange";
      } else if (remaining <= 10) {
        infoEl.style.color = "red";
      } else {
        infoEl.style.color = "gray";
      }
    });
  
    // ====== FINAL SUBMISSION CHECK ======
    form.addEventListener("submit", (e) => {
      // Reset the array each time a new submit is attempted
      formErrors = [];
  
      // Validate each field to capture errors
      if (!nameField.checkValidity()) {
        validateField(nameField, "Name must be at least 2 characters (letters/spaces only).");
      }
      if (!emailField.checkValidity()) {
        validateField(emailField, "Please enter a valid email.");
      }
      if (!messageField.checkValidity()) {
        validateField(messageField, "Message must be at least 10 characters.");
      }
  
      // If any errors exist
      if (formErrors.length > 0) {
        // If you want to prevent submission so user can correct:
        // e.preventDefault();
  
        // Store errors in hidden field
        formErrorsField.value = JSON.stringify(formErrors);
      }
    });
  });
  