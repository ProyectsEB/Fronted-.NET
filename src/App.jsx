import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import Navbar from './components/Navbar';
import AppRoutes from "./routes";
import { Toaster } from 'react-hot-toast';


function App() {
  return (
    <>
     <Toaster position="top-right" reverseOrder={false} />
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
    </>
    
  );
}

export default App;
