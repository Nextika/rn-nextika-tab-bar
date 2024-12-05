import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { Colors } from '../styles/Colors';
import { TabBarButton } from './TabBarButton';
export const TabBarHeader = props => {
    if (props.tabBarProps.isHidden) {
        return null;
    }
    const onLayoutTab = (event, index) => {
        const { width, x } = event.nativeEvent.layout;
        props.controller.setItemWidth({ ...props.controller.itemWidth, [index]: { width, x } });
    };
    return (React.createElement(View, { style: styles.container },
        React.createElement(ScrollView, { ref: props.controller.scrollTabRef, bounces: false, horizontal: true, scrollEnabled: !props.tabBarProps.isScrollDisabled, scrollEventThrottle: 1, showsHorizontalScrollIndicator: false, contentContainerStyle: [
                styles.contentContainer,
                props.tabBarProps.isScrollDisabled && styles.contentContainerNotScroll,
            ] },
            props.tabBarProps.tabs.map((tab, index) => (React.createElement(TabBarButton, { key: `ttbh_${index}`, tab: tab, tabBarProps: props.tabBarProps, index: index, animatedIndex: props.controller.animatedIndex, onPressTab: props.controller.onPressTab, onLayoutTab: onLayoutTab }))),
            Object.keys(props.controller.itemWidth).length > 1 && (React.createElement(Animated.View, { style: [
                    styles.tabUnderline,
                    { backgroundColor: props.tabBarProps.activeColor ?? Colors.accent.default },
                    props.controller.underlineStyle,
                ] })))));
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
