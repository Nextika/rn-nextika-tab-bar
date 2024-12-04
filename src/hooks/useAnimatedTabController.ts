import { useRef, useState, RefObject, Dispatch, SetStateAction } from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  ViewStyle,
  Dimensions,
  StyleProp,
} from 'react-native';
import {
  SharedValue,
  interpolate,
  scrollTo,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { DefaultStyle } from 'react-native-reanimated/lib/typescript/reanimated2/hook/commonTypes';

import { IItemWidth } from '../types';

export type TabBarController = {
  itemWidth: IItemWidth;
  currentIndex: SharedValue<number>;
  scrollTabRef: RefObject<ScrollView>;
  animatedIndex: SharedValue<number>;
  underlineStyle: StyleProp<ViewStyle>;
  scrollContentRef: RefObject<FlatList>;

  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onPressTab: (index: number) => void;
  setItemWidth: Dispatch<SetStateAction<IItemWidth>>;
};

export const WINDOW_WIDTH = Dimensions.get('window').width;

export const useAnimatedTabController = (): TabBarController => {
  const scrollTabRef = useAnimatedRef<ScrollView>();
  const scrollContentRef = useRef<FlatList | null>(null);

  // Width and offsetX of every tab
  const [itemWidth, setItemWidth] = useState<IItemWidth>({});

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
      } as DefaultStyle;
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
    } as DefaultStyle;
  });

  useDerivedValue(() => {
    'worklet';
    const keys = Object.keys(itemWidth);

    if (keys.length <= 1) {
      // Until the sizes of the first two tabs are loading, set the scroll to the top of the list.
      scrollTo(scrollTabRef, 0, 0, false);
    } else {
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

    // Updating the current index change to highlight text with color in TabBarButton component
    animatedIndex.value = translateScrollX.value / WINDOW_WIDTH;
  });

  const onPressTab = (index: number) => {
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
