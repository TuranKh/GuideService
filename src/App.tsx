import { Navigate } from "react-router";
import "./App.css";

function App() {
    const user = null;
    return <>{user ? <Navigate to='dashboard' /> : <Navigate to='login' />}</>;
}

export default App;
