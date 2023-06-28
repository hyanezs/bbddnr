import dayjs from 'dayjs';
import emailValidator from 'email-validator';
import { BadRequestError } from '../exceptions';
import { type Nitro, type Settings, type User } from '../types/models';

const validatePassword = (password: string): void => {
  if (!password) {
    throw new BadRequestError('password is required.');
  }

  if (password.length < 8) {
    throw new BadRequestError('password must be at least 8 characters.');
  }
};

const validateNitro = (nitro?: Nitro): void => {
  if (nitro) {
    const { animatedAvatarPath, profileBannerPath, profiles } = nitro;
    if (animatedAvatarPath && typeof animatedAvatarPath !== 'string') {
      throw new BadRequestError('animatedAvatarPath type needs to be string.');
    }

    if (profileBannerPath && typeof profileBannerPath !== 'string') {
      throw new BadRequestError('profileBannerPath type needs to be string.');
    }
  }
};

const validateSettings = (settings?: Settings): void => {
  if (settings) {
    const { privacy, security } = settings;
    if (privacy) {
      const { allowDirectMessages, shareData, allowTracking } = privacy;
      if (allowDirectMessages && typeof allowDirectMessages !== 'boolean') {
        throw new BadRequestError(
          'allowDirectMessages type needs to be boolean.',
        );
      }

      if (shareData && typeof shareData !== 'boolean') {
        throw new BadRequestError('shareData type needs to be boolean.');
      }

      if (allowTracking && typeof allowTracking !== 'boolean') {
        throw new BadRequestError('allowTracking type needs to be boolean.');
      }
    }

    if (security) {
      const { filterSpamLevel, filterImageLevel, twoFactor } = security;
      if (filterSpamLevel && typeof filterSpamLevel !== 'number') {
        throw new BadRequestError('filterSpamLevel type needs to be number.');
      }

      if (filterImageLevel && typeof filterImageLevel !== 'number') {
        throw new BadRequestError('filterImageLevel type needs to be number.');
      }

      if (twoFactor) {
        const { type, data } = twoFactor;
        if (type !== 'sms' && type !== 'email') {
          throw new BadRequestError('type type needs to be sms or email.');
        }

        if (data && typeof data !== 'string') {
          throw new BadRequestError('data type needs to be string.');
        }
      }
    }
  }
};

const validateUserAttributes = (user: User): void => {
  const {
    firstName,
    lastName,
    username,
    birthdate,
    gender,
    email,
    password,
    friends,
    servers,
    profileImagePath,
    settings,
    nitro,
  } = user;

  if (!firstName || typeof firstName !== 'string') {
    throw new BadRequestError('firstName is required and string.');
  }

  if (!lastName || typeof lastName !== 'string') {
    throw new BadRequestError('lastName is required and string.');
  }

  if (!username || typeof username !== 'string') {
    throw new BadRequestError('username is required and string.');
  }

  if (profileImagePath && typeof profileImagePath !== 'string') {
    throw new BadRequestError('profileImagePath type needs to be string.');
  }

  if (
    Array.isArray(friends) &&
    friends.some((friend) => typeof friend !== 'string')
  ) {
    throw new BadRequestError(
      'friends needs to be an array of user ids (string).',
    );
  }

  if (
    Array.isArray(servers) &&
    servers.some((friend) => typeof friend !== 'string')
  ) {
    throw new BadRequestError(
      'servers needs to be an array of server ids (string).',
    );
  }

  if (!dayjs(birthdate).isValid()) {
    throw new BadRequestError(`birthdate: ${birthdate.toString()} is invalid.`);
  }

  if (gender !== 'male' && gender !== 'female') {
    throw new BadRequestError(
      `gender: ${
        gender as string
      } is invalid. Needs to be one of: male, female `,
    );
  }

  if (!email) {
    throw new BadRequestError('email is required.');
  }

  if (!emailValidator.validate(email)) {
    throw new BadRequestError(`email: ${email} is invalid.`);
  }

  validatePassword(password);

  validateNitro(nitro);
  validateSettings(settings);
};

export { validateUserAttributes };
