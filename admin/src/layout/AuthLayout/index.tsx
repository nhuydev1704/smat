import logo from '@/assets/logo.png';
import { Flex } from 'antd';
import { useOutlet } from 'react-router-dom';
import styled from 'styled-components';

const LogoStyled = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: end;
    padding-right: 70px;

    .logo {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
    }

    & h2 {
        font-weight: bold;
    }
`;

export default function AuthLayout() {
    const outlet = useOutlet();

    return (
        <Flex
            justify="center"
            align="center"
            style={{
                width: '100vw',
                height: '100vh',
            }}
            gap={30}
        >
            <LogoStyled>
                <div className="logo">
                    <img width={250} src={logo} alt="logo" />
                    <h2>Just It Admin</h2>
                </div>
            </LogoStyled>
            <Flex flex={1}>{outlet}</Flex>
        </Flex>
    );
}
