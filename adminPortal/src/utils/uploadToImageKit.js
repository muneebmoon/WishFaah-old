// utils/imageUpload.js
export const uploadToImageKit = async (file) => {
    try {
        const formData = new FormData();

        // Clean the file name: remove spaces, special characters, and encode properly
        const cleanFileName = file.name
            .replace(/\s+/g, '-') // Replace spaces with hyphens
            .replace(/[^a-zA-Z0-9.-]/g, '') // Remove special characters
            .toLowerCase(); // Convert to lowercase

        const timestamp = Date.now();
        const finalFileName = `${timestamp}-${cleanFileName}`;

        formData.append("file", file);
        formData.append("fileName", finalFileName);

        const response = await fetch(
            "https://upload.imagekit.io/api/v1/files/upload",
            {
                method: "POST",
                headers: {
                    Authorization:
                        "Basic " +
                        btoa(import.meta.env.VITE_IMAGEKIT_PRIVATE_KEY + ":")
                },
                body: formData
            }
        );

        const data = await response.json();

        if (!response.ok) {
            // Provide more specific error message
            let errorMessage = data.message || "Upload failed";
            
            if (response.status === 401) {
                errorMessage = "Invalid ImageKit credentials. Please check your API key.";
            } else if (response.status === 400) {
                errorMessage = data.message || "Invalid file format or size. Please check your file.";
            } else if (response.status === 413) {
                errorMessage = "File size is too large. Maximum file size is 5MB.";
            }
            
            throw new Error(errorMessage);
        }

        return data.url;

    } catch (error) {
        console.error("Image upload failed:", error);
        throw error;
    }
};


export const uploadMultipleImages = async (files, onProgress) => {
    const uploadedUrls = [];
    const errors = [];

    for (let i = 0; i < files.length; i++) {
        try {
            const url = await uploadToImageKit(files[i]);
            uploadedUrls.push(url);
            
            // Update progress
            if (onProgress) {
                onProgress(Math.round(((i + 1) / files.length) * 100));
            }
        } catch (error) {
            errors.push({
                file: files[i].name,
                error: error.message
            });
        }
    }

    return {
        success: uploadedUrls,
        errors: errors
    };
};