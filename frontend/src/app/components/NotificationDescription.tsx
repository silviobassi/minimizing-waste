import { Card, Descriptions, Typography } from 'antd';
import { format } from 'date-fns';
import { Communication } from '../../sdk/@types';

interface NotificationDescriptionsProps {
  notification: Communication.Notification;
}

export default function NotificationDescription(
  props: NotificationDescriptionsProps,
) {
  return (
    <>
      {props?.notification && (
        <Card>
          <Typography.Title level={3}>Observação:</Typography.Title>
          <Descriptions column={1} size="small">
            <Descriptions.Item label={<strong>Título</strong>}>
              {props.notification?.title}
            </Descriptions.Item>
            <Descriptions.Item label={<strong>Data da Notificação</strong>}>
              {format(new Date(props.notification?.createdAt), 'dd/MM/yyyy')}
            </Descriptions.Item>
            <Descriptions.Item label={<strong>Objetivo</strong>}>
              {props.notification?.goal}
            </Descriptions.Item>
            <Descriptions.Item label={<strong>Razão</strong>}>
              <Typography.Paragraph>
                {props.notification?.reason}
              </Typography.Paragraph>
            </Descriptions.Item>
          </Descriptions>
        </Card>
      )}
    </>
  );
}
