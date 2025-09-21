// Section 1: Global Scope and Event Handling
// Declare global variables for DOM elements
const form = document.getElementById('conservation-form');
const animateFactsButton = document.getElementById('animate-facts');
const animateMediaButton = document.getElementById('animate-media');
const formStatus = document.getElementById('form-status');

// Event listeners with block scope for safety
{
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
    if (animateFactsButton) {
        animateFactsButton.addEventListener('click', triggerFactsAnimation);
    }
    if (animateMediaButton) {
        animateMediaButton.addEventListener('click', triggerMediaAnimation);
    }
}

// Section 2: Animation Trigger Functions with Parameters and Return Values
// Function to trigger facts list animation
function triggerFactsAnimation() {
    const factsList = document.querySelector('.elephant-facts');
    let isAnimated = factsList.classList.contains('animated'); // Local scope variable
    factsList.classList.toggle('animated');
    animateFactsButton.textContent = isAnimated ? 'Animate Facts' : 'Stop Animation';
    return !isAnimated; // Returns new animation state
}

// Function to trigger media bounce animation
function triggerMediaAnimation() {
    const mediaContainer = document.querySelector('.media-container');
    let isAnimated = mediaContainer.classList.contains('animated'); // Local scope variable
    mediaContainer.classList.toggle('animated');
    animateMediaButton.textContent = isAnimated ? 'Animate Media' : 'Stop Animation';
    return !isAnimated; // Returns new animation state
}

// Section 3: Form Validation with Scope, Parameters, and Return Values
// Custom validation function for specific input
function validateInput(input, type, minLength = 0, maxLength = Infinity) {
    const value = input.trim(); // Parameter for input value
    if (!value) {
        return { valid: false, message: `${type} is required.` };
    }
    if (value.length < minLength || value.length > maxLength) {
        return { valid: false, message: `${type} must be ${minLength}-${maxLength} characters.` };
    }
    if (type === 'Email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return { valid: false, message: 'Invalid email format.' };
    }
    if (type === 'Phone' && value && !/^\d{10}$/.test(value)) {
        return { valid: false, message: 'Phone must be 10 digits.' };
    }
    return { valid: true, message: '' }; // Return object for validation result
}

// Main form submission handler
function handleFormSubmit(event) {
    event.preventDefault(); // Prevent default submission

    // Local scope for form inputs
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const pledgeType = document.getElementById('pledge-type').value;
    const message = document.getElementById('message').value;
    const newsletter = document.getElementById('newsletter').checked;

    // Validate inputs using validateInput function
    const errors = [];
    {
        const nameResult = validateInput(name, 'Name', 2, 50);
        if (!nameResult.valid) errors.push(nameResult.message);

        const emailResult = validateInput(email, 'Email');
        if (!emailResult.valid) errors.push(emailResult.message);

        const phoneResult = validateInput(phone, 'Phone', 0, 10);
        if (!phoneResult.valid && phone) errors.push(phoneResult.message);

        if (!pledgeType) {
            errors.push('Pledge type is required.');
        }

        const messageResult = validateInput(message, 'Message', 10, 500);
        if (!messageResult.valid) errors.push(messageResult.message);
    }

    // Display result with animation
    if (errors.length > 0) {
        formStatus.textContent = 'Errors: ' + errors.join(' ');
        formStatus.style.backgroundColor = '#f8d7da'; // Red for errors
        formStatus.style.opacity = '0';
        setTimeout(() => { formStatus.style.opacity = '1'; }, 100); // Fade-in
    } else {
        formStatus.textContent = `Thank you, ${name}! Your ${pledgeType} pledge is received. ${newsletter ? 'Subscribed to updates!' : ''}`;
        formStatus.style.backgroundColor = '#d4edda'; // Green for success
        formStatus.style.opacity = '0';
        setTimeout(() => { formStatus.style.opacity = '1'; }, 100); // Fade-in
        form.reset(); // Clear form
    }

    return errors.length === 0; // Return submission success status
}