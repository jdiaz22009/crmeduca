'use client';
import {useState} from 'react';
import Link from 'next/link';

import {login} from '@/actions/auth';
import AlertComponent, {IAlert} from '@/components/alerts/alert';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [visibleAlert, setVisibleAlert] = useState<IAlert>({
    visible: false,
    desc: '',
    bgColor: '',
  });

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
    setErrors({});

    const formPayload = new FormData();
    formPayload.append('email', formData.email);
    formPayload.append('password', formData.password);
    const result: any = await login(formPayload);
    if (
      !result?.success &&
      result?.errors?.form !== undefined &&
      result?.errors?.form !== null
    ) {
      setVisibleAlert({
        visible: true,
        desc: result?.errors?.form?.message,
        bgColor: 'bg-red-500',
      });
      return;
    } else if (!result?.success && result?.errors?.login !== undefined) {
      setErrors(result.errors?.login);
      return;
    }

    window.location.href = '/dashboard/main';
  };

  return (
    <div className="mt-8">
      {visibleAlert.visible && (
        <AlertComponent
          title="Autenticacion"
          color="text-white"
          desc={visibleAlert.desc}
          bgColor={visibleAlert.bgColor}
        />
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm text-gray-600 bg-red">
            Correo Electronico
          </label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={handleChange}
            placeholder="example@example.com"
            className={`${
              errors?.email ? 'border border-red-600' : ''
            } block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40`}
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
            <a
              href="#"
              className="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline">
              Olvidaste tu contraseña?
            </a>
          </div>

          <input
            type="password"
            name="password"
            id="password"
            placeholder="****"
            onChange={handleChange}
            className={`${
              errors?.password ? 'border border-red-600' : ''
            } block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md   focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40`}
          />

          {errors?.password && (
            <p className="text-red-600 text-xs">{errors?.password}</p>
          )}
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
            Entrar
          </button>
        </div>
      </form>

      <p className="mt-6 text-sm text-center text-gray-400">
        ¿Aún no tienes una cuenta?{' '}
        <Link
          href="/authentication/signUp"
          className="text-blue-500 focus:outline-none focus:underline hover:underline">
          Registrate
        </Link>
        .
      </p>
    </div>
  );
};

export default LoginForm;
