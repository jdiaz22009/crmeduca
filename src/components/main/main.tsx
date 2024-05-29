'use client';

import {getAllTeachers} from '@/providers/client/teacher';
import Widget from '../cards/widget/widget';
import {useEffect, useState} from 'react';
import {getAllCoruses} from '@/providers/client/course';

const MainWapper = () => {
  const [pointTeacher, setPointTeacher] = useState<number>(0);
  const [pointCoruse, setPointCourse] = useState<number>(0);

  useEffect(() => {
    getTeacher();
    getCourse();
  }, []);

  const getTeacher = async () => {
    try {
      const point = await getAllTeachers();
      setPointTeacher(point.length);
    } catch (error) {
      console.error(error);
    }
  };
  const getCourse = async () => {
    try {
      const point = await getAllCoruses();
      setPointCourse(point.length);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Widget title="Docentes" point={pointTeacher} />
      <Widget title="Cursos" point={pointCoruse} />
    </>
  );
};

export default MainWapper;
