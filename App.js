/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';

import {
  BackHandler, Alert,
} from 'react-native';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Image,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TextInput } from 'react-native-gesture-handler';

class HomeScreen extends Component {

  extBtn() {
    BackHandler.exitApp();
  }

  render() {
    return(
      <View style={{flex: 1}}>
        <StatusBar barStyle="dark-content" backgroundColor="#EEE" />
        <View style={{flex: 1,backgroundColor: "#FFF",justifyContent: "center",alignItems: "center"}}>
          <Image source={require('./images/logo.jpg')} style={{width: 150,height: 150,resizeMode: "contain",marginBottom: 20}}/>
          <View style={{width: 200,marginVertical:6}}>
            <Button title="Mulai" color="#0f4c75" onPress={() => this.props.navigation.navigate("Game",{title: "bacot"})}/>
          </View>
          <View style={{width: 200,marginVertical:6}}>
            <Button title="Tentang" color="#0f4c75"/>
          </View>
          <View style={{width: 200,marginVertical:6}}>
            <Button title="Keluar" color="#0f4c75" onPress={this.extBtn.bind(this)}/>
          </View>
        </View>
      </View>
    );
  }
}

class GameScreen extends Component {

  constructor(props) {
    super(props);
    this.soal = {
      0: require('./images/1-udang-rebus.jpg'),
      1: require('./images/2-kambing-guling.jpg'),
      2: require('./images/3-jam-tangan.jpg'),
      3: require('./images/4-tantangan-seru.jpg'),
      4: require('./images/5-alas-kaki.jpg'),
      5: require('./images/6-tenaga-listrik.jpg'),
      6: require('./images/7-daun-bayam.jpg'),
      7: require('./images/8-minta-uang.jpg'),
      8: require('./images/9-jambu-batu.jpg'),
      9: require('./images/10-iga-bakar.jpg'),
    };

    this.kunci = ['UDANG REBUS','KAMBING GULING','JAM TANGAN','TANTANGAN SERU','ALAS KAKI','TENAGA LISTRIK','DAUN BAYAM','MINTA UANG','JAMBU BATU','IGA BAKAR'];
    this.level = 0;
    this.state = {
      jawaban: "",
      soal: this.soal[0],
      level: this.level + 1
    }
  }

  handlerPress() {
    var jawaban = this.state.jawaban;
    var getjawaban = this.kunci[this.level];
    if(jawaban != getjawaban) {
      Alert.alert(
        'Salah',
        'Jawaban anda nampaknya masih salah, silahkan diperbaiki!'
      );
    } else {
      this.level = this.level + 1;
      if(this.level >= this.kunci.length) {
        this.props.navigation.navigate("End");
      } else {
        Alert.alert(
          'Benar',
          'Anda dapat menjawab soal berikutnya'
        );
        this.setState({
          jawaban: "",
          soal: this.soal[this.level],
          level: this.level + 1
        });
      }
    }

  }
  
  render() {
    this.props.navigation.setOptions({title: "Soal "+this.state.level});
    return(
      <View style={{flex: 1}}>
        <View style={{flex: 1,justifyContent: "center",alignItems: "center"}}>
          <Image source={this.state.soal} style={{width: 300,height: 300,resizeMode: "contain"}}/>
        </View>
        <View style={{backgroundColor: "#FFF",paddingHorizontal: 20,paddingVertical: 7,height: 50,justifyContent: "center",alignItems: "center",flexDirection: "row",elevation: 10}}>
          <TextInput ref="jawaban" onChangeText={(jawaban) => this.setState({jawaban})} placeholder="TULIS JAWABAN...." autoCapitalize="characters" style={{flex:1}} value={this.state.jawaban}/>
          <Button title="Jawab" onPress={this.handlerPress.bind(this)}/>
        </View>
      </View>
    );
  }
}

class EndScreen extends Component {
  back() {
    this.props.navigation.navigate("Home");
  }

  render() {
    return(
      <View style={{flex: 1,alignItems:"center",justifyContent:"center"}}>
        <Image source={require("./images/correct.png")} style={{width: 150,height: 150,resizeMode: "contain"}}/>
        <Text style={{fontSize: 24,marginTop: 12,marginBottom: 25}}>TAMAT</Text>
        <Button title="Kembali" onPress={this.back.bind(this)}/>
      </View>
    );
  }
}

const Stack = createStackNavigator();

export default class App extends Component {
  render() {
    return(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
          <Stack.Screen name="Game" component={GameScreen} options={{title: "kampang"}}/>
          <Stack.Screen name="End" component={EndScreen} options={{headerShown: false,title: "Selesai"}}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  
});
