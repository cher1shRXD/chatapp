import { NavigationProp, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useState } from "react";
import { Alert } from "react-native";
import { signupDataStore } from "../../store/signup/signupDataStore";
import { API_URL } from "../../constants";


const useSignup = () => {
  const signupData = signupDataStore(state=>state.signupData);
  const setSignupData = signupDataStore(state=>state.setSignupData);
  const clearSignupData = signupDataStore(state=>state.clearSignupData);
  const [loading, setLoading] = useState<boolean>(false);

  const navigation = useNavigation<NavigationProp<any>>();

  const handleSignupData = (e: string | Date, fieldName:string) => {
    setSignupData({ [fieldName]: e });
  };


  const submit = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${API_URL}/auth/signup`,
        {
          ...signupData,
          phoneNumber: "+8210" + signupData.phoneNumber.split("010")[1],
        }
      );
      if (res) {
        clearSignupData();
        Alert.alert('회원가입 성공', '서비스 이용을 위해 로그인 해주세요')
        navigation.navigate('LoginScreen');
      }
    } catch {
      Alert.alert("회원가입 실패", "나중에 다시 시도해주세요");
    }
    setLoading(false);
  };

  return {
    signupData,
    handleSignupData,
    submit,
    loading,
  };
};

export default useSignup;
