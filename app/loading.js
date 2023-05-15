"use client";

import { ClipLoader } from "react-spinners";

const loading = () => {
  return (
    <div className="flex h-screen items-center justify-center flex-col w-full">
      <ClipLoader
        color={"#fff"}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default loading;
