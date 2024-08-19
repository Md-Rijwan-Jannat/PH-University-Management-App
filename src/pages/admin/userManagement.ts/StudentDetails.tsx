import { useParams } from "react-router-dom";

const StudentDetails = () => {
  const { studentId } = useParams();
  return (
    <div>
      <h2>This is a student details {studentId}</h2>
    </div>
  );
};

export default StudentDetails;
