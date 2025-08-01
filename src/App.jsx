import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from './pages/Inicio';
import HorariosProgramados from './pages/programados/HorariosProgramados';
import HorariosCasa from './pages/programados/HorariosCasa';
import HorariosLaPlata from './pages/programados/HorariosLaPlata';
import HorariosLlegada from './pages/programados/HorariosLlegada';
import HorariosRegistrados from './pages/registrados/HorariosRegistrados';
import HorariosLaPlataReg from './pages/registrados/HorariosLaPlataReg';
import HorariosLlegadaReg from './pages/registrados/HorariosLlegadaReg';
import HorariosCasaReg from './pages/registrados/HorariosCasaReg';

const App = () => {
  return (
    <main className=''>
      <Router basename="/bondi-app">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/programados" element={<HorariosProgramados />} />
          <Route path="/programados/casa" element={<HorariosCasa />} />
          <Route path="/programados/laplata" element={<HorariosLaPlata />} />
          <Route path="/programados/llegadaCasa" element={<HorariosLlegada />} />
          <Route path="/registrados" element={<HorariosRegistrados />} />
          <Route path="/registrados/casa" element={<HorariosCasaReg />} />
          <Route path="/registrados/laplata" element={<HorariosLaPlataReg />} />
          <Route path="/registrados/llegadaCasa" element={<HorariosLlegadaReg />} />
        </Routes>
      </Router>
    </main>
  );
};

export default App;
