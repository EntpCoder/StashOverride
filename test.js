/**
 * 解析 json 字符串， 失败返回 null
 * @param {*} string
 * @returns
 */
function parseJsonBody(string) {
    try {
        return JSON.parse(string)
    } catch (e) {
        console.log(`[Warn] invalid json: ${e}, json: ${string}`)
        return null
    }
}
/**
 * 解析响应脚本参数
 * @returns {string | undefined}
 */
function getScriptResponseBody() {
    let body = (typeof $response.body === 'object') ? (new TextDecoder('utf-8')).decode(new Uint8Array($response.body)) : $response.body;
    return body
}

async function main() {
    console.log(`[Url-YASO]:${$request.url}`)
    let ct = $response.headers['Content-Type']
    if (ct.includes("application/json")) {
        let body = getScriptResponseBody()
        let jsonBody = parseJsonBody(body)
        console.log(`[Response-YASO-JSON]:${JSON.stringify(jsonBody)}`)
    }
}

(async () => {
    main().then(_ => {
        $done({})
    }).catch(error => {
        console.log(`[Error]: ${error?.message || error}`)
        $done({})
    })
})();
