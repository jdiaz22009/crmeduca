'use client';

import {createTeacher} from '@/actions/teacher';
import {ITeacher} from '@/types';
import {useState} from 'react';

export interface IModalTeacherProps {
  onClose: () => void;
  onAdd: () => void;
  type?: 'delete' | 'insert' | 'update';
  data?: ITeacher;
}

const TeacherModal = ({onClose, onAdd, type, data}: IModalTeacherProps) => {
  const [formData, setFormData] = useState<ITeacher>({
    fullName: data?.fullName ? data?.fullName : '',
    phone: data?.phone ? data?.phone : '',
    numberDocument: data?.numberDocument ? data?.numberDocument : '',
  });
  const [errors, setErrors] = useState<any>();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const {name, value} = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formPayload = new FormData();
    formPayload.append('fullName', formData?.fullName);
    formPayload.append('phone', formData?.phone);
    formPayload.append('numberDocument', formData?.numberDocument);

    const result: any = await createTeacher(formPayload, data?.uuid, type);
    if (!result?.success && result?.errors?.teacher !== undefined) {
      setErrors(result.errors?.teacher);
      return;
    }

    onAdd();
  };

  return (
    <div
      className="py-12 bg-gray-900 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0"
      id="modal">
      <div className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
        <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
          <div className="w-full flex justify-start text-gray-600 mb-3"></div>
          <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">
            {type === 'insert' && 'Añadir Docente'}
            {type === 'update' && 'Modificar Docente'}
            {type === 'delete' && 'Borrar Docente'}
          </h1>
          <span>
            {type === 'delete' && 'Esta seguro de borrar este Docente?'}
          </span>
          <form onSubmit={handleSubmit}>
            <label
              htmlFor="fullName"
              className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
              Nombre Completo
            </label>
            <div className="relative mb-5 mt-2">
              <input
                id="fullName"
                name="fullName"
                disabled={type === 'delete' ? true : false}
                onChange={handleChange}
                value={formData.fullName}
                className={`${
                  errors?.fullName ? 'border border-red-600' : ''
                }  mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border`}
                placeholder="jhon done"
              />
              {errors?.fullName && (
                <p className="text-red-600 text-xs">{errors?.fullName}</p>
              )}
            </div>

            <label
              htmlFor="numberDocument"
              className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
              Numero de cedula
            </label>
            <div className="relative mb-5 mt-2">
              <input
                id="numberDocument"
                name="numberDocument"
                disabled={type === 'delete' ? true : false}
                onChange={handleChange}
                value={formData.numberDocument}
                className={` ${
                  errors?.numberDocument ? 'border border-red-600' : ''
                }  text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center p-3 text-sm border-gray-300 rounded border`}
                placeholder="Enseñar tecnologia"
              />

              {errors?.numberDocument && (
                <p className="text-red-600 text-xs">{errors?.numberDocument}</p>
              )}
            </div>

            <label
              htmlFor="numberDocument"
              className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
              Numero Telefono
            </label>
            <div className="relative mb-5 mt-2">
              <input
                id="phone"
                name="phone"
                disabled={type === 'delete' ? true : false}
                onChange={handleChange}
                value={formData.phone}
                className={` ${
                  errors?.phone ? 'border border-red-600' : ''
                }  text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center p-3 text-sm border-gray-300 rounded border`}
                placeholder="Numero telefonico"
              />

              {errors?.phone && (
                <p className="text-red-600 text-xs">{errors?.phone}</p>
              )}
            </div>

            <div className="flex items-center justify-start w-full">
              <button
                type="submit"
                className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm">
                {type === 'insert' && 'Añadir'}
                {type === 'update' && 'Modificar'}
                {type === 'delete' && 'Borrar'}
              </button>
              <button
                onClick={onClose}
                className="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm">
                Cancel
              </button>
            </div>
          </form>
          <button
            className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
            aria-label="close modal"
            onClick={onClose}
            role="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-x"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              stroke-width="2.5"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" />
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherModal;
