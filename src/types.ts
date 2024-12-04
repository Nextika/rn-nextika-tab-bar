import { ReactNode } from 'react';
import { ColorValue, StyleProp, TextStyle } from 'react-native';

export type TabBarProps = {
  /**
   * An array of tabs that specifies the title and renderContent.
   * renderLeftTitleComponent and renderRightTitleComponent might be used
   * to render the left or the right component of the tab-header.
   */
  tabs: TabBarItem[];

  /**
   * Parameter to hide tab bar.
   * Disabled by default.
   */
  isHidden?: boolean;

  /**
   * Parameter to disable tab bar header's horizontal scroll.
   * Disabled by default.
   */
  isScrollDisabled?: boolean;

  /**
   * Parameter to disable tab bar content swipe (between contents) option.
   * Disabled by default.
   */
  isSwipeDisabled?: boolean;

  /**
   * Callback fired when tab index is changed.
   * @param index
   */
  onChangeIndex?: (index: number) => void;

  /**
   * Active tab color
   */
  activeColor?: ColorValue;

  /**
   * Inactive tab color
   */
  inactiveColor?: ColorValue;

  /**
   * Every tab bar custom text styles
   */
  tabBarTextStyles?: StyleProp<TextStyle>;
};

export type TabBarItem = {
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
