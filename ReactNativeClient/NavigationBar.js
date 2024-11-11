import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity, // for clickable links
} from 'react-native';

class NavigationBar extends Component {
    render() {
        const { activeTab, onTabPress } = this.props;

        return (
            <View style={styles.navbar}>
                <Text style={styles.navTitle}>Issue Tracker</Text>
                <View style={styles.navLinks}>
                    <TouchableOpacity
                        style={[styles.navItem, activeTab === 'filter' && styles.activeTab]}
                        onPress={() => onTabPress('filter')}
                    >
                        <Text style={styles.navText}>Issue Filter</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.navItem, activeTab === 'list' && styles.activeTab]}
                        onPress={() => onTabPress('list')}
                    >
                        <Text style={styles.navText}>Issues Table</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.navItem, activeTab === 'add' && styles.activeTab]}
                        onPress={() => onTabPress('add')}
                    >
                        <Text style={styles.navText}>Add Issue</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.navItem, activeTab === 'blacklist' && styles.activeTab]}
                        onPress={() => onTabPress('blacklist')}
                    >
                        <Text style={styles.navText}>Blacklist</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    navbar: {
        backgroundColor: '#2c3e50',
        padding: 15,
        paddingTop: 45,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
    },
    navTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    navLinks: {
        flexDirection: 'row',
    },
    navItem: {
        marginRight: 20,
    },
    navText: {
        color: '#ecf0f1',
        fontSize: 16,
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: '#fff',
    },
});

export default NavigationBar;