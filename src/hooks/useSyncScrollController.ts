import { useCallback, useRef } from 'react';
import {
  FlatList,
  FlatListProps,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  SectionList,
} from 'react-native';

export type ManualScrollHandlerProps = {
  onScroll?: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onScrollEnd?: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
};

export type SyncScrollController = {
  useSyncedScroll: () => Partial<FlatListProps<any>>;
  scrollAllTo: (offset: number) => void;
};

// Hook, which records the current scroll for each tab
// In this hook, you can add additional functionality if you need to manage the list in tabs
export const useSyncScrollController = (): SyncScrollController => {
  const scrolls = useRef<{ [key: string]: any }>({});

  const getSyncOffset = (offset: number): number => {
    if (offset < 0) {
      return 0;
    } else if (offset > 12) {
      return 12;
    }

    return offset;
  };

  const getScrollKeys = () => {
    return Object.keys(scrolls.current);
  };

  // A function that scrolls all tabs to the required value
  const scrollAllTo = (offset: number) => {
    syncScrolls(
      getSyncOffset(offset),
      getScrollKeys().map(k => scrolls.current[k]),
    );
  };

  const getNextScrollKey = (): string => {
    return (getScrollKeys().length + 1).toString();
  };

  const useSyncedScroll = () => {
    const scrollKey = useRef<string>();

    const scrollHandler: ManualScrollHandlerProps = {
      onScrollEnd: e => {
        syncScrolls(
          getSyncOffset(e.nativeEvent.contentOffset.y + 12),
          getScrollKeys().map(k => (k === scrollKey.current ? undefined : scrolls.current[k])),
        );
      },
    };

    const registerRef = useCallback((ref: any) => {
      scrollKey.current = scrollKey.current || getNextScrollKey();
      scrolls.current[scrollKey.current] = ref;
      syncScrolls(0, [ref]);
    }, []);

    return { ...scrollHandler, ref: registerRef };
  };

  return { useSyncedScroll, scrollAllTo } as SyncScrollController;
};

export const syncScrolls = (scrollOffset: number, listRefs: ((ScrollView & FlatList & SectionList) | null)[]) => {
  listRefs.map(r => {
    try {
      if (r) {
        if (r.scrollTo) {
          r.scrollTo({
            x: 0,
            y: scrollOffset - 12,
            animated: false,
          });
        } else if (r.scrollToOffset) {
          r.scrollToOffset({
            animated: false,
            offset: scrollOffset - 12,
          });
        } else {
          r.scrollToLocation({
            animated: false,
            sectionIndex: 0,
            itemIndex: 0,
            viewOffset: 12 - scrollOffset,
          });
        }
      }
    } catch (e) {
      /* eslint-disable no-console */
      console.error(e);
      /* eslint-enable no-console */
    }
  });
};
