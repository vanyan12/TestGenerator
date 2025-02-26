import * as React from 'react';
import { useState } from 'react';
import './App.css'
import Toolbar from './Components/Toolbar';
import Loading from './Components/Loading';





function App() {

  const [pdfUrl, setPdfUrl] = useState(null)
  const [loading, setLoading] = useState(false)

 

  return (
    <div>
      <Toolbar id="tool-bar" pdfUrl={pdfUrl} setPdfUrl={setPdfUrl} setLoading={setLoading}/>

      {loading && (
        <Loading />
      )}

      {pdfUrl && (
        <iframe src={pdfUrl} width="100%" height="600px"></iframe>
      )}

    </div>
  )
}

export default App
