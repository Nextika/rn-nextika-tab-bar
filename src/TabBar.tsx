import React, { FC } from 'react';

import { TabBarContent } from './components/TabBarContent';
import { TabBarHeader } from './components/TabBarHeader';
import { useAnimatedTabController } from './hooks/useAnimatedTabController';
import { TabBarProps } from './types';

export const TabBar: FC<TabBarProps> = props => {
  const tabBarController = useAnimatedTabController();

  return (
    <>
      <TabBarHeader tabBarProps={props} controller={tabBarController} />
      <TabBarContent tabBarProps={props} controller={tabBarController} />
    </>
  );
};
