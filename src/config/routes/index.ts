export type Action =
  // | 'Manage'
  'create' | 'read' | 'update' | 'delete' | 'status';

export type Subject = 'Auth' | 'Home' | 'Register' | 'Checklist' | 'Profile';

interface PathArg {
  id?: string | null;
  type?: string;
}

export interface Route {
  title: string;
  path?: (pathArg: PathArg | undefined) => `${string}`;
  route: string;
  action: Action;
  subject: Subject;
  fallback?: string;
  /**
   * @param {boolean} [shouldBeAuthenticated=true]
   */
  shouldBeAuthenticated?: boolean;
}

interface ItemType {
  key: string;
  Index: Route;
  Detail?: Route;
  Create?: Route;
  Update?: Route;
}

export type RouteType = Record<Subject, ItemType>;

export const Routes: RouteType = {
  Auth: {
    key: '/auth',
    Index: {
      title: 'Нэвтрэх',
      route: '/auth',
      action: 'read',
      subject: 'Auth',
      fallback: '/',
      shouldBeAuthenticated: false,
    },
  },
  Home: {
    key: '/',
    Index: {
      title: 'Events.mn',
      route: '/',
      action: 'read',
      subject: 'Home',
      fallback: '/',
      shouldBeAuthenticated: false,
    },
  },
  Register: {
    key: '/register',
    Index: {
      title: 'Бүртгүүлэх',
      route: '/register',
      action: 'create',
      subject: 'Register',
      fallback: '/',
      shouldBeAuthenticated: false,
    },
  },
  Checklist: {
    key: '/checklist',
    Index: {
      title: 'Шалгах хуудас',
      route: '/checklist',
      action: 'read',
      subject: 'Checklist',
      fallback: '/',
      shouldBeAuthenticated: true,
    },
  },
  Profile: {
    key: '/profile',
    Index: {
      title: 'Шалгах хуудас',
      route: '/profile',
      action: 'read',
      subject: 'Profile',
      fallback: '/',
      shouldBeAuthenticated: true,
    },
  },
};
