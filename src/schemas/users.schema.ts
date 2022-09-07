import * as yup from "yup";
import { SchemaOf } from "yup";
import { ITeachersRequest } from "../interfaces/teachers";

const teacherSchema: SchemaOf<ITeachersRequest> = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  type: yup.string().required(),
  matter: yup.string().required(),
  shift: yup.string().required(),
});

export { teacherSchema };
