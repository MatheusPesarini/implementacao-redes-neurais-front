import React from 'react'

export default function ImageUpload() {
  return (
    <form className="flex flex-col items-center">
      <input type="file" className="mb-4" />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Upload
      </button>
    </form>
  )
}
