// ========================================
// LIVE VIDEO STREAMING
// ========================================

let videoStream = null;

const videoElement =
    document.getElementById("video-stream");

const cameraSelect =
    document.getElementById("camera-select");

const startVideoButton =
    document.getElementById("start-video-btn");

const stopVideoButton =
    document.getElementById("stop-video-btn");

const videoStatus =
    document.getElementById("video-status");


// ========================================
// LOAD AVAILABLE CAMERAS
// ========================================

async function loadCameras() {

    try {

        const devices =
            await navigator.mediaDevices.enumerateDevices();

        cameraSelect.innerHTML =
            `<option value="">Select Camera</option>`;

        devices
            .filter(device => device.kind === "videoinput")
            .forEach((camera, index) => {

                const option =
                    document.createElement("option");

                option.value =
                    camera.deviceId;

                option.textContent =
                    camera.label ||
                    `Camera ${index + 1}`;

                cameraSelect.appendChild(option);

            });

    } catch (error) {

        console.error(
            "Camera detection failed:",
            error
        );

    }

}


// ========================================
// START VIDEO
// ========================================

async function startVideo() {

    try {

        if (videoStream) {

            videoStream
                .getTracks()
                .forEach(track => track.stop());

        }

        const selectedCamera =
            cameraSelect.value;

        const constraints = {

            video: selectedCamera
                ? {
                    deviceId: {
                        exact: selectedCamera
                    }
                }
                : true,

            audio: false

        };

        videoStream =
            await navigator.mediaDevices
                .getUserMedia(constraints);

        videoElement.srcObject =
            videoStream;

        videoStatus.textContent =
            "🟢 Camera Online";

        videoStatus.className =
            "video-online";

        logMessage(
            "LIVE VIDEO STREAM STARTED",
            "success"
        );

        await loadCameras();

    } catch (error) {

        console.error(error);

        videoStatus.textContent =
            "🔴 Camera Access Denied";

        videoStatus.className =
            "video-offline";

        logMessage(
            "CAMERA ACCESS FAILED",
            "warning"
        );

    }

}


// ========================================
// STOP VIDEO
// ========================================

function stopVideo() {

    if (videoStream) {

        videoStream
            .getTracks()
            .forEach(track => track.stop());

        videoStream = null;

    }

    videoElement.srcObject = null;

    videoStatus.textContent =
        "🔴 Camera Offline";

    videoStatus.className =
        "video-offline";

    logMessage(
        "LIVE VIDEO STREAM STOPPED"
    );

}


// ========================================
// BUTTON EVENTS
// ========================================

if (startVideoButton) {

    startVideoButton.addEventListener(
        "click",
        startVideo
    );

}

if (stopVideoButton) {

    stopVideoButton.addEventListener(
        "click",
        stopVideo
    );

}


// ========================================
// INITIALIZE CAMERA LIST
// ========================================

if (navigator.mediaDevices) {

    navigator.mediaDevices
        .getUserMedia({
            video: true
        })
        .then(stream => {

            stream
                .getTracks()
                .forEach(track => track.stop());

            loadCameras();

        })
        .catch(() => {

            console.log(
                "Camera permission not granted yet."
            );

        });

}