import Layout from '../components/Layout';
import { useParams } from 'react-router-dom';

export default function OrderDetail() {
  const { id } = useParams();
  
  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-4xl font-display">Order Detail: {id}</h1>
      </div>
    </Layout>
  );
}
