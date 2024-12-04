import React, { FC } from 'react';
import { LayoutChangeEvent, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { SharedValue, interpolateColor, useAnimatedStyle } from 'react-native-reanimated';

import { Colors } from '../styles/Colors';
import { TabBarItem, TabBarProps } from '../types';

export type TabBarButtonProps = {
  tab: TabBarItem;
  tabBarProps: TabBarProps;
  index: number;
  animatedIndex: SharedValue<number>;
  onPressTab: (index: number) => void;
  onLayoutTab: (event: LayoutChangeEvent, index: number) => void;
};

export const TabBarButton: FC<TabBarButtonProps> = props => {
  const textTabStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        props.animatedIndex.value,
        [props.index - 1, props.index, props.index + 1],
        [
          (props.tabBarProps.inactiveColor as string | undefined) ?? Colors.text.secondary,
          (props.tabBarProps.activeColor as string | undefined) ?? Colors.accent.default,
          (props.tabBarProps.inactiveColor as string | undefined) ?? Colors.text.secondary,
        ],
      ),
    };
  });

  return (
    <TouchableOpacity
      key={props.index}
      onLayout={event => props.onLayoutTab(event, props.index)}
      onPress={() => props.onPressTab(props.index)}
      style={[
        styles.tabContainer,
        props.tabBarProps.tabs.length - 1 !== props.index && styles.tabMargin,
        props.tabBarProps.isScrollDisabled && styles.tabContainerNotScroll,
      ]}
    >
      {props.tab.renderLeftTitleComponent ? props.tab.renderLeftTitleComponent() : null}
      <Animated.Text
        style={[
          styles.textTab,
          props.tabBarProps.tabBarTextStyles,
          { color: props.tabBarProps.inactiveColor ?? Colors.text.secondary },
          textTabStyle,
        ]}
      >
        {props.tab.title}
      </Animated.Text>
      {props.tab.renderRightTitleComponent ? props.tab.renderRightTitleComponent() : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    minHeight: 60,
    paddingBottom: 4,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  tabMargin: {
    marginRight: 12,
  },
  tabContainerNotScroll: {
    flex: 1,
  },
  textTab: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
    letterSpacing: 0.15,
  },
});
