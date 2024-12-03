import React from 'react';
import { TopTabBarContent } from './components/TopTabBarContent';
import { TopTabBarHeader } from './components/TopTabBarHeader';
import { useAnimatedTabController } from './hooks/useAnimatedTabController';
export const TopTabBar = props => {
    const topTabBarController = useAnimatedTabController();
    return (React.createElement(React.Fragment, null,
        React.createElement(TopTabBarHeader, { topTabBarProps: props, controller: topTabBarController }),
        React.createElement(TopTabBarContent, { topTabBarProps: props, controller: topTabBarController })));
};
