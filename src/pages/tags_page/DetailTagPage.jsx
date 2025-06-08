import { useParams } from 'react-router-dom';

const DetailTagPage = () => {
  const { slug } = useParams();

  return (
    <div>
      {slug}
    </div>
  )
}

export default DetailTagPage;
