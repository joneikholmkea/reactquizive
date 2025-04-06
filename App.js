import React from "react"; // Import React
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "./app/Dashboard";
import Questions from "./app/Questions"; // Corrected path assuming Questions.js is in app/

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard">
        {/* Set header title for Dashboard */}
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{ title: 'Quiz Topics' }} // Add a title
        />
        {/* Questions screen will get its title dynamically */}
        <Stack.Screen name="Questions" component={Questions} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}