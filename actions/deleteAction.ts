"use server"

import Cloudinary from "@/lib/cloudinary"

const deleteAction = async (publicId: string) => {
  try {
    await Cloudinary.delete(publicId)

    return true
  } catch (error) {
    console.log({ error })
    return false
  }
}

export default deleteAction
