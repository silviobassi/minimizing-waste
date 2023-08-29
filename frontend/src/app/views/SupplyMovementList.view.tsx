import usePageTitle from '../../core/usePageTitle';
import SupplyMovementList from '../features/SupplyMovementList';

export default function SupplyMovementListView() {
  usePageTitle('Lista de Movimento de Recursos');

  return <SupplyMovementList />;
}
