
document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("theme-toggle");
    if (!toggleBtn) return;
  
    // Show the button when JS is on
    toggleBtn.style.display = "inline-block";
  
    // Load saved theme or default to 'light'
    const savedTheme = localStorage.getItem("site-theme") || "light";
    document.body.setAttribute("data-theme", savedTheme);
    toggleBtn.textContent = savedTheme === "dark" ? "Light Mode" : "Dark Mode";
  
    toggleBtn.addEventListener("click", () => {
      const currentTheme = document.body.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      document.body.setAttribute("data-theme", newTheme);
      toggleBtn.textContent = newTheme === "dark" ? "Light Mode" : "Dark Mode";
      localStorage.setItem("site-theme", newTheme);
    });
  });
  