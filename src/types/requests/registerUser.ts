type RegisterUser = {
  firstName: string;
  lastName: string;
  gender: 'male' | 'female' | 'other';
  email: string;
  password: string;
  birthdate: string;
};

export default RegisterUser;
