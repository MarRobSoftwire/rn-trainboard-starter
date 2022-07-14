export type DropdownItem = {
  displayName: string;
  value: string | null;
};

export type DropdownProps = {
  title: string;
  items: DropdownItem[];
  setSelected: React.Dispatch<React.SetStateAction<DropdownItem>>;
  selected: DropdownItem;
};
