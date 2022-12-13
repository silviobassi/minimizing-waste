import usePageTitle from '../../core/usePageTitle';
import NotificationAvailableSupply from '../features/NotificationAvailableSupply';

export default function NotificationListView() {
  usePageTitle('Listas de Notificações');

  return <NotificationAvailableSupply />;
}
