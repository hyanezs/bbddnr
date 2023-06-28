type Nitro = {
  animatedAvatarPath: string;
  profileBannerPath: string;
  profiles: [{ server: string; override: User }];
};

type Settings = {
  privacy: {
    allowDirectMessages: boolean;
    shareData: boolean;
    allowTracking: boolean;
  };
  security: {
    filterSpamLevel: 0 | 1 | 2;
    filterImageLevel: 0 | 1 | 2;
    twoFactor?: {
      type: 'sms' | 'email';
      data: string;
    };
  };
};

type User = {
  userId: string;
  firstName: string;
  lastName: string;
  username: string;
  profileImagePath: string;
  friends: string[];
  servers: string[];
  email: string;
  password: string;
  gender: 'male' | 'female';
  birthdate: Date;
  nitro?: Nitro;
  settings?: Settings;
};

type Message = {
  id?: string;
  data: string;
  userId: string;
  timestamp: number;
  channelId: string;
  mentionedUsers: string[];
  hashtags: string[];
  mediaPaths: string[];
  isPinned: boolean;
};

export type { Message, Nitro, Settings, User };
