import React, { useState } from 'react'
import { View, Text } from 'react-native'

export default function student() {
    //states
    const [batch, setBatch] = useState('');
    const [dept, setDept] = useState('');
    const [ID, setID] = useState('');
    const [info, setInfo] = useState([]);
    const [loading, setLoading] = useState(false);
    const [final, setFinal] = useState(false);




    return { batch, setBatch, dept, setDept, ID, setID, info, setInfo, loading, setLoading, final, setFinal }
}
