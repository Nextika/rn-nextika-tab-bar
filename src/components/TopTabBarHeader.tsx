import React, { FC } from 'react';
import { LayoutChangeEvent, ScrollView, StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { TopTabBarController } from '../hooks/useAnimatedTabController';
import { Colors } from '../styles/Colors';
import { TopTabBarProps, TopTabBarItem } from '../types';
import { TopTabBarButton } from './TopTabBarButton';

export type TopTabBarHeaderProps = {
  controller: TopTabBarController;
  topTabBarProps: TopTabBarProps;
};

export const TopTabBarHeader: FC<TopTabBarHeaderProps> = props => {
  if (props.topTabBarProps.hideTabBar) {
    return null;
  }

  const onLayoutTab = (event: LayoutChangeEvent, index: number) => {
    const { width, x } = event.nativeEvent.layout;
    props.controller.setItemWidth({ ...props.controller.itemWidth, [index]: { width, x } });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={props.controller.scrollTabRef}
        bounces={false}
        horizontal
        scrollEnabled={props.topTabBarProps.disableScroll}
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          styles.contentContainer,
          props.topTabBarProps.disableScroll && styles.contentContainerNotScroll,
        ]}
      >
        {props.topTabBarProps.tabs.map((tab: TopTabBarItem, index: number) => (
          <TopTabBarButton
            key={`ttbh_${index}`}
            tab={tab}
            topTabBarProps={props.topTabBarProps}
            index={index}
            isLast={props.topTabBarProps.tabs.length - 1 === index} // todo tabBar - убрать внутрь
            disableScroll={!!props.topTabBarProps.disableScroll} // todo tabBar - убрать внутрь
            animatedIndex={props.controller.animatedIndex}
            onPressTab={props.controller.onPressTab}
            onLayoutTab={onLayoutTab}
          />
        ))}
        {Object.keys(props.controller.itemWidth).length > 1 && (
          <Animated.View
            style={[
              styles.tabUnderline,
              { backgroundColor: props.topTabBarProps.primaryColor ?? Colors.accent.default },
              props.controller.underlineStyle,
            ]}
          />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
  },
  contentContainerNotScroll: {
    flex: 1,
    flexGrow: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    flexDirection: 'row',
  },
  tabUnderline: {
    left: 0,
    width: 100,
    height: 2,
    bottom: 0,
    position: 'absolute',
  },
});
