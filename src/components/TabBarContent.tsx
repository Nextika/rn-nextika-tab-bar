import React, { FC, useCallback } from 'react';
import { FlatList, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { TabBarController, WINDOW_WIDTH } from '../hooks/useAnimatedTabController';
import { TabBarItem, TabBarProps } from '../types';

export type TabBarContentProps = {
  controller: TabBarController;
  tabBarProps: TabBarProps;
};

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList<TabBarItem>);

export const TabBarContent: FC<TabBarContentProps> = props => {
  const handleMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.ceil(Math.floor(event.nativeEvent.contentOffset.x) / WINDOW_WIDTH);
    props.controller.currentIndex.value = index;

    if (props.tabBarProps.onChangeIndex && index !== props.controller.currentIndex.value) {
      props.tabBarProps.onChangeIndex(index);
    }
  };

  const handleKeyExtractor = useCallback((_: TabBarItem, index: number) => {
    return `ttbc_${index}`;
  }, []);

  const handleItemLayout = useCallback((_: ArrayLike<TabBarItem> | null | undefined, index: number) => {
    return {
      length: WINDOW_WIDTH,
      offset: WINDOW_WIDTH * index,
      index,
    };
  }, []);

  const renderItem = ({ item, index }: { item: TabBarItem; index: number }) => {
    return <View style={styles.containerItem}>{item.renderContent(index)}</View>;
  };

  return (
    <AnimatedFlatList
      ref={props.controller.scrollContentRef}
      // Scroll parameters
      onScroll={props.controller.onScroll}
      onMomentumScrollEnd={handleMomentumScrollEnd}
      // Render parameters
      bounces={false}
      horizontal
      pagingEnabled
      scrollEnabled={!props.tabBarProps.isSwipeDisabled}
      overScrollMode={'never'}
      scrollEventThrottle={0.1}
      keyboardShouldPersistTaps={'handled'}
      showsHorizontalScrollIndicator={false}
      data={props.tabBarProps.tabs as any}
      style={styles.flex}
      contentContainerStyle={styles.contentContainer}
      // Optimization parameters
      extraData={props.tabBarProps.tabs}
      initialNumToRender={5}
      maxToRenderPerBatch={5}
      keyExtractor={handleKeyExtractor}
      getItemLayout={handleItemLayout}
      // Render
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 8,
  },
  containerItem: {
    flex: 1,
    width: WINDOW_WIDTH,
  },
});
