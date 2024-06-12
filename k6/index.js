import http from "k6/http";
import { sleep } from "k6";

export const options = {
  vus: 15,
  duration: "120s",
};

const query = `
query ExampleQuery {
    hello
}
`;
const headers = { "Content-Type": "application/json" };

export default function () {
  const res = http.post(
    "http://local.garden",
    JSON.stringify({ query: query }),
    { headers: headers }
  );

  //   if (res.status === 200) {
  //     console.log(JSON.stringify(res.body));
  //   } else {
  //     console.log(res.json());
  //   }

  sleep(1);
}
