import admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: 'erdenet-divers',
      privateKey:
        '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC79aloiqxlawra\n57gjRkA7pVIBo9/b7KPHCCr9iKpaIkd4jfmGzfYxbBFpvw0z6RIuD3iz65pkXEDP\nvJUZXtT8Z0DnktVmCia7ZlouubmGpBRQB5dx0jZgHTw5z8pKQyDH6VnaU99jQ2ia\n+sGIHf/4CnAA5VOYKPXwKKODBOyr3xaf+f3bYwQswLRccxQQNxwvMxTsW0HI3RsY\n1gNM5r9TX86Ky0ZJdC1/ccsvZnIxxfkyUAbsYKw+7CQv/+y1HEplnEb9R5kPksIF\n5LGB0fbLwoNh8/3qu7iVQWx+1Ej/bD3oC0ozVV5GGjDpcdaN0zkCpaefv+ajAeXD\nVatrDYDDAgMBAAECggEABwH52yevgdjzt2L1SUxRVepsHqTXqwAA+6bRCfjEy1TO\nslr9WtbhXyGm1j3lAQFsTMBUYTupKcKpYGafM2VL7pLaydPNJMbTHRazUzYdE3gP\nJQw/Gm1kURAOl5VaMgHDZbHp0jKv8x42O7T80VpoXnMMP+f+KNhrVveJ1lm669LY\n6Is/1mZth5+Aqu/pCd/92bweKJ/A0dbhwGLD6oTFm1uP5Yd0Hi4DatmqQkT0CbU0\nzsIEGErptz9d7q2rdYmAWdS6xxbvYyHD+NxmMnRD8E7Z5EbO9GreLEFg+JHx7Yf9\nJEsM6CpdkbU40MO8gJEp2Yj9lreW/0JGhkpXCf8MUQKBgQDkPwKVAk7D+pXzTd5t\nBeVQKsuAu9xxp+m9uwVRSZyAvDjAea/Yn6UhRhzuiZkOMrPlWazyW6lKZs+kZ5to\nnMlgg3fd18h8xDiZLWZojyOgMrLM+wPfTwOPXlGNekqU1KSTpRbFSDNhxVE/INpv\nkbXs9Amj2aq/hYTgqfb6D/K1EQKBgQDS0JZmY+ziZHAGkyf+0Q4RKZsNgU2f9vHN\nxAzDE6/oWayvFhp+hHn0lpO/1qXQvnIUE14aoTyyzaVMmO3AbO02efqySZy4BXxy\n90whOx41bh+MXAI7mR9qXYDiAEFPrIwwe+gCpjq2PxM4fUN/PmnCrnE7IrWxJZFF\nf4kt4JcIkwKBgDf+tVV1IXm26j6sZdr9TUqjlRVaATTo6tEfJqjQlFKI2qttrxRH\n5i0JlGN44lG3YqbrnyA+GIQmQN6mhFvfyw+gcTG9lHP3d6MsnikcpLLSfUcIdeS8\n77SmgP9idxWYLWADaliv49sim1IPb0dbyfP90red2OPvj6/GQs8KRpLhAoGAJ57W\nNWYgVigkOcgcYzKtHyKfpnkfuqmxpkdrUpp3nAaGgt13m0GQnhxSpmJUBZhVXlqJ\nfB3Dh6NIps2zGVAfgPaJ3Eojbx5w1jaOE0zGD6qjuUBtlv/fPKFYIKGFpNC8BDy1\nTRIqxKe0GBDKx7ZWMCWS2FdcqG90Dwi6ImosWIsCgYB5IklL4N13I1uXaWHeEhmm\nFUd4cV7hITD6YXwM3wzgQoo1Gsg5MIB5XxGxNEDd8jWkcvpzJQgg4MBhY7OTpzRg\n1xv3ApvHarweRFgRnixJDYHvY+t852HBh8NZUAMrcDpOxWixxsgjhAQTGZdeoGlz\nZrJsMJVsqTK3yI89L92CDA==\n-----END PRIVATE KEY-----\n'?.replace(
          /\\n/g,
          '\n',
        ),
      clientEmail:
        'firebase-adminsdk-41elf@erdenet-divers.iam.gserviceaccount.com',
    }),
    databaseURL: 'https://erdenet-divers-default-rtdb.firebaseio.com',
  });
}

export const adminAuth = admin.auth();
export const app = admin.app();
