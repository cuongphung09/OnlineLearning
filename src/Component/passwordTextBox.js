import React, { useState } from 'react';
import { Item, Input, Icon, Label } from 'react-native-elements';

const PasswordTextBox = () => {
    const [icon,setIcon] = useState('eye-off')
    const [password,setPassword] = useState(true)

    function changeIcon()  {
        setIcon(icon === 'eye' ? 'eye-off' : 'eye')
        setPassword(!prevState.password)
        
    }

    
        return (
            <Item floatingLabel>
                <Icon active name={icon} />
                {/* <Label>{label}</Label> */}
                <Input secureTextEntry={password} onChangeText={(e) => setPassword(e)} />
                <Icon name={icon} onPress={() => changeIcon()} />
            </Item>
        );
    
}

export default PasswordTextBox;