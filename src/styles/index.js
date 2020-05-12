import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    loadingContainer:{
        position: 'absolute',
        justifyContent:'center',
        left: '45%',
        flex:1
    },
    container: {
        paddingTop: 16,
        paddingHorizontal:16
    },
    headerButton: {
        height: 44,
        width: 44,
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    error:{
        color:'red',
        paddingTop: 8,
        paddingHorizontal: 15
    },
    loginContainer:{
        justifyContent:'center',
        alignItems:'center',
        paddingTop: 100,
    },
    logo:{
        marginBottom:20,
        width: 229,
        height: 70,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    loginForm:{
        width: '100%',
    },
    item:{
        marginLeft:16,
        marginRight:16
    },
    loginButton:{
        margin: 16,
        marginTop: 40,
        backgroundColor:'#cd9930',
        color: '#fff'
    },
    formItem:{
        marginLeft: 0,
        marginRight: 0
    },
    formLabel:{
        marginTop: 32,
        marginLeft: 4,
        color: '#cd9930',
        fontSize: 20,
        fontWeight: '600'
    },
    noData:{
        color: '#cd9930',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center'
    },
    drawerContainer:{
        flex: 1,
    },
    drawerProfile:{
        height: '20%',
        minHeight: 150,
        backgroundColor: "#d0a44c", // Status bar color
        justifyContent: 'center',
        padding: 20,
        marginTop: -30
    }
})