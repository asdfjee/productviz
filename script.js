document.addEventListener('DOMContentLoaded', () => {
    // --- Get all the important elements from the HTML page ---
    const form = document.querySelector('form[name="order"]');
    const step1 = document.getElementById('step-1');
    const step2 = document.getElementById('step-2');
    const nextStepBtn = document.getElementById('next-step-btn');
    const submitBtn = document.getElementById('submit-btn');
    const spacePhotoInput = document.getElementById('space_photo');
    const spacePreview = document.getElementById('space-preview');
    const furniturePhotoInput = document.getElementById('furniture_photo');
    const furniturePreview = document.getElementById('furniture-preview');
    const emailInput = document.getElementById('customer_email');
    const deliveryMethodRadios = document.querySelectorAll('input[name="delivery_method"]');
    const phoneInputContainer = document.getElementById('phone-input-container');
    const phoneInput = document.getElementById('customer_phone');

    // --- This function shows a preview of the uploaded image ---
    function setupImagePreview(fileInput, previewElement) {
        fileInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    previewElement.src = e.target.result;
                    previewElement.style.display = 'block';
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // --- Set up the previews for both file inputs ---
    setupImagePreview(spacePhotoInput, spacePreview);
    setupImagePreview(furniturePhotoInput, furniturePreview);

    // --- Logic for the "Next Step" button ---
    nextStepBtn.addEventListener('click', () => {
        if (spacePhotoInput.files.length === 0 || furniturePhotoInput.files.length === 0 || emailInput.value.trim() === '') {
            alert('Please upload both photos and provide your email address to continue.');
            return;
        }
        step1.style.display = 'none';
        step2.style.display = 'block';
    });

    // --- Logic to show/hide the phone number field ---
    deliveryMethodRadios.forEach(radio => {
        radio.addEventListener('change', (event) => {
            if (event.target.value === 'Text') {
                phoneInputContainer.style.display = 'block';
                phoneInput.required = true;
            } else {
                phoneInputContainer.style.display = 'none';
                phoneInput.required = false;
            }
        });
    });
    
    // --- Logic for the final "Submit" button ---
    form.addEventListener('submit', () => {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';
    });
});
