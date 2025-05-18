import * as React from "react";
import Header from "../Components/Header";
import Slider from "../Components/Slider";
import SignUp from "../Components/SignUp";


function Home() {

  return (
    <div>
      <Header />

      <Slider />

      <div className="flex flex-col justify-center items-center p-4">
        <h2 className="text-center mt-4">Գրանցվիր, պահպանիր թեստերդ, հետևիր առաջընթացիդ</h2>
        <SignUp />
      </div>


    </div>
  );
}
export default Home;
