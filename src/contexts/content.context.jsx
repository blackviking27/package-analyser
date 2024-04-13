import { createContext, useState } from "react";

export const ContentContext = createContext(null);

export const ContextProvider = ({ children }) => {
  const [context, setContext] = useState(null);

  return (
    <ContentContext.Provider value={{ context, setContext }}>
      {children}
    </ContentContext.Provider>
  );
};
