import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
// Redux
import {Provider} from 'react-redux';
import store from './store';
import {loadUser} from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  // Si vous voulez exécuter un effet et le nettoyer une seule fois (au montage puis au démontage), vous pouvez passer un tableau vide ([]) comme second argument. Ça indique à React que votre effet ne dépend d’aucune valeur issue des props ou de l’état local, donc il n’a jamais besoin d’être ré-exécuté. Il ne s’agit pas d’un cas particulier : ça découle directement de la façon dont le tableau des dépendances fonctionne à la base.

  return (
    <Provider store={store}>
      <Router>
        <Navbar/>
        <Alert/>
        <Routes>
          <Route path='/' element={<Landing/>}/>
          <Route path='register' element={<Register/>}/>
          <Route path='login' element={<Login/>}/>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App
