import uploadAction from "@/actions/uploadAction"

export default function Home() {
  return (
    <div>
      <form action={uploadAction}>
        <input required type="file" name="file" id="file" />
        <br />
        <button>Upload</button>
      </form>
    </div>
  )
}
