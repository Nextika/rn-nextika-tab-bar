import React, { FC, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TabBar } from 'rn-nextika-tab-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const Content: FC = () => {
  const insets = useSafeAreaInsets();

  const data = [
    { title: 'Home', description: 'Home tab description' },
    { title: 'News', description: 'News tab description' },
    { title: 'Forecast', description: 'Forecast tab description' },
    { title: 'Additional1', description: 'Additional1 tab description' },
    { title: 'Additional2', description: 'Additional2 tab description' },
    { title: 'Additional3', description: 'Additional3 tab description' },
    { title: 'Additional4', description: 'Additional4 tab description' },
    { title: 'Additional5', description: 'Additional5 tab description' },
  ];

  const tabs = useMemo(() => {
    return data.map(item => {
      return {
        title: item.title,
        renderContent: () => (
          <View>
            <Text>{item.description}</Text>
          </View>
        ),
      };
    });
  }, []);

  return (
    <View style={[styles.container, { marginTop: insets.top}]}>
      <TabBar
        tabs={tabs}
        isScrollDisabled={false}
        isSwipeDisabled={false}
        isHidden={false}
        activeColor={'red'}
        inactiveColor={'green'}
        tabBarHeaderStyles={styles.tabContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    paddingHorizontal: 16,
  }
})
