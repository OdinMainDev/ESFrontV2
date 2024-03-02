import React, { FormEvent, useRef, useState } from 'react';
import { Button, FloatingLabel, Form, Spinner } from 'react-bootstrap';
import { ILoginData, ILoginResponse } from '../models/login';
import axios from 'axios';
import Cookies from 'js-cookie';
import { loginApi } from '../api/loginApi';
import { useNavigate, useParams } from 'react-router-dom';
import { validateLoginData } from '../helpers/validation';
import { useTranslation } from 'react-i18next';

const AuthForm = () => {
  const { api_key } = useParams();
  const [validated, setValidated] = useState(false);
  const { t } = useTranslation();
  const [invalidData, setInvalidData] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const timer = useRef<NodeJS.Timeout | null>(null);
  const [loginData, setLoginData] = useState<ILoginData>({
    email: '',
    password: '',
    api_key: api_key ?? '',
  });

  const loginHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidated(true);
    if (validateLoginData(loginData) && !loading) {
      setLoading(true);
      axios
        .post<ILoginResponse>(loginApi(), loginData)
        .then((res) => {
          navigate('/');
          Cookies.set('auth_token', res.data.token);
        })
        .catch(() => {
          if (timer.current) {
            clearTimeout(timer.current);
          }
          setValidated(false);
          setInvalidData(true);
          timer.current = setTimeout(() => {
            setInvalidData(false);
          }, 1500);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <Form noValidate validated={validated} onSubmit={loginHandler}>
      <div className="text-center mb-3">
        <h3 className="text-1000">{t('login')}</h3>
        <p className="text-700">{t('GetAccess')}</p>
      </div>
      <Form.Group className="mb-3 text-start">
        <FloatingLabel controlId="email" label="Email" className="form-icon-container">
          <Form.Control
            required
            isInvalid={invalidData}
            value={loginData.email}
            onChange={(e) => setLoginData((prev) => ({ ...prev, email: e.target.value }))}
            type="email"
            placeholder="name@example.com"
          />
        </FloatingLabel>
        <div className="form-icon-container"></div>
      </Form.Group>
      <Form.Group className="mb-3 text-start">
        <FloatingLabel controlId="password" label="Password" className="form-icon-container">
          <Form.Control
            required
            isInvalid={invalidData}
            value={loginData.password}
            onChange={(e) => setLoginData((prev) => ({ ...prev, password: e.target.value }))}
            type="password"
            placeholder="Password"
          />
        </FloatingLabel>
      </Form.Group>
      {invalidData && (
        <div className="text-[#ea868f] mb-3 font-semibold text-xs">{t('loginError')}</div>
      )}
      <Button disabled={loading} type="submit" variant="primary" className="w-100 mb-3">
        {!loading ? t('login') : <Spinner size="sm" animation="border" />}
      </Button>
    </Form>
  );
};

export default AuthForm;
