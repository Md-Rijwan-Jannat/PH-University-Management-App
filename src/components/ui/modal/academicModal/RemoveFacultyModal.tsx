import { Button, Modal } from "antd";
import { FC, useState } from "react";
import PHForm from "../../../form/PHForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHSelect from "../../../form/PHSelect";
import { useGetAllFacultiesQuery } from "../../../../redux/features/admin/userManagementApi";
import { TFaculty } from "../../../../types";
import { useDeleteFacultiesMutation } from "../../../../redux/features/admin/courseManagement";
import { toast } from "sonner";

type TAssignFacultyModalProps = {
  courseId: string;
};

const RemoveFacultyModal: FC<TAssignFacultyModalProps> = ({ courseId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: faculties } = useGetAllFacultiesQuery(undefined);
  const [deleteFaculties, { isLoading, data }] = useDeleteFacultiesMutation();

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
    const faculties = { data };
    const assignData = {
      id: courseId,
      data: { faculties },
    };

    await deleteFaculties(assignData);
    setIsModalOpen(false);
  };

  if (data?.success === true) {
    toast.success(data.message);
  }

  return (
    <div>
      <Button danger onClick={showModal}>
        Remove Faculties
      </Button>
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

export default RemoveFacultyModal;
