import{_ as s,c as i,o as a,a3 as t}from"./chunks/framework.DVC_29Cd.js";const c=JSON.parse('{"title":"","description":"","frontmatter":{"layout":"home","hero":{"name":"onion-interceptor","text":"洋葱拦截器","tagline":"通用网络请求拦截器工具","image":{"src":"/onion.svg","alt":"Coverjs Logo"},"actions":[{"theme":"brand","text":"使用指南","link":"/src/README"}]},"features":[{"icon":"🧅","title":"灵活的洋葱模型中间件","details":"洋葱拦截器采用洋葱模型设计，允许您轻松实现请求和响应的拦截处理。开发者可以定义多个中间件，它们将按照特定的顺序执行，每个中间件都能够访问和修改请求或响应对象，提供高度的可定制性。"},{"icon":"🔌","title":"强大的拦截能力","details":"不论是 Axios 还是 Fetch，洋葱拦截器都能够提供一致的拦截体验。您可以在请求发送前进行身份验证、修改请求头或参数，也可以在响应返回后处理错误、修改返回数据等，确保了网络请求的灵活性和健壮性。"},{"icon":"🛠️","title":"易于集成和扩展","details":"洋葱拦截器设计简洁，易于与现有项目集成。同时，它的扩展性允许开发者根据项目需求添加自定义的中间件，无论是日志记录、性能监控还是请求重试机制，都能够轻松实现，满足不同场景下的开发需求。"}]},"headers":[],"relativePath":"index.md","filePath":"index.md"}'),n={name:"index.md"},h=t(`<h2 id="光速上手" tabindex="-1">光速上手 <a class="header-anchor" href="#光速上手" aria-label="Permalink to &quot;光速上手&quot;">​</a></h2><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { Context, Next } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;onion-interceptor&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { createInterceptor } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;onion-interceptor&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> axios </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;axios&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> http</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> axios.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">create</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // ... some config</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">createInterceptor</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(http).</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">use</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">async</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">ctx</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Context</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">next</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Next</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;interceptor start&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, ctx);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  await</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> next</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;interceptor end&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, ctx);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> default</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> http;</span></span></code></pre></div>`,2),e=[h];function p(k,l,r,E,d,o){return a(),i("div",null,e)}const y=s(n,[["render",p]]);export{c as __pageData,y as default};