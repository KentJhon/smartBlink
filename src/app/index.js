import { View, Text, StyleSheet } from "react-native";
import React from "react";
import LoginText from "../Typography/LoginText";
import EmailAddressInput from "../Components/Inputs/EmailAddressInput";
import PasswordInput from "../Components/Inputs/PasswordInput";
import LoginButton from "../Components/Buttons/LoginButton";
import NoAccountPrompt from "../Typography/NoAccountPrompt";
import ForgotPassword from "../Typography/ForgotPassword";

import { auth } from "../../firebase";

const Login = () => {
  return (
    <View style={styles.container}>
      <View style={styles.panel}>
        <LoginText />
        <EmailAddressInput />
        <PasswordInput />
        <LoginButton />
        <NoAccountPrompt />
        <ForgotPassword />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
  },
  panel: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
});

export default Login;
