import { Button, Modal } from "antd";
import { FC, useState } from "react";
import PHForm from "../../../form/PHForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHSelect from "../../../form/PHSelect";
import { useGetAllFacultiesQuery } from "../../../../redux/features/admin/userManagementApi";
import { TFaculty } from "../../../../types";
import { useAssignFacultiesMutation } from "../../../../redux/features/admin/courseManagement";
import { toast } from "sonner";

type TAssignFacultyModalProps = {
  courseId: string;
};

const AssignFacultyModal: FC<TAssignFacultyModalProps> = ({ courseId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: faculties } = useGetAllFacultiesQuery(undefined);
  const [assignFaculties, { isLoading, data }] = useAssignFacultiesMutation();

  const facultyOptions = faculties?.data?.map((item: TFaculty) => ({
    value: item._id,
    label: item.fullName,
  }));

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const submitData: SubmitHandler<FieldValues> = async (data) => {
    const assignData = {
      id: courseId,
      data: data,
    };

    await assignFaculties(assignData);
    setIsModalOpen(false);
  };

  if (data?.success === true) {
    toast.success(data.message);
  }

  return (
    <div>
      <Button onClick={showModal}>Assign Faculties</Button>
      <Modal
        title="Add Faculties"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <PHForm onSubmit={submitData}>
          <PHSelect
            label="Faculties"
            name="faculties"
            mode="multiple"
            options={facultyOptions}
          />
          <Button loading={isLoading} type="primary" danger htmlType="submit">
            Submit
          </Button>
        </PHForm>
      </Modal>
    </div>
  );
};

export default AssignFacultyModal;
