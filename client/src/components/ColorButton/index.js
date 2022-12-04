import React from "react";
import { Button } from "antd";
import { TwitterPicker } from "react-color";

const containerStyles = {
    width: '100%',
    display: 'block',
    position: 'relative',
}
export const ColorButton = ({ children, onChange, value }) => {
    const ref = React.useRef(null);
    const [ active, setActive ] = React.useState(false);
    const open = () => setActive(prev => !prev);
    const close = () => setActive(false) || true;
    const disableEvent = e => {
        e.preventDefault();
        e.stopPropagation();
    }
    React.useEffect(() => {
        document.addEventListener('click', close);
        return () => {
            document.removeEventListener('click', close);
        }
    });
    return(
        <div
            ref={ref}
            style={containerStyles}
            onClick={disableEvent}
        >
            <Button onClickCapture={open} style={containerStyles}>
                {children}
            </Button>
            {active && (
                <div
                    style={{
                        position: 'absolute',
                        zIndex: 100,
                        top: 40,
                        left: 15
                    }}
                >
                    <TwitterPicker
                        color={value}
                        colors={[
                            '#000000',
                            '#FFFFFF',
                            '#00ce22',
                            '#1D1AB2',
                            '#FF0000',
                            '#FF5C00',
                            '#4E10AE',
                            '#FFFF00',
                            '#ABB8C3',
                            '#38B2CE'
                        ]}
                        onChangeComplete={color => close() && onChange(color.hex)}
                    />
                </div>
            )}
        </div>
    );
}