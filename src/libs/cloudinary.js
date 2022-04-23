import {v2 as cloudinary} from "cloudinary"
cloudinary.config({
    cloud_name:"yayistark",
    api_key:"867949819482573",
    api_secret:"HNHApkD4jWdj8ZAqL8v4E-0x4gE"
})


export const uploadImage = async filePath => {
    return await cloudinary.uploader.upload(filePath,{
        folder:'post-memes'
    })
}

export const deleteImage = async id => {
    return await cloudinary.uploader.destroy(id)
}