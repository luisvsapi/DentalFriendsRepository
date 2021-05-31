import 'dart:convert';

import 'package:dental_friends_app/services/dio_client.dart';
import 'package:flutter/material.dart';
import 'package:flutter_login/flutter_login.dart';
import 'package:dental_friends_app/screens/home.dart';
import 'package:dental_friends_app/constants/strings.dart';

class Login extends StatelessWidget {
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
        flushbarTitleError: 'Error'
      ),
      onLogin: (_) => sendCredentials(_),
      onSignup: (_) => Future(null),
      onSubmitAnimationCompleted: () {
        Navigator.of(context).pushReplacement(MaterialPageRoute(
          builder: (context) => Home(),
        ));
      },
      onRecoverPassword: (_) => Future(null),
      emailValidator: (value) {
        return null;
      },
    );
  }

  Future<String> sendCredentials(LoginData data) async {
    await DioClient().postJsonRequest('/loginApp', {'username': data.name, 'password': data.password});
    return '';
  }
}
