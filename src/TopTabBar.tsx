import React, { FC } from 'react';

import { TopTabBarContent } from './components/TopTabBarContent';
import { TopTabBarHeader } from './components/TopTabBarHeader';
import { useAnimatedTabController } from './hooks/useAnimatedTabController';
import { TopTabBarProps } from './types';

export const TopTabBar: FC<TopTabBarProps> = props => {
  const topTabBarController = useAnimatedTabController();

  return (
    <>
      <TopTabBarHeader topTabBarProps={props} controller={topTabBarController} />
      <TopTabBarContent topTabBarProps={props} controller={topTabBarController} />
    </>
  );
};
