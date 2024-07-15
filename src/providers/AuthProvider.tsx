import { AuthContextProvider } from "./AuthContext";

interface UserProviderProbs {
    children: React.ReactNode;
}

const AuthProvider: React.FC<UserProviderProbs> = ({
    children
}) => {
    return (
        <AuthContextProvider>
            {children}
        </AuthContextProvider>
    )
}
export default AuthProvider;