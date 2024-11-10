import { Flex, Space } from 'antd';
import { useOutlet } from 'react-router-dom';
import logo from '@/assets/logo.png';
import styled from 'styled-components';

const LogoStyled = styled.div`
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;

    & h2 {
        font-weight: bold;
    }
`;

export default function BlankLayout() {
    const outlet = useOutlet();

    return (
        <Flex
            justify="center"
            align="center"
            style={{
                width: '100vw',
                height: '100vh',
            }}
        >
            <Space size={140}>
                <LogoStyled>
                    <img width={250} src={logo} alt="logo" />
                    <h2>Just It Admin</h2>
                </LogoStyled>
                {outlet}
            </Space>
        </Flex>
    );
}
