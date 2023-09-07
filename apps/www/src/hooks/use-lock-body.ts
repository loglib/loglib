import * as React from "react";

// @see https://usehooks.com/useLockBodyScroll.
export function useLockBody() {
    React.useLayoutEffect((): (() => void) => {
        const originalStyle: string = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = "hidden";
        // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
        return () => (document.body.style.overflow = originalStyle);
    }, []);
}
