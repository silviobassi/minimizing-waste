import usePageTitle from '../../core/usePageTitle';
import SupplyAllocateForm from '../features/SupplyAllocateForm';

export default function SupplyAllocateView() {
  usePageTitle('Alocação de Recursos')
  return <SupplyAllocateForm />;
}
