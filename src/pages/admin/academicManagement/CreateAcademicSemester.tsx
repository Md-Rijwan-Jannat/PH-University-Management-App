import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { monthsOptions, nameOptions, yearOptions } from "../../../constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterSchema } from "../../../schemas";

const CreateAcademicSemester = () => {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const name = nameOptions[Number(data?.name) - 1]?.label;
    const semesterData = {
      name: name,
      year: data.year,
      code: data.name,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };
    console.log(semesterData);
  };

  return (
    <section style={{ width: "100%" }}>
      <PHForm
        onSubmit={onSubmit}
        resolver={zodResolver(academicSemesterSchema)}
      >
        <PHSelect label="Name" name="name" options={nameOptions} />
        <PHSelect label="Year" name="year" options={yearOptions} />
        <PHSelect
          label="Start Month"
          name="startMonth"
          options={monthsOptions}
        />
        <PHSelect label="End Month" name="endMonth" options={monthsOptions} />
        <Button type="primary" danger htmlType="submit">
          Submit
        </Button>
      </PHForm>
    </section>
  );
};

export default CreateAcademicSemester;
