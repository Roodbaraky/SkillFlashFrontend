import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Button,
  View,
  ImageBackground,
} from "react-native";
import { IsError, checkField } from "@/utils/utils";
import { router } from "expo-router";
import { createUser, doesUserExist } from "@/utils/api";
import { UserContext } from "@/contexts/UserContext";
import styles from "../styling/style";

interface SignUpProps {
  setIsSignupOpen: (isLoginOpen: boolean) => void;
}

export default function Signup({ setIsSignupOpen }: SignUpProps) {
  const [usernameInput, setUsernameInput] = React.useState("");
  const [passwordInput, setPasswordInput] = React.useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = React.useState("");
  const [emailInput, setEmailInput] = React.useState("");
  const { userDetails, setUserDetails } = useContext(UserContext);
  const [isError, setIsError] = React.useState<IsError>({});

  function checkUsername(usernameInput: string) {
    return doesUserExist(usernameInput).then((response) => {
      return response;
    });
  }

  function handleSubmit() {
    if (!passwordInput && !usernameInput && !emailInput) {
      setIsError({
        ...isError,
        password: "Please enter a password",
        username: "Please enter a valid username",
        email: "Please enter a valid email",
        confirmPassword: "Please confirm your password",
      });
    } else if (!usernameInput) {
      setIsError({ ...isError, username: "Please enter a valid username" });
    } else if (!passwordInput) {
      setIsError({ ...isError, password: "Please enter a password" });
    } else if (!confirmPasswordInput) {
      setIsError({
        ...isError,
        confirmPassword: "Please confirm your password",
      });
    } else if (!emailInput) {
      setIsError({ ...isError, email: "Please enter a valid email" });
    } else {
      if (
        !isError.confirmPassword &&
        !isError.password &&
        !isError.username &&
        !isError.email
      ) {
        return createUser(usernameInput, passwordInput, emailInput)
          .then((data) => {
            return data;
          })
          .then((user) => {
            setUserDetails(user);
            router.replace("deck");
          })
          .catch((err) => {
            console.log(err);
            alert(err.message);
          });
      }
    }
  }

  return (
    <SafeAreaView testID="signup-container" style={styles.container}>
      <ImageBackground
        source={require("../assets/images/welcome-background.jpg")}
        resizeMode="cover"
        style={styles.background}
      >
        <View style={styles.formContainer}>
          <Pressable
            onPress={() => {
              setIsSignupOpen(false);
            }}
          >
            <Text style={styles.backButtonText}>Back</Text>
          </Pressable>
          <Text style={styles.title}>Sign Up</Text>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => {
              setUsernameInput(text);
              setIsError({
                ...isError,
                username: "",
              });
            }}
            onBlur={async () => {
              if (await checkUsername(usernameInput)) {
                setIsError({
                  ...isError,
                  username: "username already exists",
                });
              }
              checkField("username", setIsError, usernameInput);
            }}
            value={usernameInput}
            placeholder="username"
            id="username"
          />
          {isError.username?.length ? (
            <Text style={styles.error}>{isError.username}</Text>
          ) : (
            <></>
          )}
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => {
              setEmailInput(text);

              setIsError({ ...isError, email: "" });
            }}
            value={emailInput}
            placeholder="email"
            textContentType="emailAddress"
            onBlur={() => {
              checkField("email", setIsError, emailInput);
            }}
            id="email"
          />
          {isError.email?.length ? (
            <Text style={styles.error}>{isError.email}</Text>
          ) : (
            <></>
          )}
          <Text style={styles.label}>Password</Text>

          <TextInput
            style={styles.input}
            onChangeText={(text) => {
              setPasswordInput(text);
              setIsError({ ...isError, password: "" });
            }}
            onBlur={() => {
              checkField("password", setIsError, passwordInput);
            }}
            value={passwordInput}
            placeholder="password"
            secureTextEntry={true}
            textContentType="password"
            id="password"
          />
          {isError.password?.length ? (
            <Text style={styles.error}>{isError.password}</Text>
          ) : (
            <></>
          )}
          <Text style={styles.label}>Confirm password</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => {
              setConfirmPasswordInput(text);

              setIsError({ ...isError, confirmPassword: "" });
            }}
            onBlur={() => {
              checkField("confirmPassword", setIsError, confirmPasswordInput);
              if (
                confirmPasswordInput &&
                passwordInput !== confirmPasswordInput
              )
                setIsError({
                  ...isError,
                  confirmPassword: "passwords do not match",
                });
            }}
            value={confirmPasswordInput}
            placeholder="confirm your password"
            secureTextEntry={true}
            textContentType="password"
            id="confirmPassword"
          />
          {isError.confirmPassword?.length ? (
            <Text style={styles.error}>{isError.confirmPassword}</Text>
          ) : (
            <></>
          )}

          <Pressable onPress={handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
