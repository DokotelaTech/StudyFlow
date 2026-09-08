import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  SafeAreaView,
} from "react-native";

export default function LoginScreen({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginContainer}>
        
        <Image
          style={styles.img}
          source={{
            uri: "https://img.icons8.com/liquid-glass-color/1200/user-male-circle.jpg",
          }}
        />

        <Text style={styles.heading}>Welcome Back 👋</Text>

        <Text style={styles.subHeading}>
          Sign in to continue to StudyFlow
        </Text>

        <View style={styles.form}>
          <Text style={styles.label}>Username</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your username"
            placeholderTextColor="#9CA3AF"
          />

          <Text style={styles.label}>Password</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="#9CA3AF"
            secureTextEntry
          />

          <TouchableOpacity>
            <Text style={styles.forgotPassword}>
              Forgot password?
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnTxt}>Login</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>
            Don't have an account?
          </Text>

          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={styles.registerLink}> Sign up</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  loginContainer: {
    width: "100%",
  },

  img: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 20,
    borderRadius: 50,
  },

  heading: {
    fontWeight: "700",
    fontSize: 28,
    fontFamily: "Poppins",
    textAlign: "center",
    color: "#1F2937",
  },

  subHeading: {
    fontSize: 14,
    textAlign: "center",
    color: "#6B7280",
    marginTop: 6,
    marginBottom: 30,
  },

  form: {
    width: "100%",
  },

  label: {
    fontWeight: "600",
    fontSize: 14,
    color: "#374151",
    marginBottom: 8,
  },

  input: {
    width: "100%",
    height: 52,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: "#FFFFFF",
    marginBottom: 18,
  },

  forgotPassword: {
    textAlign: "right",
    color: "#4F46E5",
    fontWeight: "600",
    marginBottom: 24,
  },

  btn: {
    width: "100%",
    height: 54,
    backgroundColor: "#4F46E5",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  btnTxt: {
    fontWeight: "700",
    color: "#FFFFFF",
    fontSize: 16,
  },

  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },

  registerText: {
    color: "#6B7280",
  },

  registerLink: {
    color: "#4F46E5",
    fontWeight: "700",
  },
});