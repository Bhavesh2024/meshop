import React, { createContext, useState } from "react";

export const ToggleSidebarContext = createContext("");
const SideBarContext = ({ children }) => {
	const [toggleSidebar, setToggleSidebar] = useState(false);
	return (
		<>
			<ToggleSidebarContext.Provider
				value={{ toggleSidebar, setToggleSidebar }}
			>
				{children}
			</ToggleSidebarContext.Provider>
		</>
	);
};

export default SideBarContext;
