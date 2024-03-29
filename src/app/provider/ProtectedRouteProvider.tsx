import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useAppDispatch, useAppSelector } from '@/store/hooks/redux';
import { useEffect } from 'react';
import { getMeUser, logout, setIsAuth, setRole } from '@/store/slices/userSlice';
import { jwtDecode } from 'jwt-decode';
import { ITokenData } from '@/shared/models/interfaces/token';

const ProtectedRouteProvider = () => {
  const dispatch = useAppDispatch();
  const { isAuth, role } = useAppSelector((state) => state.userReducer);

  useEffect(() => {
    const token = Cookies.get('token');
    dispatch(setIsAuth(!!token));
    if (token) {
      const tokenData = jwtDecode<ITokenData>(token);
      if (tokenData.hsr) {
        const role = tokenData.hsdr ? 1 : 2;
        dispatch(setRole(role));
        Cookies.set('role', role.toString());
        void dispatch(getMeUser());
      } else {
        dispatch(logout());
      }
    }
  }, []);

  if (!isAuth) {
    return <Navigate to="/404" replace />;
  }

  if (role === 2) {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
};

export default ProtectedRouteProvider;
