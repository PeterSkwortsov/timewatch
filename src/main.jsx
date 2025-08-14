import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastContainer, toast } from 'react-toastify';
// const notify = () => toast("Wow so easy!");

createRoot(document.getElementById("root")).render(
  <>
    <ToastContainer />
    <App />
  </>
);
