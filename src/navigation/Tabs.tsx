import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomTabNavigationParam} from './types';
import HomeStackNavigator from './HomeStack';
import Portfolio from '../screens/Portfolio';
import Wallet from '../screens/Wallet';
import Setting from '../screens/Setting';
import {View, Text, TouchableOpacity, Platform} from 'react-native';

import Piechart from '../../assets/icons/Piechart';
import Vector1 from '../../assets/icons/Vector1';
import Vector2 from '../../assets/icons/Vector2';
import Vector3 from '../../assets/icons/Vector3';

import Svg, {Defs, LinearGradient, Rect, Stop} from 'react-native-svg';
import { windowWidth } from '../utils/Dimension';
const Tab = createBottomTabNavigator<BottomTabNavigationParam>();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      // sceneContainerStyle={{backgroundColor: 'green'}}
      tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStackNavigator}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarBadge: '',
        }}
      />
      <Tab.Screen
        name="Portfolio"
        component={Portfolio}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Wallet"
        component={Wallet}
        options={{
          headerShadowVisible: false,
          headerTintColor: '#FFFFFF',
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Setting}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarBadge: '',
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;

const FROM_COLOR = '#FFFFFF';
const TO_COLOR = '#FFFFFF';

function MyTabBar({state, descriptors, navigation}) {
  const returnIcon = (name: string, color: string) => {
    switch (name) {
      case 'HomeStack':
        return <Vector1 color={color} />;
      case 'Portfolio':
        return <Piechart color={color} />;
      case 'Wallet':
        return <Vector2 color={color} />;
      case 'Settings':
        return <Vector3 color={color} />;
      default:
        break;
    }
  };
  return (
    <>
      <View style={{width: '100%', height:2, backgroundColor:'#F5F5F5' }}/>
      
      {/* { children } */}
      <View style={{flexDirection: 'row'}}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({name: route.name, merge: true});
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{flex: 1, paddingVertical: 10, backgroundColor: '#FFFFFF'}}>
              <View
                style={{
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: windowWidth / 4,
                  margin:10
                }}>
                  <View
                    style={{
                      width: 25,
                      height: 25,
                    }}>
                    {returnIcon(label, isFocused ? '#0052FE' : '#000000')}
                  </View>
                <Text
                  style={{
                    color: isFocused ? '#0052FE' : '#000000',
                    fontSize: 10,
                    fontWeight: '500',
                  }}>
                    {label}
                  </Text>
                </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );
}
