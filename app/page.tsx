"use client"

import Image from "next/image"
import { useEffect, useState, type FormEvent } from "react"

import getlistAction, {
  type getlistActionResponse,
} from "@/actions/getlistAction"
import uploadAction from "@/actions/uploadAction"
import deleteAction from "@/actions/deleteAction"

export default function Home() {
  const [files, setFiles] = useState<getlistActionResponse[]>([])

  const getUploadedFiles = async () => {
    setFiles(await getlistAction())
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const success = await uploadAction(formData)
    if (success) getUploadedFiles()
  }

  const deleteFile = async (public_id: string) => {
    const success = await deleteAction(public_id)
    if (success) getUploadedFiles()
  }

  useEffect(() => {
    getUploadedFiles()
  }, [])
  console.log(files)
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          required
          id="file"
          type="file"
          name="file"
          accept="image/*,video/*"
        />
        <br />
        <button>Upload</button>
      </form>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
          <thead className=" text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Image</th>
              <th className="px-6 py-3">Size(px)</th>
              <th className="px-6 py-3">Created At</th>
              <th className="px-6 py-3">Format</th>
              <th className="px-6 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {files.map(
              ({
                public_id,
                secure_url,
                width,
                height,
                created_at,
                format,
              }) => (
                <tr
                  key={public_id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-3">
                    <Image
                      src={secure_url}
                      width={300}
                      height={40}
                      alt={public_id}
                      className="h-6 w-min object-contain"
                    />
                  </td>
                  <td className="px-6 py-3">
                    {width}x{height}
                  </td>
                  <td className="px-6 py-3">{format}</td>
                  <td className="px-6 py-3">
                    {new Date(created_at || "").toLocaleTimeString()}{" "}
                    {new Date(created_at || "").toLocaleDateString()}
                  </td>
                  <td className="px-6 py-3 text-center">
                    <a
                      className="inline-block text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-5 py-1 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-900"
                      href={secure_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open in new tab
                    </a>
                    <button
                      onClick={() => deleteFile(public_id)}
                      type="button"
                      className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded text-sm px-5 py-1 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
