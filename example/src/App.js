import { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { multiply } from 'rn-nextika-tab-bar';
export default function App() {
    const [result, setResult] = useState();
    useEffect(() => {
        multiply(3, 7).then(setResult);
    }, []);
    return (React.createElement(View, { style: styles.container },
        React.createElement(Text, null,
            "Result: ",
            result)));
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        width: 60,
        height: 60,
        marginVertical: 20,
    },
});
