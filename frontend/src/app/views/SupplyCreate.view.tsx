import usePageTitle from '../../core/usePageTitle';
import SupplyForm from '../features/SupplyForm';

export default function SupplyCreateView() {
  usePageTitle('Criação de Recurso');

  return <SupplyForm title="Criação de Recurso" />;
}
