import { useState, useEffect } from "react";

type Width = {
  width: number
}

const useGetWidth = (

): Width => {
  const [ width, setWidth ] = useState<number>(window.innerWidth)
  
  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange)

    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, [])

  return {
    width
  }
};

export default useGetWidth;
