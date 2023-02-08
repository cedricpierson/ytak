import '../styles/globals.css';
import { AuthProvider } from '../context/AuthProvider';
import { AvatarContextProvider } from '../context/AvatarContext';
import { SessionProvider } from 'next-auth/react';
import ThemeProvider from '../theme';
import { AnimatePresence, motion } from 'framer-motion';

function MyApp({ Component, pageProps: { session, ...pageProps }, router }) {
  return (
    <AuthProvider>
      <AvatarContextProvider>
        <SessionProvider session={session}>
          <ThemeProvider>
            <AnimatePresence>
              <motion.div
                key={router.route}
                initial="pageInitial"
                animate="pageAnimate"
                exit={{ opacity: 0 }}
                variants={{
                  pageInitial: {
                    opacity: 0,
                    transition: { type: 'spring' },
                  },
                  pageAnimate: {
                    opacity: 1,
                    transition: { type: 'spring', stiffness: 100, delay: 0.3 },
                  },
                }}
              >
                <Component {...pageProps} />
              </motion.div>
            </AnimatePresence>
          </ThemeProvider>
        </SessionProvider>
      </AvatarContextProvider>
    </AuthProvider>
  );
}

export default MyApp;
