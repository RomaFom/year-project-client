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
import { useDebounce } from '@/hooks';
import { IKeywords } from '@/utils/keywords/keywords.types';
import styles from './AutoSuggest.module.scss';
type Props = {
    setSelected: React.Dispatch<React.SetStateAction<IKeywords>>;
    setSearchValue: React.Dispatch<React.SetStateAction<string>>;
    results: Array<IKeywords>;
    isFetching: boolean;
};
const AutoSuggest: React.FC<Props> = ({
    setSearchValue,
    setSelected,
    results,
    isFetching,
}) => {
    const [inputValue, setInputValue] = useState('');
    const [showResults, setShowResults] = useState(false);
    const debouncedValue = useDebounce(inputValue, 700);
    const ref = useRef<HTMLInputElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    const handleChange = useMemo(() => {
        let prevValue = '';
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            if (prevValue !== e.target.value) {
                prevValue = e.target.value;
                setInputValue(e.target.value);
                setShowResults(true);
            }
        };
    }, []);

    useEffect(() => {
        setSearchValue(debouncedValue || '');
    }, [debouncedValue]);

    const handleSelect = useCallback((word: IKeywords) => {
        setSelected(word);
        if (ref.current) {
            ref.current.value = word.keyword;
        }
        setShowResults(false);
    }, []);

    const showDropdown = useMemo(
        () => showResults && results?.length && inputValue,
        [showResults, results, inputValue],
    );

    useOnClickOutside(menuRef, () => setShowResults(false));

    return (
        <div className={styles.autoSuggest}>
            <div className={cn(styles.search)}>
                <span className="">
                    {isFetching ? <PuffLoader /> : <BsSearch />}
                </span>
                <input
                    className={cn(showDropdown && styles.showDropdown)}
                    onChange={handleChange}
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
                                {keyword.keyword}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(AutoSuggest);
