import { CryptoContextProvider } from "./context/CryptoContext";
import { AppLayout } from "./components/AppLayout/AppLayout";

const App: React.FC = () => {
  return (
    <CryptoContextProvider>
      <AppLayout />
    </CryptoContextProvider>
  );
};

export default App;
