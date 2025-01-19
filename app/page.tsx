'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import getlistAction, {
  type getlistActionResponse,
} from '@/actions/getListAction'
import uploadAction from '@/actions/uploadAction'

export default function Home() {
  const FORM = useRef<HTMLFormElement>(null)
  const [uploading, setUploading] = useState(false)
  const [files, setFiles] = useState<getlistActionResponse[]>([])

  const getUploadedFiles = async () => {
    const { data, success } = await getlistAction()
    if (!success) console.error('Unable to fetch data')
    else setFiles(data)
  }

  const onUpload = async () => {
    setUploading(true)
    const form = FORM.current as HTMLFormElement
    const formData = new FormData(form)
    const success = await uploadAction(formData)
    if (!success) console.error('Unable to upload')
    else {
      form.reset()
      getUploadedFiles()
    }
    setUploading(false)
  }

  useEffect(() => {
    getUploadedFiles()
  }, [])

  return (
    <div className="space-y-2 p-2">
      <form ref={FORM} onChange={onUpload} className="flex items-center gap-2">
        <label
          htmlFor="file"
          className="block w-full cursor-pointer rounded bg-[#febe00] p-2 text-center text-black"
        >
          {uploading ? 'uploading' : 'Click to upload or drag and drop'}
          <input
            disabled={uploading}
            required
            id="file"
            type="file"
            name="file"
            className="absolute -z-10 h-0 w-0 opacity-0"
          />
        </label>
      </form>

      <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
        {files.map(
          ({ width, bytes, height, public_id, secure_url, created_at }) => (
            <a
              target="_blank"
              key={public_id}
              href={secure_url}
              className="group relative h-40 overflow-hidden rounded text-xs"
            >
              <Image
                src={secure_url}
                width={500}
                height={384}
                alt={public_id}
                className="mx-auto h-full w-full object-cover object-center duration-300 group-hover:object-contain"
              />
              <p className="p-4duration-300 absolute bottom-0 w-full flex-wrap items-center justify-center gap-1 overflow-auto bg-black/50 text-white backdrop-blur">
                <span className="block">
                  {width}x{height}
                </span>
                <span className="block">{bytes} Bytes</span>
                <span className="block">
                  {new Date(created_at || '').toLocaleTimeString()}{' '}
                  {new Date(created_at || '').toLocaleDateString()}
                </span>
              </p>
            </a>
          )
        )}
      </div>
    </div>
  )
}
