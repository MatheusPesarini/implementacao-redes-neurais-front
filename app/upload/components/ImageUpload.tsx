'use client'

import type { FC, ChangeEvent, FormEvent } from 'react'
import { useState } from 'react'

const ImageUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null
    setSelectedFile(file)
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!selectedFile) {
      alert('Escolha um arquivo')
      return
    }

    const formData = new FormData()
    formData.append('file', selectedFile)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
      if (response.ok) {
        alert('Arquivo enviado com sucesso!')
      } else {
        alert('Envio do arquivo falhou.')
      }
    } catch (error) {
      console.error('Erro no anexo do arquivo:', error)
      alert('Erro no anexo do arquivo')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button type="submit">Upload</button>
    </form>
  )
}

export default ImageUpload
