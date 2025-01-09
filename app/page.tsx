'use client'

import Image from 'next/image'
import { useEffect, useState, type FormEvent } from 'react'

import getlistAction, {
  type getlistActionResponse,
} from '@/actions/getlistAction'
import uploadAction from '@/actions/uploadAction'
import deleteAction from '@/actions/deleteAction'

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

  return (
    <div className="space-y-2 p-2 text-center">
      <form onSubmit={onSubmit} className="flex items-center gap-2">
        <input
          required
          id="file"
          type="file"
          name="file"
          accept="image/*,video/*"
          className="block w-full cursor-pointer rounded-lg border border-gray-600 bg-gray-700 text-gray-400 placeholder-gray-400 focus:outline-none"
        />

        <button
          type="button"
          className="w-32 rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-800"
        >
          Upload
        </button>
      </form>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-gray-400">
          <thead className="bg-gray-700 text-gray-400">
            <tr>
              <th className="p-1">Image</th>
              <th className="p-1">Size(px)</th>
              <th className="p-1">Format</th>
              <th className="p-1">Created At</th>
              <th className="p-1">Action</th>
            </tr>
          </thead>
          <tbody>
            {files.map(
              ({
                width,
                height,
                format,
                public_id,
                created_at,
                secure_url,
              }) => (
                <tr
                  key={public_id}
                  className="border-b border-gray-700 bg-gray-800 hover:bg-gray-600"
                >
                  <td className="p-1">
                    <Image
                      src={secure_url}
                      width={300}
                      height={40}
                      alt={public_id}
                      className="mx-auto h-6 w-min object-contain"
                    />
                  </td>
                  <td className="p-1">
                    {width}x{height}
                  </td>
                  <td className="p-1">{format}</td>
                  <td className="p-1">
                    {new Date(created_at || '').toLocaleTimeString()}{' '}
                    {new Date(created_at || '').toLocaleDateString()}
                  </td>
                  <td className="p-1 text-center md:space-x-2">
                    <a
                      className="inline-block rounded border border-blue-500 px-5 py-1 text-blue-500 duration-150 hover:bg-blue-600 hover:text-white focus:ring-blue-900"
                      href={secure_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open
                    </a>
                    <button
                      onClick={() => deleteFile(public_id)}
                      type="button"
                      className="rounded border border-red-500 px-5 py-1 text-red-500 duration-150 hover:bg-red-600 hover:text-white focus:ring-red-900"
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
