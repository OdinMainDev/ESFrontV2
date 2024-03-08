import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useAppDispatch, useAppSelector } from '@/store/hooks/redux';
import { useEffect } from 'react';
import { getMeUser, logout, setIsAuth, setRole } from '@/store/slices/userSlice';
import { jwtDecode } from 'jwt-decode';
import { ITokenData } from '@/shared/models/interfaces/token';

const ProtectedRouteProvider = () => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.userReducer);

  useEffect(() => {
    const token = Cookies.get('token');
    dispatch(setIsAuth(!!token));
    if (token) {
      const tokenData = jwtDecode<ITokenData>(token);
      if (tokenData.hsr) {
        dispatch(setRole(tokenData.hsdr ? 1 : 2));
        void dispatch(getMeUser());
      } else {
        dispatch(logout());
      }
    }
  }, []);

  if (!isAuth) {
    return <Navigate to="/404" replace />;
  }

  return <Outlet />;
};

export default ProtectedRouteProvider;
