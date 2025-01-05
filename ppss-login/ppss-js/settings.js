document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('settingsForm');
    const successMessage = document.getElementById('successMessage');
    const profileImageInput = document.getElementById('profileImage');
    const imagePreview = document.getElementById('imagePreview');

    profileImageInput.addEventListener('change', function () {
        const file = this.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = function (e) {
                imagePreview.src = e.target.result;
                imagePreview.style.display = "block";
            };

            reader.readAsDataURL(file);
        } else {
            imagePreview.src = "";
            imagePreview.style.display = "none";
        }
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const currentPassword = document.getElementById('currentPassword').value;

        if (password !== confirmPassword) {
            alert('New passwords do not match. Please try again.');
            return;
        }

        if (!currentPassword) {
            alert('Please enter your current password to confirm changes.');
            return;
        }

        // Simulate updating settings
        successMessage.style.display = 'block';
        
        // Reset the form fields
        form.reset();
        imagePreview.src = "";
        imagePreview.style.display = "none";

        // Hide success message after 3 seconds
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 3000);
    });
});

