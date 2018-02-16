import ES from 'react-native-extended-stylesheet';

export default ES.create({
    container: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        '@media ios': {
            paddingTop: 20,
        },
    },
    button: {
        alignSelf: 'flex-end',
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    icon: {
        width: 32,
        height: 32,
        color: '#fff',
        fontSize: 32
    },
});