import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { DropdownItem } from './types/DropDownItem';

export type ScreenNavigationProps<T extends keyof RootStackParamList> = {
  navigation: StackNavigationProp<RootStackParamList, T>;
  route: RouteProp<RootStackParamList, T>;
};

export type RootStackParamList = {
  Home: undefined;
  Details: undefined;
  Journey: JourneyParams;
};

type JourneyParams = {
  departStation: DropdownItem;
  arriveStation: DropdownItem;
};
