import { useRouter } from 'next/router';
import React, { memo, useState } from 'react';
import NavBarDropDownMenu from '@/components/LanguageSwitcher/NavBarDropDownMenu';
import { LangDropDown } from '@/components/LanguageSwitcher/index';

const LanguageSwitcher: React.FC = () => {
    const router = useRouter();
    const { locale } = router;
    const [selected, setSelected] = useState(locale);
    return (
        <span className="my-auto pt-3.5 rtl:ml-14 mr-5">
            <LangDropDown selected={selected as string}>
                <NavBarDropDownMenu
                    selected={selected as string}
                    setSelected={setSelected}
                />
            </LangDropDown>
        </span>
    );
};
export default memo(LanguageSwitcher);
