import 'package:dental_friends_app/constants/strings.dart';
import 'package:dental_friends_app/models/user.dart';
import 'package:dental_friends_app/services/dio_client.dart';
import 'package:dental_friends_app/utils/utils.dart';
import 'package:flutter/material.dart';
import 'package:flutter_login/flutter_login.dart';
import 'package:get/get.dart';

class Login extends StatelessWidget {
  Login() {
    restartSecureStorage();
  }

  @override
  Widget build(BuildContext context) {
    return FlutterLogin(
      title: nameApp,
      logo: 'assets/img/onboard-background.jpg',
      messages: LoginMessages(
          usernameHint: 'Usuario',
          passwordHint: 'Contraseña',
          confirmPasswordHint: 'Confirmar',
          loginButton: 'Iniciar sesíon',
          signupButton: 'Registrate',
          forgotPasswordButton: 'Olvidaste tu contraseña?',
          confirmPasswordError: 'Not match!',
          recoverPasswordDescription:
              'Enviaremos un correo para recuperar tu cuenta',
          recoverPasswordIntro: 'Escriba su correo electronico',
          goBackButton: 'Atras',
          recoverPasswordButton: 'Enviar',
          flushbarTitleError: 'Error'),
      onLogin: (_) => validateLogin(_.name, _.password),
      onSignup: (_) => registerUser(_.name, _.password),
      onSubmitAnimationCompleted: () {
        Navigator.of(context).pushReplacement(MaterialPageRoute(
          builder: (context) => Login(),
        ));
      },
      onRecoverPassword: (_) => Future(null),
      emailValidator: (value) {
        return null;
      },
    );
  }

  Future<String> validateLogin(String name, String password) async {
    Map<String, dynamic> response = await DioClient()
        .postJsonRequest('/loginApp', {'username': name, 'password': password});
    if (response != null) {
      User user = User.fromJson(response);
      saveSecureStorage('id', user.id);
      saveSecureStorage('token', user.token);
      Get.toNamed("/home");
      return null;
    }
    return 'Verifique sus credenciales';
  }

  Future<String> registerUser(String name, String password) async {
    Map<String, dynamic> response = await DioClient().postJsonRequest(
        '/register', {'username': name, 'email': name, 'password': password});
    if (response != null) {
      showCenterShortToast("Usuario creado exitosamente");
      return null;
    }
    return 'Intente nuevamente';
  }
}
