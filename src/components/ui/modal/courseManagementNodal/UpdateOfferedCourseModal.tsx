import { Button, Modal, Col } from "antd";
import { FC, useState } from "react";
import { FieldValues } from "react-hook-form";
import { useUpdateOfferedCourseMutation } from "../../../../redux/features/admin/courseManagement";
import { toast } from "sonner";
import moment from "moment";
import PHForm from "../../../form/PHForm";
import PHSelect from "../../../form/PHSelect";
import { daysOptions } from "../../../../constants";
import PHInput from "../../../form/PHInput";
import PHTimePicker from "../../../form/PHTimePicker";

type TUpdateOfferedCourseModalProps = {
  offeredCourseId: string;
};

const UpdateOfferedCourseModal: FC<TUpdateOfferedCourseModalProps> = ({
  offeredCourseId,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateOfferedCourse, { isLoading }] = useUpdateOfferedCourseMutation();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (data: FieldValues) => {
    const offeredCourse = {
      days: data.days,
      maxCapacity: Number(data.maxCapacity),
      session: data.session,
      startTime: moment(new Date(data.startTime)).format("HH:mm"),
      endTime: moment(new Date(data.endTime)).format("HH:mm"),
    };

    const updatedData = {
      id: offeredCourseId,
      data: {
        offeredCourse,
      },
    };

    const result = await updateOfferedCourse(updatedData);
    if (result?.data?.success === true) {
      toast.success("Course updated successfully!");
      setIsModalOpen(false);
    }
  };

  return (
    <div>
      <Button onClick={showModal}>Update Course</Button>
      <Modal
        title="Update Offered Course"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <PHForm onSubmit={handleSubmit}>
          <Col span={24}>
            <PHSelect
              mode="multiple"
              label="Days"
              name="days"
              options={daysOptions}
            />
          </Col>
          <Col span={24}>
            <PHInput
              label="Max Capacity"
              name="maxCapacity"
              type="number"
              placeholder="Enter Max Capacity"
            />
          </Col>
          <Col span={24}>
            <PHInput
              label="Session"
              name="session"
              placeholder="Session"
              type="number"
            />
          </Col>
          <Col span={24}>
            <PHTimePicker label="Start Time" name="startTime" />
          </Col>
          <Col span={24}>
            <PHTimePicker label="End Time" name="endTime" />
          </Col>
          <Button type="primary" danger htmlType="submit" loading={isLoading}>
            Update
          </Button>
        </PHForm>
      </Modal>
    </div>
  );
};

export default UpdateOfferedCourseModal;
