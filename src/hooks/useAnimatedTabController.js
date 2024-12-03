import { useRef, useState } from 'react';
import { Dimensions, } from 'react-native';
import { interpolate, scrollTo, useAnimatedRef, useAnimatedScrollHandler, useAnimatedStyle, useDerivedValue, useSharedValue, withTiming, } from 'react-native-reanimated';
export const WINDOW_WIDTH = Dimensions.get('window').width;
export const useAnimatedTabController = () => {
    const scrollTabRef = useAnimatedRef();
    const scrollContentRef = useRef(null);
    // Width and offsetX of every tab
    const [itemWidth, setItemWidth] = useState({});
    const currentIndex = useSharedValue(0);
    const animatedIndex = useSharedValue(0);
    const translateScrollX = useSharedValue(0);
    const underlineStyle = useAnimatedStyle(() => {
        'worklet';
        const keys = Object.keys(itemWidth);
        if (keys.length <= 1) {
            // If first tab have a width, then use it for render
            const width = !!itemWidth[0] ? itemWidth[0].width : 0;
            const translate = !!itemWidth[0] ? itemWidth[0].x : 0;
            return {
                width: width,
                transform: [
                    {
                        translateX: translate,
                    },
                ],
            };
        }
        const inputRange = keys.map((_, i) => i * WINDOW_WIDTH);
        const outputRangeWidth = keys.map(key => itemWidth[key].width);
        const outputRangeTranslate = keys.map(key => itemWidth[key].x);
        return {
            width: interpolate(translateScrollX.value, inputRange, outputRangeWidth),
            transform: [
                {
                    translateX: interpolate(translateScrollX.value, inputRange, outputRangeTranslate),
                },
            ],
        };
    });
    useDerivedValue(() => {
        'worklet';
        const keys = Object.keys(itemWidth);
        if (keys.length <= 1) {
            // Until the sizes of the first two tabs are loading, set the scroll to the top of the list.
            scrollTo(scrollTabRef, 0, 0, false);
        }
        else {
            const inputRange = keys.map((_, i) => i * WINDOW_WIDTH);
            // If first tab - don't use scrollTo
            // If not first tab - use scrollTo with 24 offset (to see the previous tab)
            const outputRangeTranslate = keys.map(key => (key === '0' ? 0 : itemWidth[key].x - 24));
            // We use scrollTo from reanimated, so it could work inside useDerivedValue
            scrollTo(scrollTabRef, interpolate(translateScrollX.value, inputRange, outputRangeTranslate), 0, false);
        }
    });
    const onScroll = useAnimatedScrollHandler(event => {
        'worklet';
        // Updating the content scroll change.
        translateScrollX.value = event.contentOffset.x;
        // Updating the current index change to highlight text with color in TopTabBarButton component
        animatedIndex.value = translateScrollX.value / WINDOW_WIDTH;
    });
    const onPressTab = (index) => {
        currentIndex.value = index;
        animatedIndex.value = withTiming(index);
        scrollContentRef.current?.scrollToIndex({ index, animated: true });
    };
    return {
        itemWidth,
        currentIndex,
        scrollTabRef,
        animatedIndex,
        underlineStyle,
        scrollContentRef,
        onScroll,
        onPressTab,
        setItemWidth,
    };
};
