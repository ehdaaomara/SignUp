
import { View} from 'react-native';
import SignUp from './SignUp'
import React from 'react';

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <>
                <View>
                    < SignUp/>
                </View>


            </>
        )
    }
}







