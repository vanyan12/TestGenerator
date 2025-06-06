import * as React from 'react';

export default function PdfView({file}) {
  return (
    <div className="overflow-hidden">
      <iframe
        src={`http://127.0.0.1:8000/get-test/${file}#toolbar=0`} 
        width="100%"
        className="border rounded-lg h-dvh"
      ></iframe>
    </div>
  );
}


