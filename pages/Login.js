import { View, Text } from "react-native"

import { TextInput, IconButton, Button, Stack } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useState } from "react";
import { TouchableOpacity } from "react-native-web";
import { authLogin } from "../utils/auth";


const Login = ({navigation, route}) => {
    const [hidePassword, setShowPassword] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    return (
        <Stack
        direction="column"
        style={{
            justifyContent: 'center',
            height: '100%',
            padding: '10px'
        }}
        >
            <TextInput
            label="E-mail"
            leading={props => <Icon name="account" {...props} />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
           <TextInput
            label="Senha"
            leading={props => <Icon name="lock" {...props}/>}
            secureTextEntry={hidePassword}
            onChange={(e) => setPassword(e.target.value)}
            trailing={props => (
                <IconButton
                icon={props => <Icon 
                name={hidePassword ? "eye" : "eye-off"} {...props} />} {...props}
                onPress={() => setShowPassword(!hidePassword)}
                />
              )}
              value={password}
            />
        <Button
        title="Entrar"
        onPress={
            async () => {
                if(email !== "" && password !== "") {
                    try{
                        const result = await authLogin(route.params.firebaseApp, email, password)
                        route.params.setIsLoggedIn(true)

                    }
                    catch(err) {
                        console.log(err)
                        alert('Login inválido')
                    }
                }
                else {
                    alert('Todos os campos devem ser preenchidos')
                }
            }}
        
            
        leading={(props) => <Icon name="send" {...props} />}
        style={{
            paddingTop: '10px',
            paddingBottom: '10px',
            width: '100%',
            textAlign: 'center'

        }}
        />
        <TouchableOpacity
        onPress={() => navigation.navigate('Register')}
        style={{
            paddingTop: '10px',
            paddingBottom: '10px',
            width: '100%',
            textAlign: 'center'
        }}
        >
            <Text>REGISTRAR</Text>
        </TouchableOpacity>

        </Stack>
    )
}

export default Login