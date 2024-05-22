'use client';
import {useEffect, useState} from 'react';
import Table from '../table/table';
import {ITeacher} from '@/types';
import TeacherModal from '../modal/teacher/teacher';
import {getAllTeachers} from '@/providers/client/teacher';

const TeacherComponent = () => {
  const [teacher, setTeacher] = useState<ITeacher[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [dataEdit, setDataEdit] = useState<ITeacher | null>();
  const [type, setType] = useState<'delete' | 'insert' | 'update'>();

  useEffect(() => {
    getAllTeacher();
  }, []);

  const getAllTeacher = async () => {
    try {
      const data = await getAllTeachers();
      setTeacher(data);
    } catch (error) {
      console.error(error);
    }
  };

  const onAdd = () => {
    setVisible(false);
    setTimeout(() => {
      getAllTeacher();
    }, 500);
  };

  const handlerModal = () => {
    setVisible(!visible);
    setType('insert');
    setDataEdit(null);
  };

  const handlerEdit = (data: ITeacher) => {
    handlerModal();
    setDataEdit(data);
    setType('update');
  };

  const handlerDelete = (data: ITeacher) => {
    handlerModal();
    setDataEdit(data);
    setType('delete');
  };

  return (
    <>
      <span className="text-5xl">
        Listado de <small className="text-indigo-500">Docentes</small>
      </span>

      <div className="flex justify-end">
        <button
          onClick={handlerModal}
          className="p-11  mt-10 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-1   border border-indigo-500 rounded">
          Añadir
        </button>
      </div>

      <Table
        columns={['uuid', 'fullName', 'phone', 'status']}
        data={teacher}
        handlerEdit={handlerEdit}
        handlerDelete={handlerDelete}
      />
      {visible && (
        <TeacherModal
          onClose={handlerModal}
          onAdd={onAdd}
          data={
            dataEdit ? dataEdit : {fullName: '', phone: '', numberDocument: ''}
          }
          type={type}
        />
      )}
    </>
  );
};

export default TeacherComponent;
