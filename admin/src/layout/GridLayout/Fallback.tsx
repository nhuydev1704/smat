import { Spin } from 'antd';
import styled from 'styled-components';

const Wrapper = styled.div`
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const Fallback = () => {
    return (
        <Wrapper>
            <Spin delay={100} />
        </Wrapper>
    );
};

export default Fallback;
