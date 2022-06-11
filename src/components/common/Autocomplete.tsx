import {
  KeyboardEventHandler,
  ReactElement,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";

interface AutocompleteProps<T> {
  initialSearchText: string;
  items: T[];
  filter: (item: T, searchText: string) => boolean;
  renderItem: (item: T) => ReactElement;
  onSelectedItem: (item: T) => void;
}

export function Autocomplete<T>({
  initialSearchText,
  items,
  filter,
  renderItem,
  onSelectedItem,
}: AutocompleteProps<T>) {
  const ref = useRef<HTMLInputElement>(null);
  const [searchText, setSearchText] = useState<string>(initialSearchText);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const internalFilter = useCallback(
    (t: T) => filter(t, searchText),
    [searchText, filter]
  );
  const filteredItems = useMemo(
    () => (searchText ? items.filter(internalFilter) : items),
    [searchText, items, internalFilter]
  );
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isComposing, setIsComposing] = useState(false);

  const onCompositionStart = useCallback(() => setIsComposing(true), []);
  const onCompositionEnd = useCallback(() => setIsComposing(false), []);

  const onSelectItemInternal = useCallback<(index: number) => void>(
    (index) => {
      console.log({ index });
      const selectedItem = filteredItems[index];
      if (selectedItem) {
        onSelectedItem(selectedItem);
      }
    },
    [filteredItems, onSelectedItem]
  );

  const onKeyDown = useCallback<KeyboardEventHandler<HTMLInputElement>>(
    (e) => {
      const key = e.key;

      if (isComposing) {
        return;
      }

      console.log(key, selectedIndex);
      if (key === "ArrowUp") {
        if (selectedIndex !== 0) {
          setSelectedIndex((i) => i - 1);
        }
        e.preventDefault();
      } else if (key === "ArrowDown") {
        if (selectedIndex !== filteredItems.length - 1) {
          setSelectedIndex((i) => i + 1);
        }
        e.preventDefault();
      } else if (key === "Enter") {
        const selectedItem = filteredItems[selectedIndex];
        if (selectedItem) {
          onSelectedItem(selectedItem);
        }
        e.preventDefault();
      }
    },
    [isComposing, selectedIndex, filteredItems, onSelectedItem]
  );

  return (
    <div className="relative">
      <input
        ref={ref}
        className="input-default"
        type="text"
        value={searchText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 100)} // HACK: li の onclick が反応しなくなるので timeout
        onChange={(e) => {
          setSelectedIndex(0);
          setSearchText(e.target.value);
        }}
        onCompositionStart={onCompositionStart}
        onCompositionEnd={onCompositionEnd}
        onKeyDown={onKeyDown}
      />
      {isFocused ? (
        <ul className="absolute -mt-0.5 bg-primary-50 border-2 py-0.5 shadow-md max-h-64 overflow-y-auto w-96">
          {filteredItems.length === 0 ? (
            <li className="px-2 whitespace-nowrap text-ellipsis overflow-hidden text-slate-400">
              該当なし
            </li>
          ) : (
            filteredItems.map((item, index) => (
              <li
                key={index}
                className={`px-2 whitespace-nowrap text-ellipsis overflow-hidden hover:bg-primary-300 cursor-pointer ${
                  index === selectedIndex ? "bg-primary-200" : ""
                }`}
                onClick={() => {
                  onSelectItemInternal(index);
                }}
              >
                {renderItem(item)}
              </li>
            ))
          )}
        </ul>
      ) : null}
    </div>
  );
}
