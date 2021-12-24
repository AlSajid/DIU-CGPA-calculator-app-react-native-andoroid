import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeRouter, Route, Routes } from 'react-router-native';
import Home from './Components/Home';
import AllContext from './Components/Hooks/AllContext';
import Result from './Components/Result';

export default function App() {
  return (
    <View>
      <StatusBar style="auto" />
      <NativeRouter>
        <AllContext>
          <Routes>
            <Route path="/" element={<Home></Home>} />
            <Route path="/result" element={<Result></Result>}/>
          </Routes>
        </AllContext>
      </NativeRouter>
    </View >
  );
}