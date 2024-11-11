import React, { useState } from 'react';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  Button,
  useColorScheme,
  View,
} from 'react-native';

import { Picker } from '@react-native-picker/picker';

const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
}

async function graphQLFetch(query, variables = {}) {
  try {
    /****** Q4: Start Coding here. State the correct IP/port******/
    const response = await fetch('http://10.0.2.2:3000/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables })
      /****** Q4: Code Ends here******/
    });
    const body = await response.text();
    const result = JSON.parse(body, jsonDateReviver);

    if (result.errors) {
      const error = result.errors[0];
      if (error.extensions.code == 'BAD_USER_INPUT') {
        const details = error.extensions.exception.errors.join('\n ');
        alert(`${error.message}:\n ${details}`);
      } else {
        alert(`${error.extensions.code}: ${error.message}`);
      }
    }
    return result.data;
  } catch (e) {
    alert(`Error in sending data to server: ${e.message}`);
  }
}

class IssueFilter extends React.Component {
  render() {
    return (
      <>
        {/****** Q1: Start Coding here. ******/}
        <View>
          <Text>
            This is a placeholder for the Issue Filter.
          </Text>
        </View>
        {/****** Q1: Code ends here ******/}
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    elevation: 3,
    padding: 15,
  },
  header: {
    height: 45,
    backgroundColor: '#34495e',
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  text: {
    textAlign: 'center',
    color: '#2c3e50',
    padding: 5,
  },
  headerText: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    padding: 5,
  },
  row: {
    height: 45,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  input: {
    height: 60,
    borderWidth: 1,
    borderColor: '#bdc3c7',
    borderRadius: 4,
    marginVertical: 8,
    paddingHorizontal: 10,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginVertical: 10,
  },
  componentWrapper: {
    marginVertical: 16, // Adds 16 points of space above and below each component
  },
});

const width = [40, 80, 80, 80, 80, 80, 200];

function IssueRow(props) {
  const issue = props.issue;
  {/****** Q2: Coding Starts here. Create a row of data in a variable******/ }
  const row = [
    issue.id,
    issue.status,
    issue.owner,
    issue.effort,
    issue.created.toDateString(),
    issue.due ? issue.due.toDateString() : '',
    issue.title
  ];
  {/****** Q2: Coding Ends here.******/ }
  return (
    <>
      {/****** Q2: Start Coding here. Add Logic to render a row  ******/}
      <TableWrapper style={styles.row}>
        <Rows data={[row]} widthArr={width} style={styles.row} textStyle={styles.text} />
      </TableWrapper>
      {/****** Q2: Coding Ends here. ******/}
    </>
  );
}


function IssueTable(props) {
  const issueRows = props.issues.map(issue =>
    <IssueRow key={issue.id} issue={issue} />
  );

  {/****** Q2: Start Coding here. Add Logic to initalize table header  ******/ }
  const tableHead = ['ID', 'Status', 'Owner', 'Effort', 'Created', 'Due', 'Title'];
  {/****** Q2: Coding Ends here. ******/ }


  return (
    <View style={styles.container}>
      {/****** Q2: Start Coding here to render the table header/rows.**********/}
      {/* allow horizontal scrolling to see all columns on small screens */}
      <ScrollView horizontal>
        <Table>
          <TableWrapper style={styles.header}>
            <Row data={tableHead} style={styles.header} widthArr={width} textStyle={styles.headerText} />
          </TableWrapper>
          <ScrollView style={styles.dataWrapper}>
            {issueRows}
          </ScrollView>
        </Table>
      </ScrollView>
      {/****** Q2: Coding Ends here. ******/}
    </View>
  );
}


class IssueAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    /****** Q3: Start Coding here. Create State to hold inputs******/
    this.state = {
      owner: '',
      title: '',
      due: '',
      effort: '',
      status: ''
    };
    /****** Q3: Code Ends here. ******/
  }

  /****** Q3: Start Coding here. Add functions to hold/set state input based on changes in TextInput******/
  setField(field, value) {
    this.setState({ [field]: value });
  }
  /****** Q3: Code Ends here. ******/

  handleSubmit() {
    /****** Q3: Start Coding here. Create an issue from state variables and call createIssue. Also, clear input field in front-end******/
    const issue = {
      owner: this.state.owner,
      title: this.state.title,
      due: this.state.due,
      effort: parseInt(this.state.effort),
      status: this.state.status
    };

    this.props.createIssue(issue); // call createIssue to add issue
    this.setState({
      owner: '',
      title: '',
      due: '',
      effort: '',
      status: ''
    }); // reset data
    /****** Q3: Code Ends here. ******/
  }

  render() {
    return (
      <View>
        {/****** Q3: Start Coding here. Create TextInput field, populate state variables. Create a submit button, and on submit, trigger handleSubmit.*******/}
        <Text style={styles.header}>Add Issue</Text>
        <TextInput
          style={styles.input}
          placeholder="Owner"
          value={this.state.owner}
          onChangeText={(text) => this.setField('owner', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={this.state.title}
          onChangeText={(text) => this.setField('title', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Due Date (YYYY-MM-DD)"
          value={this.state.due}
          onChangeText={(text) => this.setField('due', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Effort"
          value={this.state.effort}
          keyboardType="numeric"
          onChangeText={(text) => this.setField('effort', text)}
        />
        <Text>Status</Text>
        <Picker
          style={styles.input}
          selectedValue={this.state.status}
          onValueChange={(itemValue) => this.setField('status', itemValue)}>
          <Picker.Item label="New" value="New" />
          <Picker.Item label="Assigned" value="Assigned" />
          <Picker.Item label="Fixed" value="Fixed" />
          <Picker.Item label="Closed" value="Closed" />
        </Picker>
        <Button title="Add" onPress={this.handleSubmit} />
        {/****** Q3: Code Ends here. ******/}
      </View>
    );
  }
}

class BlackList extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    /****** Q4: Start Coding here. Create State to hold inputs******/
    this.state = {
      owner: ''
    };
    /****** Q4: Code Ends here. ******/
  }

  /****** Q4: Start Coding here. Add functions to hold/set state input based on changes in TextInput******/
  setOwner(value) {
    this.setState({ owner: value });
  }
  /****** Q4: Code Ends here. ******/

  async handleSubmit() {
    /****** Q4: Start Coding here. Create an issue from state variables and issue a query. Also, clear input field in front-end******/
    const mutation = `mutation addToBlacklist($nameInput: String!) {
      addToBlacklist(nameInput: $nameInput)
    }`;

    const variables = { nameInput: this.state.owner };
    await graphQLFetch(mutation, variables);

    this.setState({ owner: '' });
    /****** Q4: Code Ends here. ******/
  }

  render() {
    return (
      <View>
        {/****** Q4: Start Coding here. Create TextInput field, populate state variables. Create a submit button, and on submit, trigger handleSubmit.*******/}
        <Text style={styles.header}>Add to Blacklist</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter owner name"
          value={this.state.owner}
          onChangeText={(text) => this.setOwner(text)}
        />
        <Button
          title="Add to Blacklist"
          onPress={this.handleSubmit}
        />
        {/****** Q4: Code Ends here. ******/}
      </View>
    );
  }
}

export default class IssueList extends React.Component {
  constructor() {
    super();
    this.state = { issues: [] };
    this.createIssue = this.createIssue.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const query = `query {
        issueList {
        id title status owner
        created effort due
        }
    }`;

    const data = await graphQLFetch(query);
    if (data) {
      this.setState({ issues: data.issueList });
      console.log("Data loaded", data.issueList);
    }
  }

  async createIssue(issue) {
    const query = `mutation issueAdd($issue: IssueInputs!) {
        issueAdd(issue: $issue) {
        id
        }
    }`;

    const data = await graphQLFetch(query, { issue });
    if (data) {
      this.loadData();
    }
  }


  render() {
    const { activeTab } = this.props;

    return (
      <>
        <SafeAreaView>
          <ScrollView>
            {activeTab === 'filter' && (
              <View style={styles.componentWrapper}>
                <IssueFilter />
              </View>
            )}
            {activeTab === 'list' && (
              <View style={styles.componentWrapper}>
                <IssueTable issues={this.state.issues} />
              </View>
            )}
            {activeTab === 'add' && (
              <View style={styles.componentWrapper}>
                <IssueAdd createIssue={this.createIssue} />
              </View>
            )}
            {activeTab === 'blacklist' && (
              <View style={styles.componentWrapper}>
                <BlackList />
              </View>
            )}
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}