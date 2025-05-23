import * as React from 'react';

export default function PdfView({url}) {
  return (
    <div className="overflow-hidden">
      <iframe 
        src={url} 
        width="100%" 
        className="border rounded-lg h-dvh"
      ></iframe>
    </div>
  );
}


