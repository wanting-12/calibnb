import { createContext, useContext, useState } from "react";

export const TagContext = createContext();

export const useTag = () => useContext(TagContext);

export default function TagProvider({ children }) {
  const [type, setType] = useState("");
  const [all, setAll] = useState(true);
  const [camp, setCamp] = useState(false);
  const [cabin, setCabin] = useState(false);
  const [aview, setAview] = useState(false);

  return (
    <TagContext.Provider
      value={{
        all,
        setAll,
        camp,
        setCamp,
        cabin,
        setCabin,
        aview,
        setAview,
        type,
        setType,
      }}
    >
      {children}
    </TagContext.Provider>
  );
}
