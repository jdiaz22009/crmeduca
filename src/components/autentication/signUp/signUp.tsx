'use client';

import {useState} from 'react';
import Link from 'next/link';

import {IUser} from '@/types';
import AlertComponent, {IAlert} from '@/components/alerts/alert';
import {signup} from '@/actions/auth';

const SignUpForm = () => {
  const [formData, setFormData] = useState<IUser>({
    fullName: '',
    email: '',
    password: '',
  });
  const [alert, setAlert] = useState<IAlert>({
    visible: false,
    desc: '',
    bgColor: '',
  });

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<any>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formPayload = new FormData();
      formPayload.append('fullName', formData?.fullName);
      formPayload.append('email', formData?.email);
      formPayload.append('password', formData?.password!);
      setLoading(true);
      const result: any = await signup(formPayload);
      setLoading(false);
      if (!result?.success && result?.errors?.signup !== undefined) {
        setErrors(result.errors?.signup);
        return;
      }

      setAlert({
        title: 'auth:  ',
        desc: 'User create succefull',
        visible: true,
        bgColor: 'bg-green-500',
        color: 'text-white',
      });

      setTimeout(() => {
        setAlert(prev => ({
          ...prev,
          visible: false,
        }));

        window.location.href = '/authentication/login';
      }, 1000);
    } catch (error: any) {
      setLoading(false);
      setAlert({
        title: 'auth:  ',
        desc: error?.message,
        visible: true,
        bgColor: 'bg-red-500',
        color: 'text-white',
      });
    }
  };

  return (
    <>
      <div className="mt-8">
        {alert.visible && (
          <AlertComponent
            title={alert.title}
            desc={alert.desc}
            bgColor={alert.bgColor}
            color={alert.color}
          />
        )}
        <form onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm text-gray-600 ">
              Nombre completo
            </label>
            <input
              name="fullName"
              id="fullName"
              onChange={handleChange}
              placeholder="Jhon doe"
              className={`${
                errors?.fullName ? 'border border-red-600' : ''
              } block w-full px-4 py-2 mt-2 mb-3 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40`}
            />

            {errors?.fullName && (
              <p className="text-red-600 text-xs">{errors?.fullName}</p>
            )}
          </div>

          <div className="mt-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm text-gray-600 ">
              Correo Electronico
            </label>
            <input
              name="email"
              id="email"
              onChange={handleChange}
              placeholder="example@example.com"
              className={`${
                errors?.email ? 'border border-red-600' : ''
              } block $ w-full px-4 py-2 mt-2 mb-3 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40`}
            />
            {errors?.email && (
              <p className="text-red-600 text-xs">{errors?.email}</p>
            )}
          </div>

          <div className="mt-6">
            <div className="flex justify-between mb-2">
              <label htmlFor="password" className="text-sm text-gray-600">
                Contraseña
              </label>
            </div>

            <input
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
              placeholder="Al menos 6 caracteres"
              className={`${
                errors?.password ? 'border border-red-600' : ''
              } block w-full px-4 py-2 mt-2 mb-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md   focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40`}
            />
            {errors?.password && (
              <p className="text-red-600 text-xs">{errors.password}</p>
            )}
          </div>

          <div className="mt-6">
            {!loading ? (
              <button
                type="submit"
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                Crea tu cuenta
              </button>
            ) : (
              <button
                type="button"
                className="flex justify-center w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                disabled>
                <svg
                  className="mr-3 h-5 w-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="font-medium"> Cargando... </span>
              </button>
            )}
          </div>
        </form>

        <p className="mt-6 text-sm text-center text-gray-400">
          ¿Ya tienes una cuenta?{' '}
          <Link
            href="/authentication/login"
            className="text-blue-500 focus:outline-none focus:underline hover:underline">
            Iniciar sesión
          </Link>
          .
        </p>
      </div>
    </>
  );
};

export default SignUpForm;
