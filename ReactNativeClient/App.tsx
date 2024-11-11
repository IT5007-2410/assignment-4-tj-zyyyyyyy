/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import IssueList from './IssueList.js';
import NavigationBar from './NavigationBar';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';



export default class App extends React.Component {
  state = {
    activeTab: 'list'
  };

  handleTabPress = (tabName: string) => {
    this.setState({ activeTab: tabName });
  };

  render() {
    return (
      <>
        <View style={styles.container}>
          <NavigationBar 
            activeTab={this.state.activeTab}
            onTabPress={this.handleTabPress}
          />
          <ScrollView style={styles.content}>
            <IssueList activeTab={this.state.activeTab} />
          </ScrollView>
        </View>
      </>);

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  content: {
    flex: 1,
    padding: 15,
  },
});