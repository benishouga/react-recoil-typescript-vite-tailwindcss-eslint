import {
  atom,
  selector,
  selectorFamily,
  useRecoilCallback,
  useRecoilValue,
} from "recoil";
import produce from "immer";

export type Item = {
  id: string;
  name: string;
};

export type ItemState = {
  items: Item[];
};

export const itemState = atom<ItemState>({
  key: "itemState",
  default: { items: [] },
});

const itemsSelector = selector<Item[]>({
  key: "itemsSelector",
  get: ({ get }) => get(itemState).items,
});
export const useItems = () => useRecoilValue(itemsSelector);

const itemSelector = selectorFamily<Item | undefined, string>({
  key: "itemSelector",
  get:
    (id) =>
    ({ get }) =>
      get(itemState).items.find((v) => v.id === id),
});
export const useItem = (id: string) => useRecoilValue(itemSelector(id));

export const useAddItem = () =>
  useRecoilCallback(({ set }) => (item: Item) => {
    set(itemState, (state) =>
      produce(state, (draft) => {
        draft.items.push(item);
      })
    );
  });

export const useUpdateItem = () =>
  useRecoilCallback(({ set }) => (item: Item) => {
    set(itemState, (state) =>
      produce(state, (draft) => {
        const target = draft.items.find((v) => v.id === item.id);
        if (target) {
          target.name = item.name;
        }
      })
    );
  });

export const useDeleteItem = () =>
  useRecoilCallback(({ set }) => (id: string) => {
    set(itemState, (state) =>
      produce(state, (draft) => {
        draft.items = draft.items.filter((v) => v.id !== id);
      })
    );
  });

export const useLoadItem = () =>
  useRecoilCallback(({ set }) => (loadedState: ItemState) => {
    set(itemState, (state) =>
      produce(state, (draft) => {
        draft.items = loadedState.items;
      })
    );
  });
