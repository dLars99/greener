/* This module contains all the fetch calls pertaining
to the image storage with Cloudinary and its API */

const url = "https://api.cloudinary.com/v1_1/dLars99/image"

export default {
    async uploadImage(imageFile) {
        
        const formData = new FormData()
        formData.append("file", imageFile)
        formData.append("upload_preset", "greener")
        const response = await fetch(`${url}/upload`, {
            method: "POST",
            body: formData
        })
        
        const file = await response.json()

        return file.secure_url

    }
}