import React, { useState } from 'react';
import { Button, Drawer } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { Logout } from '../Logout';


export const Settings = () => {

    const [open, setOpen] = useState(false);

    const showDrawer = () => {
      setOpen(true);
    };
  
    const onClose = () => {
      setOpen(false);
    };
  
    return (
      <>
        <Button onClick={showDrawer}>
            <SettingOutlined />
        </Button>
        <Drawer title="Настройки" placement="right" onClose={onClose} open={open}>
            <Logout />
        </Drawer>
      </>
    );
}