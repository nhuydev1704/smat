import styled from 'styled-components';

export const HeaderMenuItemStyled = styled.div`
    color: #f1f1f1;
    font-size: 13.5px;
    font-weight: 600;

    display: flex;
    align-items: center;
    gap: 5px;
    transition: all 0.2s;

    &:hover {
        opacity: 0.8;
    }
`;

export const HeaderMenuSidebarLogoStyled = styled.div`
    & img {
        height: 40px;
        object-fit: cover;
    }
`;
