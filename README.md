# ProseImg adds `app.baseURL` twice with @nuxt/image

With `app.baseURL: '/base/'` and `@nuxt/image` installed, the same `src="/image.png"` renders as:

| Component | `src` |
|---|---|
| `<NuxtImg>` | `/base/_ipx/_/image.png` ✅ |
| `<ProseImg>` | `/base/_ipx/_/base/image.png` ❌ |

IPX answers `404 IPX_FILE_NOT_FOUND` for the second one, which makes `nuxt generate` fail.
This also affects Markdown images from @nuxt/content, which are rendered with `ProseImg`.

## Reproduce

```sh
pnpm install
pnpm generate
```

## Cause

`ProseImg` (`src/runtime/components/prose/Img.vue`) prefixes the base URL itself:

```js
const refinedSrc = computed(() => resolveBaseURL(props.src, useRuntimeConfig().app.baseURL))
```

and passes the result to `ImageComponent`, which is `NuxtImg` when `@nuxt/image` is installed.
NuxtImg's `ipx` provider adds `app.baseURL` again. The prefix is only needed when `ImageComponent`
is the plain `"img"` fallback (see #5916, #6006).

Versions: nuxt 4.6.2, @nuxt/ui 4.12.0, @nuxt/image 2.2.0
