import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config({ path : '.env' });
console.log("love",process.env.CLOUDINARY_API_KEY);
(async function() {
    // Configuration
    
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        secure: true
    });
})();
 
const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        const response = await cloudinary.uploader.upload(
            localFilePath, {
                resource_type : "auto"
            }
        );
        //delete local file after upload
        fs.unlinkSync(localFilePath);
        return response;
        // console.log("\n file is uploaded on cloudinary",response.url);
        
    } catch (error) {
        fs.unlinkSync(localFilePath);// delete the local file in case of error
        console.log("error in cloudinary upload1", error);
        throw error;
    }
};

export { uploadOnCloudinary };

