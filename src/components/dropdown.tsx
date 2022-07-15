import React from 'react';
import { StyleSheet } from 'react-native';
import { List } from 'react-native-paper';
import { DropdownItem, DropdownProps } from '../types/DropDownItem';

const listStyle = StyleSheet.create({
  container: {
    backgroundColor: '#83ccde',
  },
});

const DropDown: React.FC<DropdownProps> = ({
  title,
  items,
  setSelected,
  selected,
}) => {
  const [expanded, setExpanded] = React.useState(true);
  const itemSelected = (item: DropdownItem) => {
    setSelected(item);
    setExpanded(!expanded);
  };

  return (
    <List.Section title={title}>
      <List.Accordion
        style={listStyle.container}
        title={selected.displayName}
        left={(props) => <List.Icon {...props} icon="train" />}
        expanded={expanded}
        onPress={() => setExpanded(!expanded)}
      >
        {items.map((item: DropdownItem) => (
          <List.Item
            key={item.value}
            title={item.displayName}
            onPress={() => itemSelected(item)}
          />
        ))}
      </List.Accordion>
    </List.Section>
  );
};

export default DropDown;
