import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../context/theme/themeContext';
import { ThemedText } from '../../theme';
import * as S from './style'
import { signupDataStore } from '../../../store/signup/signupDataStore';


const Intro = () => {;
  const { theme } = useTheme();

  const navigation = useNavigation<NavigationProp<any>>();

  const clearSignupData = signupDataStore(state=>state.clearSignupData);

  useFocusEffect(()=>{
    clearSignupData();
  })

  return (
    <S.Container>
      <S.LogoImg
        source={
          theme.backgroundColor === "#101010"
            ? require("../../../assets/logo_white.png")
            : require("../../../assets/logo_black.png")
        }
      />
      <S.Title>L!NKUP</S.Title>
      <S.SubTitle>빛나는 소통의 갈고리</S.SubTitle>
      <S.Filler></S.Filler>
      <S.ButtonWrap>
        <S.Button
          activeOpacity={0.7}
          style={{ backgroundColor: "#1E90FF" }}
          onPress={() => {
            navigation.navigate("LoginScreen");
          }}
        >
          <S.ButtonText style={{ color: "white" }}>로그인</S.ButtonText>
        </S.Button>
        <S.Button
          activeOpacity={0.7}
          style={{ backgroundColor: theme.boxColor }}
          onPress={() => {
            navigation.navigate("EmailScreen");
          }}
        >
          <ThemedText style={{ fontSize: 17 }}>회원가입</ThemedText>
        </S.Button>
      </S.ButtonWrap>
    </S.Container>
  );
}

export default Intro