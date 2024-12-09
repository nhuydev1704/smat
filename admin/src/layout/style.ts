import styled from 'styled-components';

interface HeaderMenuItemProps {
    $active: boolean;
}

export const HeaderMenuItemStyled = styled.div<HeaderMenuItemProps>`
    color: ${(props) => (props.$active ? '#fff' : '#ccc')};
    font-weight: ${(props) => (props.$active ? 'bold' : '500')};
    font-size: 13.5px;
    font-weight: 600;

    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.2s;
    padding: 0 16px;

    &:hover {
        color: #fff;
        background-color: var(--hover-color);
    }

    &:active {
        background-color: var(--alternative-color);
    }
`;

export const HeaderMenuSidebarLogoStyled = styled.div`
    & img {
        height: 40px;
        object-fit: cover;
    }
`;
