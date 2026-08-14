import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import BooksPage from './BooksPage';
import AuthorsPage from './AuthorsPage';
import VolumesPage from './VolumesPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/books" element={<BooksPage />} />
      <Route path="/authors" element={<AuthorsPage />} />
      <Route path="/volumes" element={<VolumesPage />} />
    </Routes>
  );
}
