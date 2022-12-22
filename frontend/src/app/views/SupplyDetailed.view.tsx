import usePageTitle from '../../core/usePageTitle';
import SupplyDetailed from '../features/SupplyDetailed';



export default function SupplyDetailedView() {
  usePageTitle('Detalhes do Recurso')
  
  return <SupplyDetailed />;
}
