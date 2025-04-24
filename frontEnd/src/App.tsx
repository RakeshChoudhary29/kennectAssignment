import { UserProvider, useUser } from "./contexts/userContext";
import { HomePage } from "./pages/HomePage";
import { AuthForm } from "./components/user/UserNameForm";

const AppContent = () => {
  const { userName } = useUser();

  return userName ? <HomePage /> : <AuthForm />;
};

function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}

export default App;
