<div align="center">
  <h1>@rc-component/pagination</h1>
  <p><sub><img alt="Ant Design" height="14" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" style="vertical-align: -0.125em;" /> Part of the Ant Design ecosystem.</sub></p>
  <p>📄 React pagination primitives for page navigation, size changing, quick jumping, and locale-aware controls.</p>

  <p>
    <a href="https://npmjs.org/package/@rc-component/pagination"><img alt="NPM version" src="https://img.shields.io/npm/v/@rc-component/pagination.svg?style=flat-square"></a>
    <a href="https://npmjs.org/package/@rc-component/pagination"><img alt="npm downloads" src="https://img.shields.io/npm/dm/@rc-component/pagination.svg?style=flat-square"></a>
    <a href="https://github.com/react-component/pagination/actions/workflows/react-component-ci.yml"><img alt="build status" src="https://github.com/react-component/pagination/actions/workflows/react-component-ci.yml/badge.svg"></a>
    <a href="https://app.codecov.io/gh/react-component/pagination"><img alt="Codecov" src="https://img.shields.io/codecov/c/github/react-component/pagination/master.svg?style=flat-square"></a>
    <a href="https://bundlephobia.com/package/@rc-component/pagination"><img alt="bundle size" src="https://badgen.net/bundlephobia/minzip/@rc-component/pagination"></a>
    <a href="https://github.com/umijs/dumi"><img alt="dumi" src="https://img.shields.io/badge/docs%20by-dumi-blue?style=flat-square"></a>
  </p>
</div>

<p align="center">English | <a href="./README.zh-CN.md">简体中文</a></p>

## Highlights

- Controlled and uncontrolled pagination state.
- Page-size changer, quick jumper, simple mode, compact item count, and custom item rendering.
- Locale packages exposed from `@rc-component/pagination/locale/*`.
- Semantic `classNames` and `styles` for item-level customization.
- TypeScript definitions for props, locale, callbacks, and state.
- Used by Ant Design as the shared pagination foundation.

## Install

```bash
npm install @rc-component/pagination
```

## Usage

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

## Examples

Run the local dumi site:

```bash
npm install
npm start
```

Then open `http://localhost:8000`.

## API

### Pagination

| Property                     | Type                                       | Default                                | Description                                     |
| ---------------------------- | ------------------------------------------ | -------------------------------------- | ----------------------------------------------- |
| align                        | `'start' \| 'center' \| 'end'`             | -                                      | Align pagination items.                         |
| className                    | `string`                                   | -                                      | Class name for the root element.                |
| classNames                   | `Partial<Record<'item', string>>`          | -                                      | Semantic class names.                           |
| current                      | `number`                                   | -                                      | Controlled current page.                        |
| defaultCurrent               | `number`                                   | `1`                                    | Initial current page.                           |
| defaultPageSize              | `number`                                   | `10`                                   | Initial page size.                              |
| disabled                     | `boolean`                                  | `false`                                | Disable pagination interactions.                |
| hideOnSinglePage             | `boolean`                                  | `false`                                | Hide when there is only one page.               |
| itemRender                   | `(page, type, element) => ReactNode`       | -                                      | Customize page, previous, next, and jump items. |
| jumpNextIcon                 | `ReactNode \| ComponentType`               | -                                      | Custom next-jump icon.                          |
| jumpPrevIcon                 | `ReactNode \| ComponentType`               | -                                      | Custom previous-jump icon.                      |
| locale                       | `PaginationLocale`                         | `zh_CN`                                | Locale text.                                    |
| nextIcon                     | `ReactNode \| ComponentType`               | -                                      | Custom next icon.                               |
| pageSize                     | `number`                                   | -                                      | Controlled page size.                           |
| pageSizeOptions              | `number[]`                                 | -                                      | Page-size options.                              |
| prefixCls                    | `string`                                   | `rc-pagination`                        | Class name prefix.                              |
| prevIcon                     | `ReactNode \| ComponentType`               | -                                      | Custom previous icon.                           |
| role                         | `React.AriaRole`                           | -                                      | WAI-ARIA role.                                  |
| selectPrefixCls              | `string`                                   | `rc-select`                            | Prefix for the size changer select.             |
| showLessItems                | `boolean`                                  | `false`                                | Show fewer page items.                          |
| showPrevNextJumpers          | `boolean`                                  | `true`                                 | Show previous and next jumpers.                 |
| showQuickJumper              | `boolean \| object`                        | `false`                                | Show quick page jumper.                         |
| showSizeChanger              | `boolean`                                  | `total > totalBoundaryShowSizeChanger` | Show page-size changer.                         |
| showTitle                    | `boolean`                                  | `true`                                 | Show title on page items.                       |
| showTotal                    | `(total, range) => ReactNode`              | -                                      | Render total text.                              |
| simple                       | `boolean \| { readOnly?: boolean }`        | `false`                                | Use simple pager.                               |
| sizeChangerRender            | `SizeChangerRender`                        | -                                      | Customize the size changer.                     |
| style                        | `React.CSSProperties`                      | -                                      | Root inline style.                              |
| styles                       | `Partial<Record<'item', CSSProperties>>`   | -                                      | Semantic styles.                                |
| total                        | `number`                                   | `0`                                    | Total item count.                               |
| totalBoundaryShowSizeChanger | `number`                                   | `50`                                   | Boundary for default `showSizeChanger`.         |
| onChange                     | `(page: number, pageSize: number) => void` | -                                      | Triggered when page or page size changes.       |
| onShowSizeChange             | `(current: number, size: number) => void`  | -                                      | Triggered when page size changes.               |

## Development

```bash
npm install
npm start
npm test
npm run tsc
npm run coverage
npm run compile
npm run build
```

The dumi site runs at `http://localhost:8000` by default.

## Release

```bash
npm run prepublishOnly
```

The release flow is handled by `@rc-component/np` through the `rc-np` command after the package build.

## License

@rc-component/pagination is released under the [MIT](./LICENSE) license.
