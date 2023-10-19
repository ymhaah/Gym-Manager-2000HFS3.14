# gym-manager-2000hfs3-14

The gym management tool simplifies gym administration with features like membership management, class scheduling, billing, payment processing, and reporting. It streamlines operations and enhances member experience.

## Overview

### The challenge

Users should be able to:

-   Adding information for a new customer and taking information such as name, phone number, and subscription type
-   Track subscription status [active - waiting - paused]
-   Delete user
-   Change between dark mode and light mode

Upcoming features:

-   edit user data
-   filter & search user data
-   Record more information such as weight, height, etc

### Screenshot

![light mode home page](/dist/home-page-light.jpeg)

![dark mode home page](/dist/home-page-dark.jpeg)

### Links

-   [Live Site URL](https://dainty-meerkat-461818.netlify.app)
-   [Notion: Notes and Resources](https://foregoing-shell-a18.notion.site/Gym-Manager-2000HFS3-14-9f1dec05014a4fc2895d8b0984179d71?pvs=4)

### Built with

-   HTML
-   CSS
-   JS
-   [Tailwindcss](https://tailwindcss.com/) - utility-first CSS framework
-   [Typescript](https://www.typescriptlang.org/) - JavaScript with types
-   [React](https://react.dev/) - JS library.
-   [Nextui](https://nextui.org/) - React UI library
-   [React-router](https://reactrouter.com/en/main) - Client side routing
-   [Vite](https://vitejs.dev/) - JS bundling tool.
-   [pnpm](https://pnpm.io/) - package manager
-   [Date-fns](https://date-fns.org/) - JS date library
-   [Sonner](https://sonner.emilkowal.ski/) - React notifications.

### What I learned

_`toISOString()` for simplified date format_

```js
new Date().toISOString().slice(0, 10);
```

_`useLocalStorage` hook with TS_

```tsx
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
```

_`usePageLoad` hook with ts_

```tsx
export default function usePageLoad() {
    const [pageLoad, setPageLoad] = useState<boolean>(false);

    useEffect(() => {
        const onPageLoad = () => {
            setPageLoad(true);
        };

        if (document.readyState == "complete") {
            onPageLoad();
        } else {
            window.addEventListener("load", onPageLoad, false);
            return () => window.removeEventListener("load", onPageLoad);
        }
    }, []);

    return pageLoad;
}
```

### Continued development

-   Typescript & Typescript with react
-   Tailwindcss
-   js date with the Date-fns library
-   React-router

## Useful resources

Check out my latest previous articles:

-   [Top 5 websites to sharpen your front-end skills.](https://dev.to/ymhaah/top-5-websites-to-sharpen-your-front-end-skills-3ao0)
-   [How To Build An Advanced Light/Dark Theme Website!](https://dev.to/ymhaah/how-to-build-an-advanced-lightdark-theme-website-gke)
-   [30-Day React Learning Journey!](https://dev.to/ymhaah/series/20473)

## Author

-   professional links:
    -   [Hefnawy Studio](https://www.instagram.com/hefnawystudio/)
    -   [Twitter/X](https://twitter.com/hafanwy)
    -   [LinkedIn](https://www.linkedin.com/in/youssef-hafnawy/)
-   Hire me:
    -   [UpWork](https://www.upwork.com/freelancers/~01acd8e5370e5646aa)
-   Blog:
    -   [Medium](https://medium.com/@ymhaah250)
    -   [Dev.to](https://dev.to/ymhaah)
