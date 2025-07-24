document.addEventListener('DOMContentLoaded', () => {
    // --- Element References ---
    const form = document.querySelector('form[name="order"]');
    const step1 = document.getElementById('step-1');
    const step2 = document.getElementById('step-2');
    const nextStepBtn = document.getElementById('next-step-btn');
    const submitBtn = document.getElementById('submit-btn');
    
    // Step 1 Inputs
    const spacePhotoInput = document.getElementById('space_photo');
    const spacePreview = document.getElementById('space-preview');
    const emailInput = document.getElementById('customer_email');

    // --- NEW: Furniture Specification Elements ---
    const furnitureMethodRadios = document.querySelectorAll('input[name="furniture_method"]');
    const photoSection = document.getElementById('furniture-photo-section');
    const descriptionSection = document.getElementById('furniture-description-section');
    
    // Inputs within the dynamic sections
    const furniturePhotoInput = document.getElementById('furniture_photo');
    const furniturePreview = document.getElementById('furniture-preview');
    const furnitureDescriptionInput = document.getElementById('furniture_description');
    const referencePhotoInput = document.getElementById('reference_photo');
    const referencePreview = document.getElementById('reference-preview');
    
    // --- Initialize required fields based on default choice ---
    furniturePhotoInput.required = true;
    furnitureDescriptionInput.required = false;

    // --- Function to handle image previews ---
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
    setupImagePreview(spacePhotoInput, spacePreview);
    setupImagePreview(furniturePhotoInput, furniturePreview);
    setupImagePreview(referencePhotoInput, referencePreview); // Setup preview for the new optional input

    // --- NEW: Logic to switch between furniture specification methods ---
    furnitureMethodRadios.forEach(radio => {
        radio.addEventListener('change', (event) => {
            if (event.target.value === 'upload') {
                photoSection.style.display = 'block';
                descriptionSection.style.display = 'none';
                furniturePhotoInput.required = true;
                furnitureDescriptionInput.required = false;
            } else { // 'describe'
                photoSection.style.display = 'none';
                descriptionSection.style.display = 'block';
                furniturePhotoInput.required = false;
                furnitureDescriptionInput.required = true;
            }
        });
    });

    // --- UPDATED: "Next Step" Button Logic with new validation ---
    nextStepBtn.addEventListener('click', () => {
        const isUpload = document.getElementById('choice_upload').checked;
        let isFurnitureSpecValid = false;

        if (isUpload) {
            isFurnitureSpecValid = furniturePhotoInput.files.length > 0;
        } else {
            isFurnitureSpecValid = furnitureDescriptionInput.value.trim() !== '';
        }

        if (spacePhotoInput.files.length === 0 || emailInput.value.trim() === '' || !isFurnitureSpecValid) {
            alert('Please upload a photo of your space, provide your email, and specify your furniture by either uploading a photo or describing it.');
            return;
        }
        
        step1.style.display = 'none';
        step2.style.display = 'block';
    });
    
    // (The delivery method and submit logic remains the same)
    // ...
});
