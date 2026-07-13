import { useStore } from "../store";
import { shallow } from "zustand/shallow";

export const usePublicLibrary = () => {

  const {
    isPublicLibraryEnabled,
  } = useStore((state) => ({
    isPublicLibraryEnabled: state.publicLibraryEnabled,
  }), shallow)

  return {
    isPublicLibraryEnabled
  };
};
