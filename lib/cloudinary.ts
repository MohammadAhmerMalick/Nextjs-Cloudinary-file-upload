import { v2 as cloudinary } from "cloudinary"

interface uploadToCloudinayProps {
  name: string
  path: string
  folder?: string
}

cloudinary.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
})

class Cloudinary {
  static upload = async ({
    name,
    path,
    folder = "",
  }: uploadToCloudinayProps) => {
    const options = {
      folder,
      use_filename: true,
      filename_override: name,
    }

    return cloudinary.uploader.upload(path, options)
  }

  static list = () =>
    cloudinary.api.resources({ type: "upload", max_results: 500 })

  static delete = (publicId: string) => cloudinary.uploader.destroy(publicId)
}

export default Cloudinary
