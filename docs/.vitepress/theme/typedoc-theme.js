import { MarkdownTheme, MarkdownRendererEvent, MarkdownPageEvent } from 'typedoc-plugin-markdown';
import fs from 'fs';

const handleNavigation = (navigation = []) => {
  // 处理导航栏
  const newNavigationData = navigation.map((item) => {
    const newItem = {
      text: item.title
    };
    if (item?.path) {
      newItem.link = `/src/${item.path}`;
    }

    if (item?.children) {
      newItem.items = handleNavigation(item?.children);
      newItem.collapsed = true;
    }

    return newItem;
  });
  return newNavigationData;
};

export function load(app) {
  app.renderer.markdownHooks.on('content.begin', (model) => {
    const nameInfo = model.page.model.signatures?.[0]?.comment?.blockTags?.find((item) => item.tag === '@name');
    const finalInfo = model.page.model.signatures?.[0]?.comment?.blockTags?.filter((item) => item.tag !== '@name');

    if (finalInfo) model.page.model.signatures[0].comment.blockTags = finalInfo;
    const name = nameInfo?.content?.[0]?.text;
    return name ? `### ${name}` : '';
  });

  app.renderer.on(MarkdownPageEvent.END, (page) => {
    page.contents = page.contents.replace('Example', '示例');
    page.contents = page.contents.replace('Name', '方法名称');
    page.contents = page.contents.replace('Signature', '方法签名');

    page.contents = page.contents.replace(/## Default/g, '## 默认值:');
    page.contents = page.contents.replace(/## Usage/g, '## 用法:');
    page.contents = page.contents.replace(/## Deprecated/g, '## 已弃用:');
  });

  app.renderer.on(MarkdownRendererEvent.BEGIN, () => {
    // 生成侧边导航栏
    app.renderer.postRenderAsyncJobs.push(async (event) => {
      const navigation = handleNavigation(event.navigation);
      fs.writeFileSync('./docs/.vitepress/navigation.json', JSON.stringify(navigation));
    });
  });

  app.renderer.defineTheme('themeExpand', MyMarkdownTheme);
}

class MyMarkdownTheme extends MarkdownTheme {
  constructor(renderer) {
    super(renderer);
  }
}
