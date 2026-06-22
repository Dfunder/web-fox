import * as yup from 'yup';

// shared rules
const emailRule = yup
  .string()
  .required('Email is required')
  .email('Must be a valid email');

const passwordRule = yup
  .string()
  .required('Password is required')
  .min(8, 'Password must be at least 8 characters');

export const registerSchema = yup.object().shape({
  email: emailRule,
  role: yup
    .string()
    .oneOf(['donor', 'creator'], 'Please select a valid role')
    .required('Role is required'),
  password: passwordRule,
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

export const loginSchema = yup.object().shape({
  email: emailRule,
  password: yup.string().required('Password is required'),
});

export const forgotPasswordSchema = yup.object().shape({
  email: emailRule,
});

export const resetPasswordSchema = yup.object().shape({
  password: passwordRule,
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  token: yup.string().required('Token is required'),
});
