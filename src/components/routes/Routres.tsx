import { Route, Routes,} from 'react-router-dom'
import LogIn from '../../pages/logIn/LogIn'

export default function Routres() {
  return (
<Routes>
    <Route path="/" element={<LogIn />}/>
</Routes>
  )
}
