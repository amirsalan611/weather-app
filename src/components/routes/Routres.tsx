import { Route, Routes,} from 'react-router-dom'
import LogIn from '../../pages/logIn/LogIn'
import Web from '../../pages/web/Web';

export default function Routres() {
  return (
    <Routes>
      <Route path="/" element={<LogIn />} />
      <Route path="/web" element={<Web />} />
    </Routes>
  );
}
