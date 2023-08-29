import usePageTitle from '../../core/usePageTitle';
import SupplyList from '../features/SupplyList';

export default function SupplyListView() {
  usePageTitle('Lista de Recursos');

  return <SupplyList />;
}
