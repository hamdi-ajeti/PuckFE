import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { EditorPage } from './pages/EditorPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { useAppSelector } from './hooks/hooks';

function App() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/login" 
          element={
            isAuthenticated ? <Navigate to="/editor" replace /> : <Login />
          } 
        />
        <Route
          path="/editor"
          element={
            <ProtectedRoute>
              <EditorPage />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/editor" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;