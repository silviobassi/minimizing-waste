import { useNavigate } from 'react-router-dom';
import usePageTitle from '../../core/usePageTitle';
import AccessProfileList from '../features/AccessProfileList';

export default function AccessProfileListView() {
  usePageTitle('Lista de Perfis de Acesso');
  const navigate = useNavigate();

  return <AccessProfileList />;
}
