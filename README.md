# rn-nextika-tab-bar

React Native library for implementing tab bar

## Installation

  ```sh
# npm
npm install rn-nextika-tab-bar
# yarn
yarn add rn-nextika-tab-bar
```

## Usage
You can check common usage via console `yarn example start` or by link [example](./example/src/components/Content.tsx)

If example installation gives you an error: Please make and install a development build on the device first.
You need to run `yarn example android` or `yarn example ios` first, to install the required build.
If there are any problems with the example build, you might need to delete the *example/ios* or *example/android*
sections and then run above commands once more.

```tsx
import React, { useMemo } from 'react';
import { TabBar } from 'rn-nextika-image-viewing';

export default function App() {
  const data = [
    { title: 'Home', description: 'Home tab description' },
    { title: 'News', description: 'News tab description' },
    { title: 'Forecast', description: 'Forecast tab description' },
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
    <TabBar
      tabs={tabs}
      isScrollDisabled={false}
      isSwipeDisabled={false}
      isHidden={false}
      activeColor={'red'}
      inactiveColor={'green'}
    />
  );
}
```

## Props

| Name                 | Type                     | Description                                                                                         |
|----------------------|--------------------------|-----------------------------------------------------------------------------------------------------|
| tabs                 | TabBarItem[]             | An array of tabs                                                                                    |
| isHidden             | boolean                  | Optional. Parameter to hide tab bar. Disabled by default                                            |
| isScrollDisabled     | boolean                  | Optional. Parameter to disable tab bar header's horizontal scroll. Disabled by default              |
| isSwipeDisabled      | boolean                  | Optional. Parameter to disable tab bar content swipe (between contents) option. Disabled by default |                                                                                                    |
| onChangeIndex        | (index: number) => void  | Callback. Gets called when tab index is changed                                                     |                                                                                                    |
| activeColor          | ColorValue               | Optional. Active tab color                                                                          |                                                                                                    |
| inactiveColor        | ColorValue               | Optional. Inactive tab color                                                                        |                                                                                                    |
| tabBarTextStyles     | StyleProp<TextStyle>     | Optional. Every tab bar custom text styles                                                          |                                                                                                    |

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

## Credits

Made with [react-native-builder-bob](https://github.com/callstack/react-native-builder-bob)
