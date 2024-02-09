import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const ProtectedRoute = ({ path, children }) => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.currentUser) {
      // user is not authenticated
      navigate('/login', { state: { returnUrl: path } });
    }
  }, [auth.currentUser, navigate, path]);

  return children;
};

export default ProtectedRoute;
