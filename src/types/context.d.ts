interface AppContextType {
    user?: User | null;
    role: Role | undefined;
    setUser?: (user: User | null) => void;
}