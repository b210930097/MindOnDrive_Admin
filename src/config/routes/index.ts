export type Action =
  // | 'Manage'
  'create' | 'read' | 'update' | 'delete' | 'status';

export type Subject = 'Auth' | 'Home' | 'Register';

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
};
