import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { interpolateColor, useAnimatedStyle } from 'react-native-reanimated';
import { Colors } from '../styles/Colors';
export const TabBarButton = props => {
    const textTabStyle = useAnimatedStyle(() => {
        return {
            color: interpolateColor(props.animatedIndex.value, [props.index - 1, props.index, props.index + 1], [
                props.tabBarProps.inactiveColor ?? Colors.text.secondary,
                props.tabBarProps.activeColor ?? Colors.accent.default,
                props.tabBarProps.inactiveColor ?? Colors.text.secondary,
            ]),
        };
    });
    return (React.createElement(TouchableOpacity, { key: props.index, onLayout: event => props.onLayoutTab(event, props.index), onPress: () => props.onPressTab(props.index), style: [
            styles.tabContainer,
            props.tabBarProps.tabs.length - 1 !== props.index && styles.tabMargin,
            props.tabBarProps.isScrollDisabled && styles.tabContainerNotScroll,
        ] },
        props.tab.renderLeftTitleComponent ? props.tab.renderLeftTitleComponent() : null,
        React.createElement(Animated.Text, { style: [
                styles.textTab,
                props.tabBarProps.tabBarTextStyles,
                { color: props.tabBarProps.inactiveColor ?? Colors.text.secondary },
                textTabStyle,
            ] }, props.tab.title),
        props.tab.renderRightTitleComponent ? props.tab.renderRightTitleComponent() : null));
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
