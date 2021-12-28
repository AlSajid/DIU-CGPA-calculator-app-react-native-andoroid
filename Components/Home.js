import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react'
import { StyleSheet, View, Text, Button, TextInput, ToastAndroid, ActivityIndicator } from 'react-native';
import { Link, useNavigate } from 'react-router-native';
import Header from './Header';
import useData from './Hooks/useData';

export default function Home() {
    const navigate = useNavigate();
    const { batch, setBatch, dept, setDept, ID, setID, setInfo, loading, setLoading } = useData();

    const studentID = `${batch}-${dept}-${ID}`;


    function getResult() {
        setLoading(true);

        const url = `http://software.diu.edu.bd:8189/result/studentInfo?studentId=${studentID}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.studentId === null) {
                    ToastAndroid.show(`Invalid Student ID`, 10000);
                    setLoading(false)
                } else {
                    ToastAndroid.show(`Fetching Student information of ${studentID}`, 10000);
                    setInfo(data);
                    navigate("/result");

                }

            })
            .catch(error => ToastAndroid.show(`Cannot Fetch`, 10000));



    }



    return (
        <View style={styles.container}>
            <Header></Header>
            <View style={styles.home}>
                <Text style={styles.label}>Enter Your Student ID</Text>

                <View style={styles.inputBox}>
                    <TextInput
                        style={styles.info}
                        onChangeText={text => setBatch(text)}
                        placeholder="191"
                        keyboardType="numeric"
                        style={styles.input}
                        maxLength={3}
                    />
                    <Text>-</Text>
                    <TextInput
                        onChangeText={text => setDept(text)}
                        placeholder="15"
                        keyboardType="numeric"
                        style={styles.input}
                        maxLength={2} />
                    <Text>-</Text>
                    <TextInput
                        onChangeText={text => setID(text)}
                        placeholder="0000"
                        style={styles.input}
                        keyboardType="numeric"
                        maxLength={5}
                    />
                </View>
                {loading ?
                    <ActivityIndicator size="large" color="Black" />
                    :
                    <Button
                        color='black'
                        onPress={getResult}
                        title="Get Student Info" />
                }
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
    },
    home: {
        alignItems: 'center',

    },
    label: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: "bold",
        margin: 30,
    },
    input: {
        margin: 5,
        height: 40,
        width: 100,
        fontSize: 15,
        textAlign: "center",
        padding: 3,
        borderWidth: 1,
    },
    inputBox: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    }
});
