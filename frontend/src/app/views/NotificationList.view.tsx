import usePageTitle from '../../core/usePageTitle';
import NotificationList from '../features/NotificationList';

export default function NotificationListView() {
  usePageTitle('Lista de Notificações');

  return <NotificationList />;
}
