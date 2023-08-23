import { Transfer } from 'antd';
import { TransferDirection } from 'antd/es/transfer';
import { useCallback, useEffect, useState } from 'react';
import usePermissions from '../../core/hooks/usePermissions';

import { Permission } from '../../sdk';

export default function TransferCustomer() {
  const { permissions, fetchPermissions } = usePermissions();

  const [targetKeys, setTargetKeys] = useState<string[]>([]);

  const [sourcePermissions, setSourcePermissions] = useState<
    Permission.CollectionDetailedModel[]
  >([]);

  const fetchPermissionSource = useCallback(() => {
    const tempPermissionData: any = [];
    permissions?._embedded?.permissions.map(
      (permission: Permission.DetailedModel) => {
        const data = {
          key: permission.id,
          name: permission.name,
          description: permission.description,
        };

        return tempPermissionData.push(data);
      },
    );

    setSourcePermissions(tempPermissionData);
    return sourcePermissions;
  }, []);

  const handleChange = (
    newTargetKeys: string[],
    direction: TransferDirection,
    moveKeys: string[],
  ) => {
    console.log(newTargetKeys, direction, moveKeys);
    setTargetKeys(newTargetKeys);
  };

  const renderItem = (item: Permission.DetailedModel) => {
    return <span className="custom-item">{item.name}</span>;
  };

  useEffect(() => {
    fetchPermissions();
  
  }, [fetchPermissions, fetchPermissionSource]);

  return (
    <Transfer
      dataSource={sourcePermissions}
      listStyle={{
        width: 400,
        height: 400,
      }}
      targetKeys={targetKeys}
      onChange={handleChange}
      render={renderItem}
    />
  );
}
