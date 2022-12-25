import cn from 'classnames';
import React, {
    memo,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { BsSearch } from 'react-icons/bs';
import { useOnClickOutside } from 'usehooks-ts';
import { PuffLoader } from '@/components/Loaders';
import { ILanguageDetect } from '@/components/Search/Search';
import { useDebounce } from '@/hooks';
import { IKeywords, Language } from '@/utils/keywords/keywords.types';
import styles from './AutoSuggest.module.scss';
type Props = {
    setSelected: React.Dispatch<React.SetStateAction<IKeywords>>;
    setSearchValue: React.Dispatch<React.SetStateAction<string>>;
    lang: ILanguageDetect;
    setLang: React.Dispatch<React.SetStateAction<ILanguageDetect>>;
    results: Array<IKeywords>;
    isFetching: boolean;
};
const AutoSuggest: React.FC<Props> = ({
    setSearchValue,
    setSelected,
    lang,
    setLang,
    results,
    isFetching,
}) => {
    const [inputValue, setInputValue] = useState('');
    const [showResults, setShowResults] = useState(false);
    const debouncedValue = useDebounce(inputValue, 700);
    const ref = useRef<HTMLInputElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setInputValue(e.target.value);
            setShowResults(true);
        },
        [],
    );

    useEffect(() => {
        if (results && results.length) {
            Object.values(Language).forEach(lang => {
                if (results[0][lang].keyword?.match(inputValue)) {
                    setLang(prev => ({
                        ...prev,
                        inputLang: lang,
                    }));
                }
            });
        }
    }, [results]);

    useEffect(() => {
        setSearchValue(debouncedValue || '');
    }, [debouncedValue]);

    const handleSelect = useCallback(
        (word: IKeywords) => {
            setSelected(word);
            if (ref.current) {
                ref.current.value = word[lang.inputLang].keyword;
            }
            setShowResults(false);
            setLang(prev => ({
                ...prev,
                cardLang: lang.inputLang,
            }));
        },
        [lang],
    );

    const showDropdown = useMemo(
        () => showResults && results?.length && inputValue,
        [showResults, results, inputValue],
    );

    useOnClickOutside(menuRef, () => setShowResults(false));

    return (
        <div className={cn(styles.autoSuggest)}>
            <div className={cn(styles.search)}>
                <span className="">
                    {isFetching ? <PuffLoader /> : <BsSearch />}
                </span>
                <input
                    className={cn(
                        showDropdown && styles.showDropdown,
                        'sm:w-[500px]',
                    )}
                    onChange={handleChange}
                    placeholder={'Search for a keyword'}
                    ref={ref}
                    spellCheck={false}
                    type="text"
                />
                <div className={cn(styles.menu)}>
                    <div
                        className={cn(
                            showDropdown && results.length
                                ? 'visible'
                                : 'hidden',
                        )}
                        ref={menuRef}
                    >
                        {results?.map(keyword => (
                            <button
                                key={keyword._id}
                                onClick={() => {
                                    handleSelect(keyword);
                                }}
                                type={'button'}
                            >
                                {keyword[lang.inputLang].keyword}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(AutoSuggest);
