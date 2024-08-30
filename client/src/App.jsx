import './App.css';
import { Outlet } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return (
   <> 
      <Toaster/>
      <GoogleOAuthProvider clientId="350622266142-k70s66eum07o9qr2cm30776unv9jq9d0.apps.googleusercontent.com">
        <main >
          <Outlet/>
        </main>
       </GoogleOAuthProvider>
   </>
  );  
}

export default App;
