import Home from '../screens/Home'
import TodoList from '../screens/TodoList'
import Options from '../screens/Options'
import Projects from '../screens/Projects'
import Interact from '../screens/Interact'

// COMPONENTS
import Slider from '../screens/Slider'

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

const ProjectsStack = StackNavigator(
    {
        Projects: {
            screen: Projects,
            navigationOptions: ({ navigation }) => ({
                headerTitle: 'Projects',
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
        headerMode: 'none'
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
        Projects: {
            screen: ProjectsStack
        },
        Interact: {
            screen: Interact,
            navigationOptions: {
                header: () => null
            }
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
        },
        Slider: {
            screen: Slider,
        }
    }, {
        initialRouteName: 'Interact',
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