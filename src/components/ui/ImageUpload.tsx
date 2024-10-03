import { useState } from 'react'
import Dropzone from 'react-dropzone'

import axios from 'axios'

export default function ImageUpload() {
  const [images, setImages] = useState<File[]>([])
  const [diagnostic, setDiagnostic] = useState<string>('')

  const onDrop = (acceptedFiles: File[]) => {
    //setImages(prevImages => [...prevImages, ...acceptedFiles])
    setImages(acceptedFiles)
  }

  const handleUpload = () => {
    setDiagnostic("");
    if (images.length === 0) {
      alert('Por favor, selecione uma imagem para ser verificada!');
      return
    }

    const formData = new FormData();
    formData.append('file', images[0]);

    axios.post('http://localhost:5000/predict', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
    .then(res => {
      console.log('Previsão: ', res.data)
      if(res.data.predicted_label === 'MEL')
        setDiagnostic('melanoma')
      else if(res.data.predicted_label === 'NV'){
        setDiagnostic('nevo')
      }
      else if(res.data.predicted_label === 'BCC')
        setDiagnostic('carcinoma basocelular')
      else if(res.data.predicted_label === 'AK')
        setDiagnostic('queratose actínica')
      else if(res.data.predicted_label === 'BKL')
        setDiagnostic('queratose benigna')
      else if(res.data.predicted_label === 'DF')
        setDiagnostic('dermatofibroma')
      else if(res.data.predicted_label === 'VASC')
        setDiagnostic('lesão vascular')
      else if(res.data.predicted_label === 'SCC')
        setDiagnostic('carcinoma espinocelular')
      else 
        setDiagnostic('não identificado')
    })
    .catch(err => {
      console.error("Erro ao enviar a imagem: ", err.response ? err.response.data : err.message)
    })
  }

  return (
    <div className="flex flex-col items-center p-5">
      <Dropzone onDrop={onDrop} maxSize={5242880} maxFiles={1}>
        {({ getRootProps, getInputProps, isDragActive }) => (
          <div
            {...getRootProps()}
            className="border-2 border-dashed border-gray-300 p-5 w-full text-center"
          >
            <input {...getInputProps()} />
            <p
              className={`${
                isDragActive ? 'text-blue-500 font-semibold' : 'text-gray-500'
              } p-5`}
            >
              {isDragActive
                ? 'Solte a imagem aqui'
                : 'Clique em mim ou arraste um arquivo'}
            </p>
          </div>
        )}
      </Dropzone>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4"
        onClick={handleUpload}
      >
        Upload
      </button>

      <div className="flex flex-row items-center justify-center pt-5 flex-wrap">
        {images.map((image, index) => (
          <img
            key={index}
            src={URL.createObjectURL(image)}
            alt={`Imagem enviada ${index + 1}`}
            className="w-24 h-24 pr-2 object-cover hover:cursor-pointer"
            onClick={() => {
              setImages(prevImages => prevImages.filter((_, i) => i !== index))
            }}
          />
        ))}
      </div>
      {diagnostic !== "" && <div className='text-center p-5'>
        <p>A inteligência artificial pressupõe que a imagem enviada seja um caso de <span className='text-red-500 font-bold'>{diagnostic}</span></p>
        <p>No entanto, o diagnóstico da nossa IA é apenas <span className='text-orange-300 font-bold'>62% preciso.</span></p>
        <p>Com isso, mediante um diagnóstico assustador <span className='underline'>consulte um médico especialista</span></p>
      </div>}
    </div>
  )
}
