// 1. Define the hardcoded list of image file names.
// This array dictates what images are loaded.
const IMAGE_FILES = [
    '1.png', 
    '2.png', 
    '3.png', 
    '4.png',
    '5.png', 
    '6.png', 
    '7.png', 
    '8.png',
    '9.png', 
    '10.png', 
    '11.png', 
    '12.png',
    '13.png'
    // Add more file names here (e.g., 'review-5.png') if they exist in the feedback folder.
];

// 2. Synchronous function to load and display the images
function loadFeedbackImages() {
    const feedbackFolderUrl = 'feedback/';
    const gridContainer = document.getElementById('feedback-grid');
    
    if (!gridContainer) {
        console.error('Error: The feedback-grid container (ID: #feedback-grid) was not found in the HTML.');
        return; 
    }

    // Clear any previous error messages/fallbacks
    gridContainer.innerHTML = ''; 

    // Loop through the hardcoded list and build the HTML elements
    IMAGE_FILES.forEach((fileName, index) => {
        const imagePath = `${feedbackFolderUrl}${fileName}`;
        
        // Create elements: <div class="feedback-card">...</div>
        const cardDiv = document.createElement('div');
        cardDiv.className = 'feedback-card';
        
        // Create elements: <img src="..." alt="..." class="review-image">
        const imgElement = document.createElement('img');
        imgElement.src = imagePath;
        imgElement.alt = `Patient Review ${index + 1}`;
        imgElement.className = 'review-image';
        imgElement.loading = 'lazy'; // Add lazy loading for performance

        // Append all together
        cardDiv.appendChild(imgElement);
        gridContainer.appendChild(cardDiv);
    });
}


// Scrolling function (remains the same)
const feedbackGrid = document.getElementById('feedback-grid');

function scrollFeedbacks(direction) {
    if (feedbackGrid) {
        // Scrolls approximately 80% of the grid width
        const scrollDistance = feedbackGrid.clientWidth * 0.8 * direction;
        
        feedbackGrid.scrollBy({
            left: scrollDistance,
            behavior: 'smooth'
        });
    }
}

// 3. Run the synchronous function when the page loads
document.addEventListener('DOMContentLoaded', loadFeedbackImages);