import '../styles/events.css';
import 'semantic-ui-css/semantic.min.css';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps, router }) {
  const isAdminPage = router.pathname.startsWith('/admin');
  return (
      <Layout isAdminPage={isAdminPage}>
        <Component {...pageProps} />
      </Layout>
  );
}

export default MyApp;
