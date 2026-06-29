<div align="center">
  <h1>@rc-component/pagination</h1>
  <p><sub><a href="https://ant.design"><img alt="Ant Design" height="14" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" style="vertical-align: -0.125em;" /></a> Ant Design 生态的一部分。</sub></p>
  <p>📄 React 分页组件，支持页码、快速跳转、尺寸切换和本地化。</p>

  <p>
    <a href="https://npmjs.org/package/@rc-component/pagination"><img alt="NPM version" src="https://img.shields.io/npm/v/@rc-component/pagination.svg?style=flat-square"></a>
    <a href="https://npmjs.org/package/@rc-component/pagination"><img alt="npm downloads" src="https://img.shields.io/npm/dm/@rc-component/pagination.svg?style=flat-square"></a>
    <a href="https://github.com/react-component/pagination/actions/workflows/react-component-ci.yml"><img alt="build status" src="https://github.com/react-component/pagination/actions/workflows/react-component-ci.yml/badge.svg"></a>
    <a href="https://app.codecov.io/gh/react-component/pagination"><img alt="Codecov" src="https://img.shields.io/codecov/c/github/react-component/pagination/master.svg?style=flat-square"></a>
    <a href="https://bundlephobia.com/package/@rc-component/pagination"><img alt="bundle size" src="https://img.shields.io/bundlephobia/minzip/@rc-component/pagination?style=flat-square"></a>
    <a href="https://github.com/umijs/dumi"><img alt="dumi" src="https://img.shields.io/badge/docs%20by-dumi-blue?style=flat-square"></a>
  </p>
</div>

<p align="center"><a href="./README.md">English</a> | 简体中文</p>

## 特性

- 受控和非受控分页状态。
- 页面大小更改器、快速跳转、简单模式、紧凑项目计数和自定义项目渲染。
- 从 `@rc-component/pagination/locale/*` 公开的语言环境包。
- 用于项目级自定义的语义 `classNames` 和 `styles`。
- 属性、本地化、回调和状态的 TypeScript 定义。
- 被 Ant Design 用作共享的 pagination 基础能力。

## 安装

```bash
npm install @rc-component/pagination
```

## 使用

```tsx | pure
import Pagination from '@rc-component/pagination';
import '@rc-component/pagination/assets/index.css';
export default () => (
  <Pagination defaultCurrent={1} total={120} showSizeChanger showQuickJumper />
);
```

```tsx | pure
import Pagination from '@rc-component/pagination';
import enUS from '@rc-component/pagination/locale/en_US';
export default () => (
  <Pagination
    defaultCurrent={2}
    total={500}
    locale={enUS}
    showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
  />
);
```

## 示例

运行本地 dumi 站点：

```bash
npm install
npm start
```

然后打开 `http://localhost:8000`。

## API

### Pagination

| 参数                         | 类型                                       | 默认值                                 | 说明                                   |
| ---------------------------- | ------------------------------------------ | -------------------------------------- | -------------------------------------- |
| align                        | `'start' \| 'center' \| 'end'`             | -                                      | 对齐分页项目。                         |
| className                    | `string`                                   | -                                      | 根元素的 className。                   |
| classNames                   | `Partial<Record<'item', string>>`          | -                                      | 语义 className。                       |
| current                      | `number`                                   | -                                      | 控制当前页面。                         |
| defaultCurrent               | `number`                                   | `1`                                    | 初始当前页面。                         |
| defaultPageSize              | `number`                                   | `10`                                   | 初始页面大小。                         |
| disabled                     | `boolean`                                  | `false`                                | 禁用分页交互。                         |
| hideOnSinglePage             | `boolean`                                  | `false`                                | 当只有一页时隐藏。                     |
| itemRender                   | `(page, type, element) => ReactNode`       | -                                      | 自定义页面、上一个、下一个和跳转项目。 |
| jumpNextIcon                 | `ReactNode \| ComponentType`               | -                                      | 自定义下一跳图标。                     |
| jumpPrevIcon                 | `ReactNode \| ComponentType`               | -                                      | 自定义上一跳转图标。                   |
| locale                       | `PaginationLocale`                         | `zh_CN`                                | 区域设置文本。                         |
| nextIcon                     | `ReactNode \| ComponentType`               | -                                      | 自定义下一个图标。                     |
| pageSize                     | `number`                                   | -                                      | 受控的页面大小。                       |
| pageSizeOptions              | `number[]`                                 | -                                      | 页面大小选项。                         |
| prefixCls                    | `string`                                   | `rc-pagination`                        | className 前缀。                       |
| prevIcon                     | `ReactNode \| ComponentType`               | -                                      | 自定义上一个图标。                     |
| role                         | `React.AriaRole`                           | -                                      | WAI-ARIA 角色。                        |
| selectPrefixCls              | `string`                                   | `rc-select`                            | 尺寸变换器选择的前缀。                 |
| showLessItems                | `boolean`                                  | `false`                                | 显示较少的页面项目。                   |
| showPrevNextJumpers          | `boolean`                                  | `true`                                 | 显示上一个和下一个跳线。               |
| showQuickJumper              | `boolean \| object`                        | `false`                                | 显示快速跳页。                         |
| showSizeChanger              | `boolean`                                  | `total > totalBoundaryShowSizeChanger` | 显示页面大小更改器。                   |
| showTitle                    | `boolean`                                  | `true`                                 | 在页面项目上显示标题。                 |
| showTotal                    | `(total, range) => ReactNode`              | -                                      | 渲染总文本。                           |
| simple                       | `boolean \| { readOnly?: boolean }`        | `false`                                | 使用简洁分页器。                       |
| sizeChangerRender            | `SizeChangerRender`                        | -                                      | 定制尺寸变换器。                       |
| style                        | `React.CSSProperties`                      | -                                      | 根内联样式。                           |
| styles                       | `Partial<Record<'item', CSSProperties>>`   | -                                      | 语义化样式。                           |
| total                        | `number`                                   | `0`                                    | 项目总数。                             |
| totalBoundaryShowSizeChanger | `number`                                   | `50`                                   | 默认的边界 `showSizeChanger`。         |
| onChange                     | `(page: number, pageSize: number) => void` | -                                      | 当页面或页面大小更改时触发。           |
| onShowSizeChange             | `(current: number, size: number) => void`  | -                                      | 当页面大小改变时触发。                 |

## 本地开发

```bash
npm install
npm start
npm test
npm run tsc
npm run coverage
npm run compile
npm run build
```

dumi 站点默认运行在 `http://localhost:8000`。

## 发布

```bash
npm run prepublishOnly
```

包构建完成后，发布流程由 `@rc-component/np` 通过 `rc-np` 命令处理。

## 许可证

@rc-component/pagination 基于 [MIT](./LICENSE) 许可证发布。
