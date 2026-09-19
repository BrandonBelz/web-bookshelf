import { Routes, Route } from 'react-router-dom';
import BooksPage from './BooksPage';
import AuthorsPage from './AuthorsPage';
import VolumesPage from './VolumesPage';
import AuthorDetails from './AuthorDetails';
import BookDetails from './BookDetails';
import VolumeDetails from './VolumeDetails';
import AuthorCreatePage from './AuthorCreatePage';
import BookCreatePage from './BookCreatePage';
import VolumeCreatePage from './VolumeCreatePage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/books" element={<BooksPage />} />
      <Route path="/authors" element={<AuthorsPage />} />
      <Route path="/volumes" element={<VolumesPage />} />
      <Route path="/books/new" element={<BookCreatePage />} />
      <Route path="/books/:id" element={<BookDetails />} />
      <Route path="/volumes/new" element={<VolumeCreatePage />} />
      <Route path="/volumes/:id" element={<VolumeDetails />} />
      <Route path="/authors/new" element={<AuthorCreatePage />} />
      <Route path="/authors/:id" element={<AuthorDetails />} />
    </Routes>
  );
}
