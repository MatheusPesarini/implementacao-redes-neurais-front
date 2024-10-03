import React from 'react'
import ImageUpload from './components/ui/ImageUpload'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Melanoma Detection</h1>
      <p className='p-5'>Caso tenha dúvidas de como usar o sistema acesse nosso <a 
      href='https://github.com/ericklaus16/melanoma_classification_ai/blob/main/manual.pdf'
      className='text-blue-500 hover:underline'
      >manual</a></p>
      <ImageUpload />
    </div>
  )
}

export default App
