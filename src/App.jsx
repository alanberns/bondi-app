import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from './pages/Inicio';

import HorariosProgramados from './pages/programados/HorariosProgramados';
import HorariosCasa from './pages/programados/HorariosCasa';
import HorariosLaPlata from './pages/programados/HorariosLaPlata';
import HorariosLlegada from './pages/programados/HorariosLlegada';
import HorariosPzaVE from './pages/programados/HorariosPzaVE';
import HorariosPzaItalia from './pages/programados/HorariosPzaItalia';

import HorariosRegistrados from './pages/registrados/HorariosRegistrados';
import HorariosLaPlataReg from './pages/registrados/HorariosLaPlataReg';
import HorariosLlegadaReg from './pages/registrados/HorariosLlegadaReg';
import HorariosCasaReg from './pages/registrados/HorariosCasaReg';
import HorariosPzaItaliaReg from './pages/registrados/HorariosPzaItaliaReg';
import HorariosPzaVEReg from './pages/registrados/HorariosPzaVEReg';

import HorariosArribos from './pages/arribos/HorariosArribos';
import ArribosCasa from './pages/arribos/ArribosCasa';
import ArribosLaPlata from './pages/arribos/ArribosLaPlata';
import ArribosLlegada from './pages/arribos/ArribosLlegada';
import ArribosPlazaVE from './pages/arribos/ArribosPzaVE';
import ArribosPzaItalia from './pages/arribos/ArribosPzaItalia';
import ArribosAxion from './pages/arribos/arribosAxion';

import ArribosMoqsa from './pages/moqsa/ArribosMoqsa';
import ObtenerArribosMoqsa from './pages/moqsa/ObtenerArribosMoqsa';


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

          <Route path="/arribos" element={<HorariosArribos />} />
          <Route path="/arribos/casa" element={<ArribosCasa />} />
          <Route path="/arribos/laplata" element={<ArribosLaPlata />} />
          <Route path="/arribos/llegadaCasa" element={<ArribosLlegada />} />
          <Route path="/arribos/plazave" element={<ArribosPlazaVE />} />
          <Route path="/arribos/italia" element={<ArribosPzaItalia />} />
          <Route path="/arribos/axion" element={<ArribosAxion />} />

          <Route path="/arribosmoqsa/" element={<ArribosMoqsa />} />
          <Route path="/arribosmoqsa/walmart" element={<ObtenerArribosMoqsa apiUrl="https://back-api-bondi.vercel.app/api/moqsa?idParada=MO-01570" titulo="Arribos walmart" />} />
          <Route path="/arribosmoqsa/capital" element={<ObtenerArribosMoqsa apiUrl="https://back-api-bondi.vercel.app/api/moqsa?idParada=MO-00600" titulo="Arribos capital" />} />
          <Route path="/arribosmoqsa/acceso" element={<ObtenerArribosMoqsa apiUrl="https://back-api-bondi.vercel.app/api/moqsa?idParada=MO-01525" titulo="Arribos acceso y debenedetti" />} />
          <Route path="/arribosmoqsa/jaramillo" element={<ObtenerArribosMoqsa apiUrl="https://back-api-bondi.vercel.app/api/moqsa?idParada=MO-01357&idParada=MO-01286" titulo="Arribos plaza Jaramillo" />} />
          <Route path="/arribosmoqsa/sarandi" element={<ObtenerArribosMoqsa apiUrl="https://back-api-bondi.vercel.app/api/moqsa?idParada=MO-01322" titulo="Arribos Est. Sarandí" />} />
          <Route path="/arribosmoqsa/lasflores" element={<ObtenerArribosMoqsa apiUrl="https://back-api-bondi.vercel.app/api/moqsa?idParada=MO-01071" titulo="Arribos Las Flores a capital" />} />
          <Route path="/arribosmoqsa/bera" element={<ObtenerArribosMoqsa apiUrl="https://back-api-bondi.vercel.app/api/moqsa?idParada=MO-00352&idParada=MO-01641" titulo="Arribos Est. Berazategui" />} />
          <Route path="/arribosmoqsa/alpargatas" element={<ObtenerArribosMoqsa apiUrl="https://back-api-bondi.vercel.app/api/moqsa?idParada=MO-00084" titulo="Arribos Alpargatas" />} />
          <Route path="/arribosmoqsa/ducilocap" element={<ObtenerArribosMoqsa apiUrl="https://back-api-bondi.vercel.app/api/moqsa?idParada=MO-00544" titulo="Arribos Ducilo a Capital" />} />
          <Route path="/arribosmoqsa/ducilobera" element={<ObtenerArribosMoqsa apiUrl="https://back-api-bondi.vercel.app/api/moqsa?idParada=MO-00781" titulo="Arribos Ducilo a Bera" />} />
          <Route path="/arribosmoqsa/debenedetti" element={<ObtenerArribosMoqsa apiUrl="https://back-api-bondi.vercel.app/api/moqsa?idParada=MO-01328" titulo="Arribos Debenedetti" />} />
        </Routes>
      </Router>
    </main>
  );
};

export default App;
