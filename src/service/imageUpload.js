import { toast } from "react-toastify";

export async function uploadImage(files) {
    const formData = new FormData();
    formData.append("file", files);

    try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/upload-image`, {
            method: "POST",
            headers: {
                // "Content-Type": "multipart/form-data", // No need to set Content-Type with FormData, it's automatically set
            },
            body: formData,
        });

        if (!res.ok) {
            toast.error("Upload image not success");
            const errorData = await res.json();
            throw new Error(errorData.message || "Failed to upload image");
        }

        const data = await res.json();
        toast.success("Upload image success");
        return data;
    } catch (error) {
        toast.error("Upload not success");
        console.error("Error uploading image:", error.message);
        throw error;
    }
}