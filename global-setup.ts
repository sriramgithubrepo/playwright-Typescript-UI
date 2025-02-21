import { PlaywrightTestConfig, request } from "@playwright/test";
import fs from "fs/promises";

async function globalSetup(_config: PlaywrightTestConfig) {
  const url = "https://restful-booker.herokuapp.com/auth";

  const requestContext = await request.newContext();
  const response = await requestContext.post(`${url}`, {
    data: {
      username: `${process.env.USERNAME_ADMIN}`,
      password: `${process.env.USER_ADMIN_PASSWORD}`,
    },
  });

  const body = await response.json();
  await fs.writeFile("apitoken.json", JSON.stringify({ token: body.token }));

}
export default globalSetup;