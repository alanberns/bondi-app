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
import HorariosPzaItaliaReg from './pages/registrados/HorariosPzaItaliaReg';
import HorariosPzaVEReg from './pages/registrados/HorariosPzaVEReg';
import HorariosPzaVE from './pages/programados/HorariosPzaVE';
import HorariosPzaItalia from './pages/programados/HorariosPzaItalia';

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
          <Route path="/programados/plazave" element={<HorariosPzaVE />} />
          <Route path="/programados/italia" element={<HorariosPzaItalia />} />
          <Route path="/registrados" element={<HorariosRegistrados />} />
          <Route path="/registrados/casa" element={<HorariosCasaReg />} />
          <Route path="/registrados/laplata" element={<HorariosLaPlataReg />} />
          <Route path="/registrados/llegadaCasa" element={<HorariosLlegadaReg />} />
          <Route path="/registrados/italia" element={<HorariosPzaItaliaReg />} />
          <Route path="/registrados/plazave" element={<HorariosPzaVEReg />} />
        </Routes>
      </Router>
    </main>
  );
};

export default App;
