import type { FC } from 'react';
import type { MessageDescriptor } from 'react-intl';

import { FormattedMessage, useIntl } from 'react-intl';
import vi_VN from './vi-VN';
import en_US from './en-US';

export const localeConfig = {
    vi_VN,
    en_US,
};

type Id = keyof typeof en_US;

interface Props extends MessageDescriptor {
    id: Id;
}

export const LocaleFormatter: FC<Props> = ({ ...props }) => {
    const notChildProps = { ...props, children: undefined };

    return <FormattedMessage {...notChildProps} id={props.id} />;
};

export type FormatMessageProps = (descriptor: Props) => string;

export const useLocale = () => {
    const { formatMessage: _formatMessage, ...rest } = useIntl();
    const formatMessage: FormatMessageProps = _formatMessage;

    return {
        ...rest,
        formatMessage,
    };
};
