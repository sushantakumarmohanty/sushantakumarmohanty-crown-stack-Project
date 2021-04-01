import { createStackNavigator } from 'react-navigation-stack'
import Login from './auth/Login';
import SignUp from './auth/Signup';
import Homepage from './Homepage'

export const AppNavigator = createStackNavigator({
        Login: {
            screen: Login,
            navigationOptions: { header: null }
        },
        SignUp: {
            screen: SignUp,
            navigationOptions: { header: null }
        },
        Homepage: {
            screen: Homepage,
            navigationOptions: { header: null }
        },
    },{
        initialRouteName: 'Login',
        defaultNavigationOptions: {
          headerBackTitle: () => null,
          headerBackImage: () => null
    }
})