[**onion-interceptor**](../README.md) • **Docs**

***

# 函数: createInterceptor()

> **createInterceptor**(`instance`?, `rewriteMethods`?): [`OnionInterceptor`](../classes/OnionInterceptor.md)

创建 OnionInterceptor实例

## 参数

| 参数名 | 类型 | 默认值 | 描述 |
| :------ | :------ | :------ | :------ |
| `instance`? | [`AxiosInstanceLike`](../interfaces/AxiosInstanceLike.md)\<`RequestConfig`, `RequestResponse`\> | `undefined` | 类Axios实例 |
| `rewriteMethods`? | `boolean` | `true` | 是否重写 GET、POST等请求方法 - 封装 fetch 时建议传 false |

## 返回值类型

[`OnionInterceptor`](../classes/OnionInterceptor.md)

## 示例

```typescript
import { createInterceptor } from "onion-interceptor";
import axios from "axios";

const http = axios.create({...})
createInterceptor(http).use(...)
```

## 查看源码

[index.ts:24](https://github.com/coverjs/onion-interceptor/blob/387df229bd70097d41558280358ae6cae4483713/packages/core/src/index.ts#L24)
