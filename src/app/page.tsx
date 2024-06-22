import Image from "next/image";
import { client } from "@/libs/client";

export default async function Home() {
  const data = await client.get({
    endpoint: "top",
  });
  return (
    <div>
      <div>{data.contents[0].id}</div>
    </div>
  );
}
