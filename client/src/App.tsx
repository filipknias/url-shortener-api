import { Routes, Route } from 'react-router-dom';
import { Home } from './views';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  )
}
