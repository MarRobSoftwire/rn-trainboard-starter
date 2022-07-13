import React from 'react';
import { StyleSheet } from 'react-native';
import { List } from 'react-native-paper';
import { Props } from 'react-native-paper/lib/typescript/components/RadioButton/RadioButton';

type DropdownProps = {
  title: string;
  items: DropdownItem[];
  // selected: DropdownItem;
};

type DropdownItem = {
  displayName: string;
  value: string | null;
};

const listStyle = StyleSheet.create({
  container: {
    backgroundColor: '#83ccde',
  },
});

const defaultStation: DropdownItem = {
  displayName: 'Pick a station',
  value: null,
};


const DropDown: React.FC<DropdownProps> = ({ title, items }) => {
  const [expanded, setExpanded] = React.useState(true);
  const handlePress = () => setExpanded(!expanded);
  const [selected, setSelected] = React.useState(defaultStation);
  const itemSelected = (item: DropdownItem) => setSelected(item);
  //const [];

  return (
    <List.Section title={title}>
      <List.Accordion
        style={listStyle.container}
        title={selected.displayName}
        left={(props) => <List.Icon {...props} icon="train" />}
        //expanded={expanded}
        //onPress={handlePress}
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
