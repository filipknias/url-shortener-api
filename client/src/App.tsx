import { Routes, Route } from 'react-router-dom';
import { Home } from './views';

export const App = () => {
  return (
    <div className="bg-gray-100 h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}
