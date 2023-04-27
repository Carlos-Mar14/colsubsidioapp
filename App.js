import React from 'react';
import { LogBox } from 'react-native'
import Navigation from './navigations/Navigation';

//Oculta el warning de (account, account > account), solo es visible por consola
LogBox.ignoreAllLogs()

export default function App() {
  return (
    <Navigation/>
  )
}