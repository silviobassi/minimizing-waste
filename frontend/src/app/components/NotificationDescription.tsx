import { Card, Descriptions, Typography } from 'antd';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import { format } from 'date-fns';
import { Communication } from '../../sdk/@types';

interface NotificationDescriptionsProps {
  notification: Communication.Notification;
}

export default function NotificationDescription(
  props: NotificationDescriptionsProps,
) {
  const { xs } = useBreakpoint();
  return (
    <>
      {props?.notification && (
        <Card>
          <Typography.Title level={xs ? 5 : 3}>Observação:</Typography.Title>
          <Descriptions column={1} size="small">
            <Descriptions.Item label={<strong>Título</strong>}>
              <Typography.Paragraph>
                {props.notification?.title}
              </Typography.Paragraph>
            </Descriptions.Item>
            <Descriptions.Item label={<strong>Data da Notificação</strong>}>
              <Typography.Paragraph>
                {format(new Date(props.notification?.createdAt), 'dd/MM/yyyy')}
              </Typography.Paragraph>
            </Descriptions.Item>
            <Descriptions.Item label={<strong>Objetivo</strong>}>
              <Typography.Paragraph>
                {props.notification?.goal}
              </Typography.Paragraph>
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
