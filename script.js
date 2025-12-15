// NEW: Get the Buy Now button and the waitlist modal elements
const buyNowBtn = document.getElementById('buy-now-btn');
const waitlistModal = document.getElementById('waitlist-modal');

// Renamed and updated: Get the waitlist form and success modal elements
const waitlistForm = document.getElementById('waitlist-form');
const successModal = document.getElementById('waitlist-success-message'); 

// Get the close buttons from both modals
const waitlistCloseBtns = waitlistModal.querySelectorAll('.close-btn');
const successCloseBtn = successModal.querySelector('.close-btn');

// --- Modal Functions ---

// Function to show a modal
function showModal(modalElement) {
  modalElement.classList.add('active');
}

// Function to hide a modal
function hideModal(modalElement) {
  modalElement.classList.remove('active');
}

// --- Event Listeners for Opening/Closing Modals ---

// 1. Open the Waitlist Modal when "Buy now" is clicked
buyNowBtn.addEventListener('click', () => {
  showModal(waitlistModal);
});


// 2. Hide Modals when the close button or overlay is clicked

// Close the Waitlist Modal using its close buttons
waitlistCloseBtns.forEach(btn => {
  btn.addEventListener('click', () => hideModal(waitlistModal));
});

// Close the Success Modal
successCloseBtn.addEventListener('click', () => hideModal(successModal));


// Hide the modal when clicking the dark background overlay for both
[waitlistModal, successModal].forEach(modal => {
    modal.addEventListener('click', (e) => {
        // Only hide if the click is on the overlay
        if (e.target === modal) {
            hideModal(modal);
        }
    });
});


// --- Waitlist Form Submission Logic ---
waitlistForm.addEventListener('submit', e => {
  
  e.preventDefault();

  const email = waitlistForm.email.value;

  // Replace YOUR_FORM_ID and ENTRY_ID with your values (keeping your existing values)
  const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdhNriWqKbAasFpwKF_Qp5_mmE8VzTkNjzaIBuV2gNq8mb7KA/formResponse";
  const formData = new FormData();
  formData.append("entry.1928175643", email);

  fetch(formUrl, {
    method: "POST",
    body: formData,
    mode: "no-cors"
  }).then(() => {
    // 1. Hide the waitlist form modal
    hideModal(waitlistModal);
    
    // 2. Show the success message modal
    showModal(successModal);
    
    // 3. Reset the form for the next entry
    waitlistForm.reset();
    
  }).catch(() => {
    console.log("There was a problem submitting your email. Please try again!");
    // You could optionally show an error modal here
  });
  
});