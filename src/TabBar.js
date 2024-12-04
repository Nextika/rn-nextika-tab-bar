import React from 'react';
import { TabBarContent } from './components/TabBarContent';
import { TabBarHeader } from './components/TabBarHeader';
import { useAnimatedTabController } from './hooks/useAnimatedTabController';
export const TabBar = props => {
    const tabBarController = useAnimatedTabController();
    return (React.createElement(React.Fragment, null,
        React.createElement(TabBarHeader, { tabBarProps: props, controller: tabBarController }),
        React.createElement(TabBarContent, { tabBarProps: props, controller: tabBarController })));
};
