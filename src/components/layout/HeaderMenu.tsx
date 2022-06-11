import { useCallback } from "react";
import { SaveIcon } from "../common/icons/SaveIcon";

export function HeaderMenu() {
  const onSaveFileClick = useCallback(async () => {}, []);

  return (
    <button
      className="px-4 py-1 text-primary-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-primary-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2"
      onClick={onSaveFileClick}
    >
      <SaveIcon />
    </button>
  );
}
