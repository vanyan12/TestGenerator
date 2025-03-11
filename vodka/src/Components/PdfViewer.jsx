import * as React from 'react';

export default function PdfView({url}) {
  return (
    <div className="p-4 overflow-hidden">
      <iframe 
        src={url} 
        width="100%" 
        height="" 
        className="border rounded-lg"
      ></iframe>
    </div>
  );
}


