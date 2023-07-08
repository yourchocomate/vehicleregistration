import { useApp } from "@/hooks";
import NotFound from "@/pages/NotFound";
import { Spinner } from "@material-tailwind/react";
import { Outlet } from "react-router-dom";

const ProtectedRoute = ({ roles }: { roles: string[]  }) => {
    const { role: user } = useApp();
    if (!user) return <Spinner />
    return roles.includes(user || "") ? <Outlet /> : <NotFound />
}

export default ProtectedRoute;