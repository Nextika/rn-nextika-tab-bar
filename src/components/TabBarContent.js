import React, { useCallback } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { WINDOW_WIDTH } from '../hooks/useAnimatedTabController';
const AnimatedFlatList = Animated.createAnimatedComponent((FlatList));
export const TabBarContent = props => {
    const handleMomentumScrollEnd = (event) => {
        const index = Math.ceil(Math.floor(event.nativeEvent.contentOffset.x) / WINDOW_WIDTH);
        props.controller.currentIndex.value = index;
        if (props.tabBarProps.onChangeIndex && index !== props.controller.currentIndex.value) {
            props.tabBarProps.onChangeIndex(index);
        }
    };
    const handleKeyExtractor = useCallback((_, index) => {
        return `ttbc_${index}`;
    }, []);
    const handleItemLayout = useCallback((_, index) => {
        return {
            length: WINDOW_WIDTH,
            offset: WINDOW_WIDTH * index,
            index,
        };
    }, []);
    const renderItem = ({ item, index }) => {
        return React.createElement(View, { style: styles.containerItem }, item.renderContent(index));
    };
    return (React.createElement(AnimatedFlatList, { ref: props.controller.scrollContentRef, 
        // Scroll parameters
        onScroll: props.controller.onScroll, onMomentumScrollEnd: handleMomentumScrollEnd, 
        // Render parameters
        bounces: false, horizontal: true, pagingEnabled: true, scrollEnabled: !props.tabBarProps.isSwipeDisabled, overScrollMode: 'never', scrollEventThrottle: 0.1, keyboardShouldPersistTaps: 'handled', showsHorizontalScrollIndicator: false, data: props.tabBarProps.tabs, style: styles.flex, contentContainerStyle: styles.contentContainer, 
        // Optimization parameters
        extraData: props.tabBarProps.tabs, initialNumToRender: 5, maxToRenderPerBatch: 5, keyExtractor: handleKeyExtractor, getItemLayout: handleItemLayout, 
        // Render
        renderItem: renderItem }));
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
