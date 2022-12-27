import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

type Props = {
    selected: string;
    setSelected: (val: string) => void;
};
const NavBarDropDownMenu: React.FC<Props> = ({ selected, setSelected }) => {
    const router = useRouter();
    const { pathname, query, asPath } = router;
    const { locales } = router;
    const otherLocales = locales?.filter(locale => locale !== 'default');

    return (
        <>
            <ul className={'font-bold'}>
                {otherLocales?.map(locale => (
                    <li key={locale}>
                        <Link
                            as={asPath}
                            className={cn(
                                'flex gap-x-2',
                                selected === locale ? 'text-blue-700' : '',
                            )}
                            href={{ pathname, query }}
                            locale={locale}
                            onClick={() => {
                                setSelected(locale);
                            }}
                        >
                            <Image
                                alt={locale}
                                height={20}
                                src={`/images/${locale}-flag.png`}
                                width={20}
                            />
                            <span>{locale}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
};
export default NavBarDropDownMenu;
