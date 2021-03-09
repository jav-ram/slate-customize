// @flow

type OptionsParamsType<T> = T[] | {[string]: T};
type EngineMatcherFunction<T> = string => T[];
type subObjectMatcherParamsType<T> = {
    options: OptionsParamsType<T>,
    includes?: string[]
}

export const subObjectMatcher = <T>({ options, includes }: subObjectMatcherParamsType<T>): EngineMatcherFunction<T> => {
    // $FlowIgnore
    const list: T[] = Array.isArray(options) ? options : (Object.values(options): T[]);
    const check = includes ? includes : undefined;

    return (t: string): T[] => {
        const text = t.replace("/", "");
        const matches: T[] = [];
        const substrRegex = new RegExp(text, 'i');
        for (const item of list) {
            if (item) {
                if (typeof item === 'object') {
                    if (check) {
                        for (const key of check) {
                            const value = item[key];
                            if (substrRegex.test(String(value))) {
                                matches.push(item);
                                break;
                            }
                        }
                    } else {
                        for (const key in item) {
                            const value = item[key];
                            if (substrRegex.test(String(value))) {
                                matches.push(item);
                                break;
                            }
                        }
                    }
                } else {
                    if (substrRegex.test(String(item))) {
                        matches.push(item);
                    }
                }
            }
        }
        return matches;
    }
};