"use server"

import Cloudinary from "@/lib/cloudinary"

export interface getlistActionResponse {
  asset_folder: string
  asset_id: string
  bytes: number
  created_at: string
  display_name: string
  format: string
  height: number
  public_id: string
  resource_type: string
  secure_url: string
  type: string
  url: string
  version: number
  width: number
}

const getlistAction = async (): Promise<getlistActionResponse[]> => {
  try {
    const res = await Cloudinary.list()
    if (!!res.resources) return res.resources
    return []
  } catch (error) {
    console.log(error)
    return []
  }
}

export default getlistAction
