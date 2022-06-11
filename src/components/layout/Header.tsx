import { HeaderMenu } from "./HeaderMenu";

export function Header() {
  return (
    <div className="h-10 border-b-2 border-b-primary-200 z-20 shadow shadow-slate-100 flex">
      <div className="my-auto ml-4 flex w-full">
        <div className="flex-1 font-semibold">Hoge</div>
        <div className="text-right mr-12">
          <HeaderMenu />
        </div>
      </div>
    </div>
  );
}
