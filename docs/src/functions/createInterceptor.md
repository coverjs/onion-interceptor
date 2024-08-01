[**onion-interceptor**](../README.md) • **Docs**

***

# 函数: createInterceptor()

> **createInterceptor**(`instance`?, `useAxios`?): [`OnionInterceptor`](../classes/OnionInterceptor.md)

创建 OnionInterceptor实例

## 参数

| 参数名 | 类型 | 默认值 | 描述 |
| :------ | :------ | :------ | :------ |
| `instance`? | [`AxiosInstanceLike`](../interfaces/AxiosInstanceLike.md)\<`RequestConfig`, `RequestResponse`\> | `undefined` | 类Axios实例 |
| `useAxios`? | `boolean` | `true` | 是否使用的 Axios 实例 |

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

[index.ts:24](https://github.com/coverjs/onion-interceptor/blob/63c6c8b676a8e435d2716a63054f57c037de5afd/packages/core/src/index.ts#L24)