type XOR<T, U> = T | U extends object ? (T & Record<string, never>) | (U & Record<string, never>) : T | U;
interface Options {
    url: string;
    headers?: {
        [key: string]: string;
    };
    qs?: StringifyOptions;
}
type ServiceConfig = {
    [key: string]: Options;
};
interface Thenable<U> extends ResponseHandlers<U> {
    then<TResult1 = ResponseHandlers<U>, TResult2 = never>(callback: (value: ResponseInterface<U>) => TResult1 | PromiseLike<TResult1>): Promise<TResult1 | TResult2>;
}
type RequestMethodsType = <U = any>(path: string, options?: MethodConfig) => Thenable<U>;
interface RequestMethods {
    get: RequestMethodsType;
    head: RequestMethodsType;
    put: RequestMethodsType;
    delete: RequestMethodsType;
    post: RequestMethodsType;
    patch: RequestMethodsType;
    options: RequestMethodsType;
    setHeaders: (newHeaders: {
        [key: string]: string;
    }) => void;
}
type ServiceReqMethods<T extends ServiceConfig> = {
    [K in keyof T]: RequestMethods;
};
interface ResponseInterface<T> {
    data: T;
    headers: {
        [key: string]: string;
    };
    status: number;
    statusText: string;
    config: Request;
}
interface ResponseHandlers<T> {
    json: () => ResponseInterface<T>;
    text: () => ResponseInterface<string>;
    blob: () => ResponseInterface<Blob>;
    arrayBuffer: () => ResponseInterface<ArrayBuffer>;
    formData: () => ResponseInterface<FormData>;
}
interface MethodConfig extends Omit<RequestInit, "method"> {
    path?: string;
    PREFIX_URL?: string;
    qs?: {
        [name: string]: queryType | number;
    };
    json?: object;
    responseType?: string;
    auth?: boolean | {
        username: string;
        password: string;
    };
}
type queryType = string | URLSearchParams | Record<string, string> | string[][];
type StringifyOptions = {
    /**
    Strictly encode URI components with [`strict-uri-encode`](https://github.com/kevva/strict-uri-encode). It uses [`encodeURIComponent`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) if set to `false`. You probably [don't care](https://github.com/sindresorhus/query-string/issues/42) about this option.

    @default true
    */
    readonly strict?: boolean;
    /**
    [URL encode](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) the keys and values.

    @default true
    */
    readonly encode?: boolean;
    /**
    @default 'none'

    - `bracket`: Serialize arrays using bracket representation:

        ```
        import queryString from 'query-string';

        queryString.stringify({foo: [1, 2, 3]}, {arrayFormat: 'bracket'});
        //=> 'foo[]=1&foo[]=2&foo[]=3'
        ```

    - `index`: Serialize arrays using index representation:

        ```
        import queryString from 'query-string';

        queryString.stringify({foo: [1, 2, 3]}, {arrayFormat: 'index'});
        //=> 'foo[0]=1&foo[1]=2&foo[2]=3'
        ```

    - `comma`: Serialize arrays by separating elements with comma:

        ```
        import queryString from 'query-string';

        queryString.stringify({foo: [1, 2, 3]}, {arrayFormat: 'comma'});
        //=> 'foo=1,2,3'

        queryString.stringify({foo: [1, null, '']}, {arrayFormat: 'comma'});
        //=> 'foo=1,,'
        // Note that typing information for null values is lost
        // and `.parse('foo=1,,')` would return `{foo: [1, '', '']}`.
        ```

    - `separator`: Serialize arrays by separating elements with character:

        ```
        import queryString from 'query-string';

        queryString.stringify({foo: [1, 2, 3]}, {arrayFormat: 'separator', arrayFormatSeparator: '|'});
        //=> 'foo=1|2|3'
        ```

    - `bracket-separator`: Serialize arrays by explicitly post-fixing array names with brackets and separating elements with a custom character:

        ```
        import queryString from 'query-string';

        queryString.stringify({foo: []}, {arrayFormat: 'bracket-separator', arrayFormatSeparator: '|'});
        //=> 'foo[]'

        queryString.stringify({foo: ['']}, {arrayFormat: 'bracket-separator', arrayFormatSeparator: '|'});
        //=> 'foo[]='

        queryString.stringify({foo: [1]}, {arrayFormat: 'bracket-separator', arrayFormatSeparator: '|'});
        //=> 'foo[]=1'

        queryString.stringify({foo: [1, 2, 3]}, {arrayFormat: 'bracket-separator', arrayFormatSeparator: '|'});
        //=> 'foo[]=1|2|3'

        queryString.stringify({foo: [1, '', 3, null, null, 6]}, {arrayFormat: 'bracket-separator', arrayFormatSeparator: '|'});
        //=> 'foo[]=1||3|||6'

        queryString.stringify({foo: [1, '', 3, null, null, 6]}, {arrayFormat: 'bracket-separator', arrayFormatSeparator: '|', skipNull: true});
        //=> 'foo[]=1||3|6'

        queryString.stringify({foo: [1, 2, 3], bar: 'fluffy', baz: [4]}, {arrayFormat: 'bracket-separator', arrayFormatSeparator: '|'});
        //=> 'foo[]=1|2|3&bar=fluffy&baz[]=4'
        ```

    - `colon-list-separator`: Serialize arrays with parameter names that are explicitly marked with `:list`:

        ```js
        import queryString from 'query-string';

        queryString.stringify({foo: ['one', 'two']}, {arrayFormat: 'colon-list-separator'});
        //=> 'foo:list=one&foo:list=two'
        ```

    - `none`: Serialize arrays by using duplicate keys:

        ```
        import queryString from 'query-string';

        queryString.stringify({foo: [1, 2, 3]});
        //=> 'foo=1&foo=2&foo=3'
        ```
    */
    readonly arrayFormat?: "bracket" | "index" | "comma" | "separator" | "bracket-separator" | "colon-list-separator" | "none";
    /**
    The character used to separate array elements when using `{arrayFormat: 'separator'}`.

    @default ,
    */
    readonly arrayFormatSeparator?: string;
    /**
    Supports both `Function` as a custom sorting function or `false` to disable sorting.

    If omitted, keys are sorted using `Array#sort`, which means, converting them to strings and comparing strings in Unicode code point order.

    @default true

    @example
    ```
    import queryString from 'query-string';

    const order = ['c', 'a', 'b'];

    queryString.stringify({a: 1, b: 2, c: 3}, {
        sort: (itemLeft, itemRight) => order.indexOf(itemLeft) - order.indexOf(itemRight)
    });
    //=> 'c=3&a=1&b=2'
    ```

    @example
    ```
    import queryString from 'query-string';

    queryString.stringify({b: 1, c: 2, a: 3}, {sort: false});
    //=> 'b=1&c=2&a=3'
    ```
    */
    readonly sort?: ((itemLeft: string, itemRight: string) => number) | false;
    /**
    Skip keys with `null` as the value.

    Note that keys with `undefined` as the value are always skipped.

    @default false

    @example
    ```
    import queryString from 'query-string';

    queryString.stringify({a: 1, b: undefined, c: null, d: 4}, {
        skipNull: true
    });
    //=> 'a=1&d=4'

    queryString.stringify({a: undefined, b: null}, {
        skipNull: true
    });
    //=> ''
    ```
    */
    readonly skipNull?: boolean;
    /**
    Skip keys with an empty string as the value.

    @default false

    @example
    ```
    import queryString from 'query-string';

    queryString.stringify({a: 1, b: '', c: '', d: 4}, {
        skipEmptyString: true
    });
    //=> 'a=1&d=4'
    ```

    @example
    ```
    import queryString from 'query-string';

    queryString.stringify({a: '', b: ''}, {
        skipEmptyString: true
    });
    //=> ''
    ```
    */
    readonly skipEmptyString?: boolean;
};

declare const _default: {
    create: <T extends ServiceConfig>(config?: T) => XOR<ServiceReqMethods<T>, RequestMethods>;
};

export { _default as default };
