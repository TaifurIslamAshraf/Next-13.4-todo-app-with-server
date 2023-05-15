"use client";

import { FadeLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="text-center flex flex-col items-center">
      <FadeLoader
        color={"#fff"}
        size={50}
        aria-label="Loader Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;
