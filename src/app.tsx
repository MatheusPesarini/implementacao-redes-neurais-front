import React from 'react'
import ImageUpload from './components/ui/ImageUpload'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Melanoma Detection</h1>
      <ImageUpload />
    </div>
  )
}

export default App
