"use server"

import { join } from "path"
import { randomUUID } from "crypto"
import Cloudinary from "@/lib/cloudinary"
import { writeFile, mkdir } from "fs/promises"

const storeFileLocally = async (file: File) => {
  // set unique name for file to upload to prevent file name conflict
  const name = `${randomUUID()}_${file.name}`

  // check if mkdir folder locally exists
  if (process.env.NODE_ENV === "development")
    await mkdir("./tmp", { recursive: true })

  // local file path
  const localFilePath =
    process.env.NODE_ENV === "production"
      ? join("/tmp", name) // on production vercel alredy have tmp folder
      : join(process.cwd(), "/tmp", name)

  // upload file to local
  const buffer = Buffer.from(await file.arrayBuffer())
  await writeFile(localFilePath, buffer)

  return { localFilePath, name }
}

const uploadAction = async (formData: FormData) => {
  try {
    const file = formData.get("file") as File

    const { name, localFilePath } = await storeFileLocally(file)

    await Cloudinary.upload({ name, path: localFilePath })

    return true
  } catch (error) {
    console.log({ error })
    return false
  }
}

export default uploadAction
