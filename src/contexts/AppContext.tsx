import { createContext } from "react";
import { useAppContextHooks } from "../hooks/useAppContext";

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {

    const hooks = useAppContextHooks();

    return (
        <AppContext.Provider value={hooks}>
            {children}
        </AppContext.Provider>
    )
}