import { Header } from "./layout/Header";

export function Hoge() {
  return (
    <div className="h-full flex flex-col bg-primary-50">
      <Header />

      <div className="flex-1 overflow-x-hidden flex">Hoge</div>
    </div>
  );
}
