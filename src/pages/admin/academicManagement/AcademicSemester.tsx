import React from "react";
import { useGetAcademicSemesterQuery } from "../../../redux/features/academicSemester/academicSemesterApi";

const AcademicSemester: React.FC = () => {
  const { data } = useGetAcademicSemesterQuery();

  console.log(data);

  return <div>Academic Semester Component</div>;
};

export default AcademicSemester;
