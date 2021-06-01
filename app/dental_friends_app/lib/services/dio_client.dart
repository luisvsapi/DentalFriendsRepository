import 'dart:async';
import 'dart:convert';

import 'package:dental_friends_app/constants/config.dart';
import "package:dio/dio.dart";

class DioClient {
  Dio init() {
    Dio _dio = new Dio();
    _dio.interceptors.add(new ApiInterceptors());
    _dio.options.baseUrl = apiUrl;
    return _dio;
  }

  Future<Map<String, dynamic>> getJsonRequest(String method,
      {String url, String tokenValue}) async {
    try {
      Dio client = this.init();
      client.options.baseUrl = url ?? apiUrl;
      final response = await client.get(method,
          options: Options(headers: {"token": tokenValue}));
      return json.decode(response.toString());
    } on DioError catch (ex) {
      print("getJsonRequest " + ex.message);
    }
    return null;
  }

  Future<Map<String, dynamic>> postJsonRequest(String method, dynamic dataValue,
      {String url, String tokenValue}) async {
    try {
      Dio client = this.init();
      client.options.baseUrl = url ?? apiUrl;
      final response = await client.post(method,
          data: dataValue,
          options: Options(
            headers: {"token": tokenValue},
          ));
      return json.decode(response.toString());
    } on DioError catch (ex) {
      print("postJsonRequest " + ex.message);
    }
    return null;
  }
}

class ApiInterceptors extends Interceptor {}
