import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import FoodItem from './Pages/FoodItems';
import { Login } from './Pages/Login';
import Register from './Pages/Register';
import { Users } from './Pages/Users';
function App() {
  return (
    <Router>
        <Routes>
          <Route exact path= "/" element={<Login />} />
          <Route exact path= "/register" element={<Register />} />
          
          {localStorage.getItem("userId") ? (
            <Route exact path="/dashboard" element={<FoodItem />} />
          ) : (
            <Route path="*" element={<Login />} />
          )}

        {localStorage.getItem("userId") ? (
            <Route exact path="/users" element={<Users />} />
          ) : (
            <Route path="*" element={<Login />} />
          )}
          

        </Routes>
    
    </Router>
  );
}

export default App;
