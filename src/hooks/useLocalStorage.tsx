import { useState, useEffect } from "react";

function getSavedValue<valueT>(key: string, initialValue: valueT) {
    const savedValue = JSON.parse(localStorage.getItem(key) as string);
    if (savedValue != null) return savedValue;
    if (initialValue instanceof Function) return initialValue();
    return initialValue;
}
export default function useLocalStorage<LocalStorageT>(
    key: string,
    initialValue: LocalStorageT
): [LocalStorageT, React.Dispatch<React.SetStateAction<LocalStorageT>>] {
    const [value, setValue] = useState(() => {
        return getSavedValue<LocalStorageT>(key, initialValue);
    });
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, initialValue]);
    return [value, setValue];
}

// ! to use it => const [name, setName] useLocalStorage ('name', 'key')
