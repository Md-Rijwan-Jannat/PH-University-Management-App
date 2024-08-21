import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Divider, Row } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { toast } from "sonner";
import { IResponse, TCourse } from "../../../types";
import {
  useAddCourseMutation,
  useGetAllPreRequisitesCoursesQuery,
} from "../../../redux/features/admin/courseManagement";
import PHInput from "../../../components/form/PHInput";

const CreateCourse = () => {
  const [addCourse, { data, error, isLoading }] = useAddCourseMutation();

  console.log({ data, error });

  const { data: courses } = useGetAllPreRequisitesCoursesQuery([
    { name: "sort", value: "createdAt" },
  ]);

  const preRequisitesCoursesOptions = courses?.data?.map((item: TCourse) => ({
    value: item._id,
    label: item.title,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Registering Semester...");
    const course = {
      ...data,
      code: Number(data.code),
      credits: Number(data.credits),
      preRequisitesCourses: data.preRequisitesCourses
        ? data.preRequisitesCourses.map((item: string[]) => {
            return {
              course: item,
              isDeleted: false,
            };
          })
        : [],
      isDeleted: false,
    };

    console.log(course);

    const courseData = {
      course,
    };

    try {
      const res = (await addCourse(courseData)) as IResponse<any>;
      if (res.error) {
        toast.error(res.error.message, { id: toastId });
      } else {
        toast.success("Course created successfully", {
          id: toastId,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <Row>
      <Col span={24}>
        <PHForm onSubmit={onSubmit}>
          <Row gutter={10}>
            <Divider>Create a Course</Divider>
            <Col xs={24} md={12} lg={8}>
              <PHInput
                label="Title"
                name="title"
                placeholder="ENter Code"
                type="text"
              />
            </Col>
            <Col xs={24} md={12} lg={8}>
              <PHInput
                label="Prefix"
                name="prefix"
                placeholder="ENter Prefix"
                type="text"
              />
            </Col>
            <Col xs={24} md={12} lg={8}>
              <PHInput
                label="Code"
                name="code"
                placeholder="ENter Code"
                type="text"
              />
            </Col>
            <Col xs={24} md={12} lg={8}>
              <PHInput
                label="Credits"
                name="credits"
                placeholder="ENter Credits"
                type="text"
              />
            </Col>
            <Col xs={24} md={12} lg={8}>
              <PHSelect
                mode="multiple"
                label="Prerequisites Courses"
                name="preRequisitesCourses"
                options={preRequisitesCoursesOptions}
              />
            </Col>
          </Row>
          <Button loading={isLoading} type="primary" danger htmlType="submit">
            Submit
          </Button>
        </PHForm>
      </Col>
    </Row>
  );
};

export default CreateCourse;
