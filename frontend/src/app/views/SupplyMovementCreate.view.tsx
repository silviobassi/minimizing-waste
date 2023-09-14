import usePageTitle from '../../core/usePageTitle';
import SupplyMovementForm from '../features/SupplyMovementForm';

export default function SupplyMovementCreateView() {
  usePageTitle('Criação de Movimento de Recurso');

  return <SupplyMovementForm title="Criação de Movimento de Recursos" />;
}
