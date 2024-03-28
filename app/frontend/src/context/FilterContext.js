import { createContext, useState } from "react";

const FilterContext = createContext();

function Provider({ children }) {
  const [customFilterModel, setCustomFilterModel] = useState({});
  const valueToShare = {
    customFilterModel,
    setCustomFilterModel,
  };

  return (
    <FilterContext.Provider value={valueToShare}>
      {children}
    </FilterContext.Provider>
  );
}

export { Provider };
export default FilterContext;
