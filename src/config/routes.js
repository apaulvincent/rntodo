import Home from '../screens/Home'
import TodoList from '../screens/TodoList'
import Options from '../screens/Options'

import { StackNavigator, DrawerNavigator } from 'react-navigation'


const HomeStack = StackNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: {
                header: () => null
            }
        },
        Options: {
            screen: Options,
        }
    }, {
        headerMode: 'screen'
    }
)


export default StackNavigator(
    {
        Home: {
            screen: HomeStack,
            navigationOptions: {
                header: () => null
            }
        },
        Options: {
            screen: Options,
        },
        TodoList: {
            screen: TodoList,
            navigationOptions: ({ navigation }) => ({
                headerTitle: 'ToDo',
                headerStyle: {
                    backgroundColor: '#f4511e',
                    elevation: 0,
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            })
        }
    }, {
        initialRouteName: 'TodoList',
        model: 'modal',
    },
)

// const AppDrawerNavigator = DrawerNavigator({
//     Home: { screen: Home },
//     }, {
//         initialRouteName: 'Home',
//         drawerPosition: 'left',
//         drawerWidth: 240,
//         contentOptions: {
//             activeTintColor: 'red'
//         }
// })