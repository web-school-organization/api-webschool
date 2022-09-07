import * as yup from "yup";
import { SchemaOf } from "yup";

const teamSchema: SchemaOf<ITeamsRequest> = yup.object().shape({
  name: yup.string().required(),
});

export { teamSchema };
