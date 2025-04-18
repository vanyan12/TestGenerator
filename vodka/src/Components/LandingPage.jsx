import * as React from 'react';
import { useState } from 'react';
import SignIn from './SignIn';

function LandingPage() {
  const [showImage, setImage] = useState(true);

  return (
    <div className="mx-auto flex items-center justify-items-center gap-x-25">
      {showImage && (
        <img src="/Home.png" className="size-150 shrink-0" alt="Error" />
      )}
      <SignIn />
    </div>
  );
}

export default LandingPage;
