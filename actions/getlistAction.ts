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
  folder: string
  version: number
  width: number
}

interface Return {
  success: boolean
  data: getlistActionResponse[]
}

const getlistAction = async (): Promise<Return> => {
  try {
    const res = await Cloudinary.list()
    if (!!res.resources) return { success: true, data: res.resources }
    return { success: false, data: [] }
  } catch (error) {
    console.log(error)
    return { success: false, data: [] }
  }
}

export default getlistAction
