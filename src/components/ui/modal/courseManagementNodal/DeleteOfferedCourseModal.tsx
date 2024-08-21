import { Button, Modal } from "antd";
import { FC, useState } from "react";
import { useDeleteOfferedCourseMutation } from "../../../../redux/features/admin/courseManagement";
import { toast } from "sonner";

type TDeleteOfferedCourseModalProps = {
  offeredCourseId: string;
};

const DeleteOfferedCourseModal: FC<TDeleteOfferedCourseModalProps> = ({
  offeredCourseId,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteOfferedCourse, { data, error, isLoading }] =
    useDeleteOfferedCourseMutation();

  console.log({ data, error });
  console.log(offeredCourseId);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async () => {
    const result = await deleteOfferedCourse(offeredCourseId);
    if (result?.data?.success === true) {
      toast.success("Course deleted successfully!");
      setIsModalOpen(false);
    }
  };

  return (
    <div>
      <Button danger onClick={showModal}>
        Delete Course
      </Button>
      <Modal
        title="Delete Offered Course"
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleDelete}
        confirmLoading={isLoading}
        okText="Delete"
        okButtonProps={{ danger: true }}
      >
        <p>Are you sure you want to delete this course?</p>
      </Modal>
    </div>
  );
};

export default DeleteOfferedCourseModal;
