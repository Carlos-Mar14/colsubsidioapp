import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Icon, Input, Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { isEmpty } from 'lodash'

import { validateEmail } from '../../utils/helpers'
import { loginWithEmailAndPassword } from '../../utils/actions'
import Loading from '../Loading'

export default function LoginForm() {
 //Estado para mostrar u ocultar la contraseña
    const [showPassword, setShowPassword] = useState(false)
    
    //Estado para guardar la data del formulario de RegisterForm
    const [formData, setFormData] = useState(defaultFormValues())

    //Validaciones para cada campo
    const [errorEmail, setErrorEmail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    
    //Estado para la carga
    const [loading, setLoading] = useState(false)
    
    //Constante para usar la importanción de la navegación
    const navigation = useNavigation()
    
    const onChange = (e, type) => {
      setFormData({ ...formData, [type]: e.nativeEvent.text })
    }

    const doLogin = async () => {
      if (!validateData()) {
        return;
      }

      setLoading(true);
      const result = await loginWithEmailAndPassword(
        formData.email,
        formData.password
      );
      setLoading(false);

      if (!result.statusResponse) {
        setErrorEmail(result.error);
        setErrorPassword(result.error);
        return;
      }

      navigation.navigate("account");
    };

    const validateData = () => {
      setErrorEmail("");
      setErrorPassword("");
      let isValid = true;

      if (!validateEmail(formData.email)) {
        setErrorEmail("Debes de ingresar un email válido.");
        isValid = false;
      }

      if (isEmpty(formData.password)) {
        setErrorPassword("Debes de ingresar tu contraseña.");
        isValid = false;
      }

      return isValid;
    };


  return (
    <View style={styles.container}>
      <Input
                containerStyle={styles.input}
                placeholder="Ingresa tu email"
                onChange={(e) => onChange(e, "email")}
                keyboardType="email-address"
                errorMessage={errorEmail}
                defaultValue={formData.email}
            />
            <Input
                containerStyle={styles.input}
                placeholder="Ingresa tu contraseña"
                password={true}
                secureTextEntry={!showPassword}
                onChange={(e) => onChange(e, "password")}
                errorMessage={errorPassword}
                defaultValue={formData.password}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={showPassword? "eye-off-outline" : "eye-outline"}
                        IconStyle={styles.icon}
                        onPress={() => setShowPassword(!showPassword)}
                    />
                }
            />
            <Button
                title="Iniciar Sesión"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={() => doLogin()}
            />
            <Loading isVisible={loading} text="Iniciando Sesión..."/>
    </View>
  )
}


//Objetos para almacenar los datos del formulario
const defaultFormValues = () => {
  return { email: "", password: "" }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30
    },
    input: {
      width: "100%"
    },
    btnContainer:{
      marginTop: 20,
      width: "85%"
    },
    btn:{
        backgroundColor: "#0464b4",
        marginLeft: 57,
        width: "60%"
    },
    icon:{
        color: "#c1c1c1"
    }
})