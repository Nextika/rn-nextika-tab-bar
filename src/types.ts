import { ReactNode } from 'react';
import { ColorValue, StyleProp, TextStyle } from 'react-native';

// todo tabBar - описать пропсы
export type TopTabBarProps = {
  tabs: TopTabBarItem[];
  hideTabBar?: boolean;
  disableScroll?: boolean;
  disablePageSwipe?: boolean;
  onChangeIndex?: (index: number) => void;
  primaryColor?: ColorValue;
  secondaryColor?: ColorValue;
  tabBarTextStyles?: StyleProp<TextStyle>;
};

export type TopTabBarItem = {
  title: string;
  renderContent: (index: number) => ReactNode | null;
  renderLeftTitleComponent?: () => ReactNode;
  renderRightTitleComponent?: () => ReactNode;
};

export interface IItemWidth {
  [key: string]: {
    x: number;
    width: number;
  };
}
