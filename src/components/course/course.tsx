'use client';

import {useEffect, useState} from 'react';

import * as XLSX from 'xlsx';
import {saveAs} from 'file-saver';

import {ICourse} from '@/types';
import {getAllCoruses} from '@/providers/client/course';
import Table from '../table/table';
import UaserModal from '../modal/users/user';

const CourseComponent = () => {
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [dataEdit, setDataEdit] = useState<ICourse | null>();
  const [type, setType] = useState<'delete' | 'insert' | 'update'>();

  useEffect(() => {
    getAllCourse();
  }, []);

  const getAllCourse = async () => {
    try {
      const data = await getAllCoruses();
      setCourses(data);
    } catch (error) {
      console.error(error);
    }
  };

  const onAdd = () => {
    setVisible(false);
    setTimeout(() => {
      getAllCourse();
    }, 500);
  };

  const handlerModal = () => {
    setVisible(!visible);
    setType('insert');
    setDataEdit(null);
  };

  const handlerEdit = (data: ICourse) => {
    handlerModal();
    setDataEdit(data);
    setType('update');
  };

  const handlerDelete = (data: ICourse) => {
    handlerModal();
    setDataEdit(data);
    setType('delete');
  };

  const generateExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(courses);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Reporte');

    const excelBuffer = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});

    const blob = new Blob([excelBuffer], {type: 'application/octet-stream'});
    saveAs(blob, 'reporte.xlsx');
  };

  return (
    <>
      <span className="text-5xl">
        Listado de <small className="text-indigo-500">Cursos</small>
      </span>

      <div className="flex flex-row justify-end gap-5 mb-4">
        <button
          onClick={handlerModal}
          className="p-11  mt-10 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-1   border border-indigo-500 rounded">
          Añadir
        </button>
        <button
          onClick={generateExcel}
          className="p-11  mt-10 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-1   border border-indigo-500 rounded">
          Exportar a Excel
        </button>
      </div>

      <Table
        columns={['uuid', 'title', 'description', 'status']}
        data={courses}
        handlerEdit={handlerEdit}
        handlerDelete={handlerDelete}
      />
      {visible && (
        <UaserModal
          onClose={handlerModal}
          onAdd={onAdd}
          data={dataEdit ? dataEdit : {title: '', description: ''}}
          type={type}
        />
      )}
    </>
  );
};

export default CourseComponent;
