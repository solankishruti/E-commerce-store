import Layout from '../layouts/Main';
import Footer from '../components/footer';
import ProductsContent from '../components/products-content';
import { useRouter } from 'next/router';

const IndexPage = () => {
const router = useRouter();

  if (typeof window !== 'undefined') {
    var userToken = localStorage.getItem('userID')
    if(!userToken){
      router.push('/login')
    }
  }
  return (
    <Layout>
    <section className="products-page">
      <div className="container">
        <ProductsContent />
      </div>
    </section>
    <Footer />
  </Layout>
  )
}


export default IndexPage