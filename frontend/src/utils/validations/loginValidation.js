/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */

import * as yup from 'yup';

const loginValidation = yup.object().shape({
  username: yup
    .string()
    .required('Поле Логин не пустое')
    .min(2, 'Поле Логин не короче 2 символов')
    .max(40, 'Поле Логин не длиннее 25 символов')
    .test('username', 'Введите правильный логин', (value) => {
      // Check if it is login
      const isLogin = /^[a-zA-Z0-9_./+-]+$/.test(value);
      if (!isLogin) {
        return false;
      }
      return true;
    }),
  password: yup
    .string()
    .required('Поле Пароль не пустое')
    .min(8, 'Пароль не короче 8 символов')
    .max(40, 'Пароль не длиннее 40 символов')
    .test(
      'special-characters',
      'Пароль содержит хотя бы 1 спецсимвол',
      function (value) {
        const pattern = /^(?=.*[^a-zA-Z0-9])[\w\W]+$/;
        return pattern.test(value);
      },
    )
    .test('not-all-digits', 'Пароль не состоит из цифр', function (value) {
      return !/^\d+$/.test(value);
    }),
});

export default loginValidation;
