import React from 'react'
import { View, Text, StyleSheet, StatusBar } from 'react-native'

export default function Header() {
    return (
        <View>
            <StatusBar
                animated={false}
                backgroundColor="black"
                barStyle={'default'}
            />
            <View>
                <Text style={styles.header}>DIU CGPA Calculator</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        fontSize: 30,
        marginTop: 24,
        marginBottom: 25,
        fontWeight: 'bold',
        backgroundColor: "black",
        padding: 10,
        textAlign: 'center',
        color: "#FFFFFF",
    }
});
