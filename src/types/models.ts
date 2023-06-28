/* eslint-disable @typescript-eslint/consistent-type-definitions */
import {
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
  type Model,
} from 'sequelize';

interface UserModel
  extends Model<
    InferAttributes<UserModel>,
    InferCreationAttributes<UserModel>
  > {
  id: CreationOptional<number>;
  name: string;
  email: string;
  password: string;
  gender: 'male' | 'female';
  birthdate: Date;
}

export type { UserModel };
