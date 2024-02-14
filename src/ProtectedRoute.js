import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const ProtectedRoute = ({ path, children }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!user.currentUser) {
      // user is not authenticated
      navigate('/login', { state: { returnUrl: path } });
    }
  }, [user.currentUser, navigate, path]);

  return children;
};

export default ProtectedRoute;
