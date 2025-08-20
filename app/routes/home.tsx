import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ai -resume -analyzer" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <Welcome />;
}
