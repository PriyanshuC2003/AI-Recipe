let stream; // Declare stream in a higher scope

// Navigation to second page
function navigateToSecondPage() {
    window.location.href = 'recipe_page.html';
}

// Placeholder AI chatbot action
function openChatbot() {
    alert('🤖 Chatbot feature coming soon!');
}

// Mock function for ingredient search
const searchInput = document.getElementById('ingredient-search');
searchInput?.addEventListener('input', () => {
    const query = searchInput.value.trim();
    const output = document.getElementById('output-result');
    if (query) {
        output.innerHTML = `🔍 Searching for recipes with: <span style='color:#00FFC6'>${query}</span>`;
    } else {
        output.innerHTML = '✨ Your AI-powered recipe suggestions will appear here...';
    }
    output.style.transition = '0.3s ease';
    output.style.transform = 'scale(1.05)';
    setTimeout(() => output.style.transform = 'scale(1)', 300);
});

// Mock image upload behavior
const uploadInput = document.getElementById('upload-image');
uploadInput?.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const output = document.getElementById('output-result');
    if (file) {
        output.innerHTML = `⚡ Image uploaded: <span style='color:#00FFC6'>${file.name}</span>. Analyzing ingredients...`;
        output.style.animation = 'glow 1s ease infinite alternate';
    }
});

// Extra futuristic touches
window.onload = () => {
    document.body.style.opacity = '0';
    setTimeout(() => document.body.style.transition = '1s ease', 100);
    setTimeout(() => document.body.style.opacity = '1', 200);
};

// Button to open camera popup
const cameraButton = document.createElement('button');
cameraButton.innerText = '📸 Use Camera';
cameraButton.style.padding = '10px 20px';
cameraButton.style.background = '#00FFC6';
cameraButton.style.color = '#000';
cameraButton.style.border = 'none';
cameraButton.style.borderRadius = '5px';
cameraButton.style.cursor = 'pointer';
document.body.appendChild(cameraButton);

// Open camera popup
cameraButton.addEventListener('click', () => {
    const cameraPopup = document.createElement('div');
    cameraPopup.style.position = 'fixed';
    cameraPopup.style.top = '50%';
    cameraPopup.style.left = '50%';
    cameraPopup.style.transform = 'translate(-50%, -50%)';
    cameraPopup.style.width = '645px';
    cameraPopup.style.height = '480px';
    cameraPopup.style.background = '#000';
    cameraPopup.style.padding = '10px';
    cameraPopup.style.boxShadow = '0 0 15px #00FFC6';
    cameraPopup.style.borderRadius = '10px';
    cameraPopup.style.zIndex = '1000';
    cameraPopup.style.display = 'flex';
    cameraPopup.style.flexDirection = 'column';
    cameraPopup.style.alignItems = 'center';
    cameraPopup.style.opacity = '0';
    cameraPopup.style.transition = 'opacity 0.5s ease';
    document.body.appendChild(cameraPopup);

    setTimeout(() => cameraPopup.style.opacity = '1', 50);

    // Close button for popup - FIXED VERSION
    const closeButton = document.createElement('button');
    closeButton.innerText = '❌';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '5px';
    closeButton.style.right = '5px';
    closeButton.style.padding = '5px 10px';
    closeButton.style.background = '#FF5555'; // Added missing background color
    closeButton.style.color = '#FFF';
    closeButton.style.border = 'none';
    closeButton.style.borderRadius = '5px';
    closeButton.style.cursor = 'pointer';
    closeButton.style.zIndex = '1001'; // Added to ensure it's above other elements
    cameraPopup.appendChild(closeButton);

    // Add video stream to popup
    const video = document.createElement('video');
    video.autoplay = true;
    video.style.width = '100%';
    video.style.borderRadius = '5px';
    cameraPopup.appendChild(video);

    async function startCamera() {
        try {
            stream = await navigator.mediaDevices.getUserMedia({ video: true });
            video.srcObject = stream;
        } catch (error) {
            console.error('Error accessing camera:', error);
        }
    }
    startCamera();

    // Capture button inside popup
    const captureButton = document.createElement('button');
    captureButton.innerText = '📸 Capture Image';
    captureButton.style.marginTop = '10px';
    captureButton.style.padding = '10px 20px';
    captureButton.style.background = '#00FFC6';
    captureButton.style.color = '#000';
    captureButton.style.border = 'none';
    captureButton.style.borderRadius = '5px';
    captureButton.style.cursor = 'pointer';
    cameraPopup.appendChild(captureButton);

    // Capture image
    captureButton.addEventListener('click', () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imgURL = canvas.toDataURL('image/png');
        const img = document.createElement('img');
        img.src = imgURL;
        img.style.marginTop = '10px';
        img.style.border = '2px solid #00FFC6';
        img.style.borderRadius = '5px';
        img.style.boxShadow = '0 0 15px #00FFC6';
        document.body.appendChild(img);
        closePopup();
    });

    // Close button event handler - FIXED VERSION
    closeButton.addEventListener('click', () => {
        closePopup();
    });

    // Improved closePopup function
    function closePopup() {
        if (cameraPopup && document.body.contains(cameraPopup)) {
            cameraPopup.style.opacity = '0';
            setTimeout(() => {
                if (document.body.contains(cameraPopup)) {
                    document.body.removeChild(cameraPopup);
                }
                if (stream) {
                    stream.getTracks().forEach(track => track.stop());
                }
            }, 500);
        }
    }
});