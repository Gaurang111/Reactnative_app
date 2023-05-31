import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet,View, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { Asset } from 'expo-asset';
import { StatusBar } from 'expo-status-bar';

const PlotlyChart = () => {


  const filePaths = [
    require('../android_assets/vis1.html'),
    require('../android_assets/vis2.html'),
    require('../android_assets/vis3.html'),
    require('../android_assets/vis4.html'),
  ];
  const [htmlContents, setHtmlContents] = useState([]);

  useEffect(() => {
    const loadHtmlContents = async () => {
      const promises = filePaths.map(async (filePath) => {
        const htmlPath = Asset.fromModule(filePath).uri;
        const htmlString = await fetch(htmlPath).then((response) => response.text());
        return htmlString;
      });

      const contents = await Promise.all(promises);
      setHtmlContents(contents);
    };

    loadHtmlContents();
  }, []);

  if (htmlContents.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const renderItem = ({ item, index }) => (
    <WebView
      key={index}
      originWhitelist={['*']}
      source={{ html: item }}
      style={styles.web}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.dash}>
        <Text style={styles.text}>DashBoard</Text>
      </View>
      <FlatList
        data={htmlContents}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        style={styles.scroll}
      />
      <StatusBar hidden backgroundColor='white' />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#02424f',
    //alignItems: 'center',
    //justifyContent: 'center',
    borderBottomWidth: 3,
    borderTopWidth:3,
    borderLeftWidth:3,
    borderRightWidth:3,
    //borderColor:'red',
    
},
  dash:{
    flex:0.05,
    //borderBottomWidth: 2,
    //borderTopWidth:2,
    //borderLeftWidth:3,
    //borderRightWidth:3,
    borderColor:'black',
    padding:'1%',
    paddingBottom: '2%',
    marginBottom:'1%',
    alignItems:'center',
    backgroundColor: '#03d3fc',
},
text:{ 
  fontSize: 28,
  fontWeight:"semibold",
  color: "#02424f" },

scroll:{
  //borderBottomWidth: 2,
  //borderTopWidth:2,
  //borderLeftWidth:3,
  //borderRightWidth:3,
  //borderColor:'green',
  flex:0.95,
  //margin:'1%',
  //padding:'1%',
  backgroundColor: '#02424f',

  
},
view1:{
  flex:1,
  borderBottomWidth: 2,
  borderTopWidth:2,
  borderLeftWidth:3,
  borderRightWidth:3,
  borderColor:'blue',
  padding:10,
  alignItems:'center',
  marginBottom:'2%',
},
header: {
  height: 500,
  justifyContent: 'center'    
},
web: {
  flex:1,
  height: 300,
  width: '100%',
  marginBottom:'1%' }
});

export default PlotlyChart;