import * as React from 'react'
import { Text, StyleSheet, View, TouchableOpacity, TextInput, PermissionsAndroid, Dimensions, Image, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import ActionSheet from "react-native-actions-sheet";
import PhoneInput from "react-native-phone-number-input";
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'react-native-image-picker';
import { DEFAULT_EXTENSIONS } from '@babel/core';


const width = Dimensions.get("screen").width
const height = Dimensions.get("screen").height


export default class SignUp extends React.Component {
    constructor(props) {
        super(props)
        this.actionSheetRef = React.createRef()
        this.state = {
            photo_uri :'',
            input_user: '',
            input_mail: '',
            input_pass: "",
            input_confirm: '',
            sec: true,
            secure: true,
            co_user: "",
            co_mail: "",
            co_pass: "",
            co_confirm: "",
            phone: "",
            statedGender: "",
            number: "",
            co_number: "",

        }
    }

    change() {
        let sec = this.state.sec
        this.setState({ sec: !sec })
    }

    chan() {
        let secure = this.state.secure
        this.setState({ secure: !secure })
    }


    submit() {
        let user = this.state.input_user
        let mail = this.state.input_mail
        let pass = this.state.input_pass
        let confirm = this.state.input_confirm
        var number = this.state.number
        var error_count = 0





        //phone
        if (number.length < 11 || number.length > 11) {
            error_count++
            this.setState({ co_number: true })
        } else {

            this.setState({ co_number: false })
        }


        //mail
        if (!mail.includes("@") || !mail.includes(".")) {
            error_count++

            this.setState({ co_mail: true })
        } else {

            this.setState({ co_mail: false })
        }



        let at_index = mail.indexOf('@')
        let dot_index = mail.lastIndexOf('.')

        if (at_index + 1 == dot_index || dot_index < at_index) {
            error_count++
            this.setState({ co_mail: true })
        } else {

            this.setState({ co_mail: false })
        }

        if (mail.trim().length < 5) {
            error_count++

            this.setState({ co_mail: true })
        } else {

            this.setState({ co_mail: false })
        }





        // user name
        if (user.trim().length < 3) {

            error_count++
            this.setState({ co_user: true })
        } else {

            this.setState({ co_user: false })
        }






        //password
        if (pass.length < 6) {
            error_count++
            this.setState({ co_pass: true })
        } else {

            this.setState({ co_pass: false })
        }

        if (pass != confirm) {
            error_count++
            this.setState({ co_confirm: false })
        } else {

            this.setState({ co_confirm: true })
        }







    }

    componentDidMount() {
        this.requestCameraPermission()
    }


    //the requestCameraPermission method for ask the permissions:

    requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: "Cool photo App Camera Permission",
                    message: "Cool photo App needs access to your camera" + "so you can take awesome pictures.",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "Ok"


                });
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the camera");
            } else {
                console.log("Camera permission danied");
            }
        } catch (err) {
            console.warn(err);
        }
    };



    //function launchCamera for open camera and takeimages:

    launchCamera = () => {
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
              },
        };
        ImagePicker.launchCamera(options, (res) => {
            //   console.log('Response = ', res);

              if (res.didCancel) {
                console.log('User cancelled image picker');
             } else if (res.error) {
                  console.log('ImagePicker Error: ', res.error);
              } else if (res.customButton) {
                console.log('User tapped custom button: ', res.customButton);
                alert(res.customButton);
            } else {
                this.setState({
                      photo_data: res.assets[0],
                      photo_uri: res.assets[0].uri
                });
              }
        });

  }







    //function selectFromGallery to select image from gallery:

    selectFromGallery = () => {

        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
              },
        };
        ImagePicker.launchImageLibrary({ options, includeBase64: true }, (res) => {
            //   console.log('Response = ', res);

            if (res.didCancel) {
                    console.log('User cancelled image picker');
            } else if (res.error) {
                console.log('ImagePicker Error: ', res.error);
             } else if (res.customButton) {
                console.log('User tapped custom button: ', res.customButton);
                alert(res.customButton);
              } else {

                this.setState({
                      photo_data: res.assets[0],
                      photo_uri: res.assets[0].uri,
                    });
              }
        });

}



    render() {
        return (
            <>
                <View style={{ backgroundColor: "#303f56", width: width, height: height }}>

                    <View>

                        <Text style={{ fontSize: 35, textAlign: 'center', marginTop: 20, color: '#ffffff' }}>Login</Text>
                        <TouchableOpacity style={{ backgroundColor: '#ffffff', height: height * 0.027, width: width * 0.11, marginTop: 8, borderTopLeftRadius: 25, borderTopRightRadius: 25, marginLeft: height * 0.05 }}>
                            <Icon name={"angle-up"} size={24} style={{ textAlign: 'center', color: "#303f56" }}
                            />
                        </TouchableOpacity>


                        <View style={{ height: height * 0.79, width: width * 1, backgroundColor: "#ffffff" }}>
                            <View >
                                <TouchableOpacity style={{ backgroundColor: '#303f56', height: height * 0.027, width: width * 0.11, borderBottomEndRadius: 25, borderBottomLeftRadius: 25 }}>
                                    <Icon name={"angle-down"} size={24} style={{ textAlign: 'center', color: '#ffffff' }}
                                    />
                                </TouchableOpacity>


                                <Text style={{ fontSize: 35, fontWeight: 'bold', color: '#303f56', textAlign: 'center' }}>SignUp</Text>




                                <View
                                    style={{ height: height * 0.13, width: width * 0.3, alignSelf: 'center', borderRadius: 50, marginTop: height * 0.02 }}
                                >
                                    {this.state.photo_uri == ''?(
                                        <Image

                                        source={require("./image/noo.jpg")}
                                        style={{ height: height * 0.13, width: width * 0.3, alignSelf: 'center', borderRadius: 50 }}
                                    /> 
                                    ):(
                                       <Image
                                        source={{ uri: this.state.photo_uri }}

                                        // source={require("../image/noo.jpg")}
                                        style={{ height: height * 0.13, width: width * 0.3, alignSelf: 'center', borderRadius: 50 }}
                                    />  
                                    )}
                                   
                                    <TouchableOpacity
                                        style={{ height: height * 0.038, width: width * 0.08, borderRadius: 20, backgroundColor: '#f5f5f5', marginTop: height * -0.04 }}
                                        onPress={() => {
                                            this.actionSheetRef.current?.setModalVisible()
                                        }}
                                    >
                                        <Icon name={"pen"} style={{ color: "#5c5c5c", textAlign: 'center', marginTop: height * 0.01 }} />

                                    </TouchableOpacity>
                                </View>
                                <ActionSheet ref={this.actionSheetRef}  >

                                    <View style={{ flexDirection: "row", marginTop: height * 0.05 }}>
                                        <TouchableOpacity style={{ height: height * 0.08, width: width * 0.19, backgroundColor: "#fa7d7b", marginLeft: width * 0.22, borderRadius: 20 }}
                                            onPress={() => {
                                                this.selectFromGallery()
                                            }}
                                        >
                                            <Icon name={"images"} size={25} style={{ color: "#ffff", textAlign: 'center', marginTop: height * 0.01 }} />
                                            <Text style={{ color: "#ffff", textAlign: 'center' }}>Gallery</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={{ height: height * 0.08, width: width * 0.19, backgroundColor: "#fa7d7b", marginLeft: width * 0.2, borderRadius: 20 }}
                                            onPress={() => {
                                                this.launchCamera()
                                            }}
                                        >
                                            <Icon name={"camera"} size={25} style={{ color: "#ffff", textAlign: 'center', marginTop: height * 0.01 }} />
                                            <Text style={{ color: "#ffff", textAlign: 'center' }}>Camera</Text>
                                        </TouchableOpacity>

                                    </View>



                                </ActionSheet>


                                <TextInput style={{

                                    height: height * 0.05
                                    , width: width * 0.9,
                                    backgroundColor: '#f5f5f5',
                                    alignSelf: 'center',
                                    marginTop: 16,
                                    borderRadius: 10,
                                    padding: 10,
                                    color: "#5c5c5c",
                                    marginBottom: this.state.co_user == false ? 16 : 0,

                                    borderWidth: this.state.co_user == false ? 0 : 1,
                                    borderColor: this.state.co_user == true ? "#ff0000" : null,

                                }}
                                    placeholder={"Name :"}
                                    placeholderTextColor={"#8f8f8f"}
                                    value={this.state.input_user}
                                    onChangeText={(value) => {
                                        this.setState({ input_user: value })
                                    }}
                                />

                                {this.state.co_user == true ? <Text style={{ color: "#ff0000", fontSize: 10, marginTop: 2, marginLeft: height * 0.03 }}>Enter a valid name</Text> : null}
                            </View>

                            <View style={{ marginTop: 9 }}>

                                <PhoneInput
                                    containerStyle={{
                                        width: width * 0.9,
                                        height: height * 0.05,
                                        // borderBottomColor,
                                        alignSelf: 'center',
                                        borderRadius: 10,

                                    }}
                                    flagButtonStyle={{
                                        color: '#f5f5f5',
                                        fontSize: 10,
                                    }}
                                    codeTextStyle={{
                                        // backgroundColor: '#f0f',
                                        color: "#5c5c5c",
                                        fontSize: 10,
                                    }}
                                    textInputStyle={{
                                        fontSize: 10,
                                        color: '#f5f5f5',
                                        // backgroundColor: '#ffa23a',
                                        width: width * 0.9,
                                        height: height * 0.05,
                                    }}
                                    defaultValue={this.state.phone}
                                    defaultCode="EG"
                                    onChangeText={text => {
                                        this.setState({
                                            phone: text,
                                        });
                                    }}

                                />
                            </View>
                            <TextInput style={{
                                height: height * 0.05, width: width * 0.9, backgroundColor: '#f5f5f5', alignSelf: 'center', marginTop: 24,
                                marginBottom: this.state.co_mail == false ? 16 : 0,
                                borderWidth: this.state.co_mail == false ? 0 : 1,
                                borderColor: this.state.co_mail == true ? "#ff0000" : null,


                                borderRadius: 10, padding: 10, color: "#5c5c5c"
                            }}
                                placeholder={"Email :"}
                                placeholderTextColor={"#8f8f8f"}
                                value={this.state.input_mail}
                                onChangeText={(value) => {
                                    this.setState({ input_mail: value })
                                }}
                            />
                            {this.state.co_mail == true ? <Text style={{ color: "#ff0000", fontSize: 10, marginLeft: height * 0.03, marginTop: 2 }}>Enter a valid mail</Text> : null}


                            <View style={{
                                height: height * 0.05, width: width * 0.9, backgroundColor: '#f5f5f5', alignSelf: 'center', marginTop: 10, marginBottom: 13, borderRadius: 10, color: "#5c5c5c", flexDirection: "row", marginBottom: this.state.co_pass == false ? 16 : 0,

                            }}>

                                <TextInput style={{
                                    height: height * 0.05, width: width * 0.8, backgroundColor: '#f5f5f5', marginBottom: 13, borderRadius: 10, color: "#5c5c5c", borderWidth: this.state.co_pass == false ? 0 : 1, padding: 10,
                                    borderColor: this.state.co_pass == true ? "#ff0000" : null,

                                }}
                                    placeholder={" Password : "}
                                    placeholderTextColor={"#8f8f8f"}
                                    secureTextEntry={this.state.sec}
                                    // onChangeText={(newpass) => {
                                    //     this.setState({ pass: newpass })
                                    // }}
                                    value={this.state.input_pass}
                                    onChangeText={(value) => {
                                        this.setState({ input_pass: value })
                                    }}
                                />
                                <TouchableOpacity
                                    onPress={() => {
                                        this.change()
                                    }}>
                                    <Icon name={this.state.sec ? "eye-slash" : "eye"} size={13} style={{ marginTop: 12, color: this.state.sec ? "#8f8f8f" : "#fa7d7b", marginLeft: 8 }}
                                    />
                                </TouchableOpacity>

                            </View>
                            {this.state.co_pass == true ? <Text style={{ color: "#ff0000", fontSize: 10, marginLeft: height * 0.03, marginTop: 2 }}>At least six letters or symbols</Text> : null}


                            <View style={{
                                height: height * 0.05, width: width * 0.9, backgroundColor: '#f5f5f5', alignSelf: 'center', marginTop: 10, borderRadius: 10, color: "#5c5c5c", flexDirection: "row",
                                marginBottom: this.state.co_confirm == false ? 15 : 0,
                            }}>

                                <TextInput style={{
                                    height: height * 0.05, width: width * 0.8, backgroundColor: '#f5f5f5', marginBottom: 13, borderRadius: 10, color: "#5c5c5c", padding: 10,
                                    borderWidth: this.state.co_pass == false ? 0 : 1,
                                    borderColor: this.state.co_pass == true ? "#ff0000" : null,

                                }}
                                    placeholder={" Confirm Password : "}
                                    placeholderTextColor={"#8f8f8f"}
                                    secureTextEntry={this.state.secure}
                                    value={this.state.input_confirm}
                                    onChangeText={(value) => {
                                        this.setState({ input_confirm: value })
                                    }}
                                />
                                <TouchableOpacity
                                    onPress={() => {
                                        this.chan()
                                    }}>
                                    <Icon name={this.state.secure ? "eye-slash" : "eye"} size={13} style={{
                                        marginTop: 12, color: this.state.secure ? "#8f8f8f" : "#fa7d7b", marginLeft: 8,
                                    }}
                                    />
                                </TouchableOpacity>

                            </View>
                            {this.state.co_confirm == true ? <Text style={{ color: "#ff0000", fontSize: 10, marginLeft: height * 0.03, marginTop: 2 }}>Password doesn't match</Text> : null}


                            <TouchableOpacity style={{ height: height * 0.047, width: width * 0.2, backgroundColor: "#fa7d7b", borderRadius: 10, alignSelf: 'center', marginTop: 20 }}
                                onPress={() => {
                                    this.submit()
                                }}
                            >
                                <Icon name={"angle-right"} size={30} style={{ textAlign: 'center', color: '#ffffff', marginTop: 3 }}
                                />
                            </TouchableOpacity>



                        </View>

                    </View>

                </View>



            </>
        )
    }
}