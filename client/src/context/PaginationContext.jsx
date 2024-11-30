import { Children, createContext, useState } from "react";

export const PaginationContext = createContext();


const PaginationContextProvider = ({children}) =>{
  


  return <>
      <PaginationContext.Provider value={{slicedRowData,setSlicedRowData,pageIndex,setPageIndex,activeIndex,setActiveIndex}}>
        {children}
      </PaginationContext.Provider>
  </>
}

export default PaginationContextProvider;