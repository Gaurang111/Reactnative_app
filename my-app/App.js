import React, { useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

import PlotlyChart from './components/dash.js';

const File2 = () => {
  const [showChart, setShowChart] = useState(false);

  const goToOtherScreen = () => {
    setShowChart(true);
  };

  return (
    <View style={styles.cont}>
      
      {showChart ? (
        <View style={styles.chartContainer}>
          <PlotlyChart />
        </View>
      ) : (
        <Button title="DashBoard" onPress={goToOtherScreen} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartContainer: {
    flex: 1,
    width: '100%',
  },
});

export default File2;
