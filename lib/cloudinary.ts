import { v2 as cloudinary } from "cloudinary"

interface uploadToCloudinayProps {
  name: string
  path: string
  folder?: string
}

class Cloudinary {
  static upload = async ({
    name,
    path,
    folder = "",
  }: uploadToCloudinayProps) => {
    cloudinary.config({
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    })

    const options = {
      folder,
      use_filename: true,
      filename_override: name,
    }

    const res = await cloudinary.uploader.upload(path, options)

    console.log({ res })
  }
}

export default Cloudinary
