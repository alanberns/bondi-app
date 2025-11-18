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
import ObtenerArribos from './pages/arribos/ObtenerArribos';

import ArribosMoqsa from './pages/moqsa/ArribosMoqsa';
import ObtenerArribosMoqsa from './pages/moqsa/ObtenerArribosMoqsa';


const App = () => {
  return (
    <main className=''>
      <Router basename="/">
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
          <Route path="/arribos/casa" element={<ObtenerArribos apiUrl={"https://back-api-bondi.vercel.app/api/unionplatense?idParada=LP10485"} titulo={"Casa"} />} />
          <Route path="/arribos/laplata" element={<ObtenerArribos apiUrl={"https://back-api-bondi.vercel.app/api/unionplatense?idParada=LP2310"} titulo={"Plaza San Martín"} />} />
          <Route path="/arribos/llegadaCasa" element={<ObtenerArribos apiUrl={"https://back-api-bondi.vercel.app/api/unionplatense?idParada=LP10481"} titulo={"Llegada a casa"} />} />
          <Route path="/arribos/plazave" element={<ObtenerArribos apiUrl={"https://back-api-bondi.vercel.app/api/unionplatense?idParada=TALP%201608&idParada=LP10858"} titulo={"Pza. Villa Elisa"} />} />
          <Route path="/arribos/italia" element={<ObtenerArribos apiUrl={"https://back-api-bondi.vercel.app/api/unionplatense?idParada=TALP%201009&idParada=LP5005&idParada=LP11500"} titulo={"Pza. Italia"} />} />
          <Route path="/arribos/axion" element={<ObtenerArribos apiUrl={"https://back-api-bondi.vercel.app/api/unionplatense?idParada=LP10774"} titulo={"419 y Belgrano a Villa Elisa"} />} />
          <Route path="/arribos/parada/:idParada" element={<ObtenerArribos apiUrl="https://back-api-bondi.vercel.app/api/unionplatense?idParada=" titulo="Arribos" />}/>
          <Route path="/arribos/retirollegada" element={<ObtenerArribos apiUrl={"https://back-api-bondi.vercel.app/api/unionplatense?idParada=PLAZA%20CANADA"} titulo={"Retiro llegada"} />} />
          <Route path="/arribos/avbrasil" element={<ObtenerArribos apiUrl={"https://back-api-bondi.vercel.app/api/unionplatense?idParada=BRASIL%20Y%20AZOPARDO"} titulo={"Av. Brasil"} />} />
          <Route path="/arribos/retiro" element={<ObtenerArribos apiUrl={"https://back-api-bondi.vercel.app/api/unionplatense?idParada=FFCC%20MITRE"} titulo={"Retiro"} />} />
          <Route path="/arribos/pereyra" element={<ObtenerArribos apiUrl={"https://back-api-bondi.vercel.app/api/unionplatense?idParada=L195004"} titulo={"195 Pereyra"} />} />
          <Route path="/arribos/laplatacos" element={<ObtenerArribos apiUrl={"https://back-api-bondi.vercel.app/api/unionplatense?idParada=TERMINAL%20LA%20PLATA"} titulo={"195 Llegada La Plata"} />} />
          <Route path="/arribos/alpargatas" element={<ObtenerArribos apiUrl={"https://back-api-bondi.vercel.app/api/unionplatense?idParada=ROTONDA%20DE%20ALPARGATAS%20VTA&idParada=TALP%201490&idParada=LP1816"} titulo={"Alpargatas"} />} />

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
          <Route path="/arribosmoqsa/parada/:idParada" element={<ObtenerArribosMoqsa apiUrl="https://back-api-bondi.vercel.app/api/moqsa?idParada=" titulo="Arribos" />}/>
        </Routes>
      </Router>
    </main>
  );
};

export default App;
