[**onion-interceptor**](../README.md) • **Docs**

***

# 函数: createInterceptor()

> **createInterceptor**(`instance`?): [`OnionInterceptor`](../classes/OnionInterceptor.md)

创建 OnionInterceptor实例

## 参数

| 参数名 | 类型 | 描述 |
| :------ | :------ | :------ |
| `instance`? | `AxiosInstanceLike`\<`any`\> | 类Axios实例 |

## 返回值类型

[`OnionInterceptor`](../classes/OnionInterceptor.md)

## 示例

```typescript
import { createInterceptor } from "onion-interceptor";
import axios from "axios";
const http = axios.create({...})
createInterceptor(http).use(...)

## 查看源码

[index.ts:21](https://github.com/coverjs/onion-interceptor/blob/39df853848f88c9b20849334a641a1e2329fe982/packages/core/src/index.ts#L21)
