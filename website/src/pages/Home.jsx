import * as React from "react";
import Header from "../Components/Header";
import Slider from "../Components/Slider";
import SignUp from "../Components/SignUp";
import { AuthProvider } from "../Components/AuthContext";


function Home() {

  return (
    <AuthProvider>
      <Header />

      <Slider />

      <div className="flex flex-col justify-center items-center p-4">
        <h2 id="signup" className="text-center mt-4">Գրանցվիր, պահպանիր թեստերդ, հետևիր առաջընթացիդ</h2>
        <SignUp/>
      </div>


    </AuthProvider>
  );
}
export default Home;
