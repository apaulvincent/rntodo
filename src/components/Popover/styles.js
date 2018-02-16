import ES from 'react-native-extended-stylesheet';

export default ES.create({
    container: {
        position: "absolute",
        zIndex: 10,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ddd",
        elevation: 6
    },
    close: {
        position: "absolute",
        zIndex: 1,
        right: 12,
        top: 12,
        width: 42,
        height: 42,
        alignItems: "center",
        justifyContent: "center",
        elevation: 4
    },
    modalHead: {
        flexDirection: "row",
        flex: 1
    },
    modalBanner: {
        flex: 1,
        resizeMode: "cover",
        width: null,
        height: null,
    },
    modalBody: {
        height: 120,
        paddingHorizontal: 20,
        paddingVertical: 20,
    }
});
