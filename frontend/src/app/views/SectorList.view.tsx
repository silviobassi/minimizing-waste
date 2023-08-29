import { useNavigate } from 'react-router-dom';
import usePageTitle from '../../core/usePageTitle';
import SectorList from '../features/SectorList';

export default function SectorListView() {
  usePageTitle('Lista de Setores');
  const navigate = useNavigate();

  return <SectorList />;
}
