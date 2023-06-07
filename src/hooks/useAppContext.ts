import { useContext } from "react";
import { AppContext } from "@contexts/AppContext";
import { useGetRole } from "./useGetRole";

export const useAppContextHooks = () => {
    const { role } = useGetRole();

    return {
        role
    }
}

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within a AppProvider');
    }
    return context;
}

