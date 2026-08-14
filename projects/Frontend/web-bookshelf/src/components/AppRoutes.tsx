import { Routes, Route } from 'react-router-dom';
import BooksPage from './BooksPage';
import AuthorsPage from './AuthorsPage';
import VolumesPage from './VolumesPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/books" element={<BooksPage />} />
      <Route path="/authors" element={<AuthorsPage />} />
      <Route path="/volumes" element={<VolumesPage />} />
    </Routes>
  );
}
