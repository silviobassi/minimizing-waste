import usePageTitle from '../../core/usePageTitle';
import WorkStationList from '../features/WorkStationList';
export default function WorkStationListView() {
  usePageTitle('Lista de Estações de Trabalho');

  return <WorkStationList />;
}
