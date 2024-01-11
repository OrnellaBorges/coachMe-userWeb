import logo from './logo.svg';
import './App.css';
import Header from './components/header'
import Register from './containers/user/register'
import Login from './containers/user/login'
import Logout from './containers/user/logout'
import Home from './containers/home'
import Profil from './containers/profil'
import Search from './containers/search'
import Detail from './containers/detail'
import Basket from './containers/basket'
import Payment from './containers/payment'
import Success from './containers/success'

import {Routes, Route} from 'react-router-dom'
import RequireAuth from './helpers/require-auth'

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path="/" element={<RequireAuth child={Home} auth={true}/>}/>
        <Route exact path="/register" element={<Register />}/>
        <Route exact path="/login" element={<Login />}/>
        <Route exact path="/logout" element={<RequireAuth child={Logout} auth={true}/>}/>
        <Route exact path="/profil" element={<RequireAuth child={Profil} auth={true}/>}/>
        <Route exact path="/search" element={<RequireAuth child={Search} auth={true}/>}/>
        <Route exact path="/detail/:id" element={<RequireAuth child={Detail} auth={true}/>}/>
        <Route exact path="/basket" element={<RequireAuth child={Basket} />}/>
        <Route exact path="/payment" element={<RequireAuth child={Payment} auth={true}/>}/>
        <Route exact path="/success" element={<RequireAuth child={Success} auth={true}/>}/>
      </Routes>
    </div>
  );
}

export default App;
