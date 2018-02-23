import ES from 'react-native-extended-stylesheet';

export default ES.create({
    logo: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10
    },
    icon: {
        fontSize: 100,
        color: '$logocolor',
        elevation: 9
    },
    text: {
        color: '$logocolor',
        fontSize: 18,
        fontWeight: '600',
        elevation: 9
    }
})
