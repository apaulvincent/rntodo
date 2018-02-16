import ES from 'react-native-extended-stylesheet';

export default ES.create({
    todo: {
        overflow: "visible",
        flex: 1,
        borderTopWidth: 1,
        borderTopColor: "#ddd",
        paddingLeft: 20,
        paddingRight: 10,
        paddingVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    itemControls: {
        flexDirection: "row"
    },
    noteDelete: {
        padding: 10
    },
    noteEdit: {
        padding: 10
    },
    noteLapsed: {
        padding: 10,
        color: '#62be2a'
    },
    smallText: {
        fontSize: 10
    },
    largeText: {
        fontSize: 16
    },
    lastItemStyle: {
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    }
});
