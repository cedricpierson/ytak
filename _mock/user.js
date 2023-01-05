import { sample } from "lodash";
import { faker } from "@faker-js/faker";

// ----------------------------------------------------------------------

const users = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: faker.name.fullName(),
  email: faker.internet.email(),
  dateExpiration: faker.date.future(1),
  status: sample(["premium", "freemium"]),
}));

export default users;
