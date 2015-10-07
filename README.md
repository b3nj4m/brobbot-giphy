## brobbot-giphy

A [brobbot](https://npmjs.org/package/brobbot) plugin for making Giphy searches.

### Configuration

#### API key

```
BROBBOT_GIPHY_API_KEY=xzy123
```

Defaults to the public beta key.

#### Media format

```
BROBBOT_GIPHY_FORMAT=mp4
```

Defaults to `'gif'`. `'mp4'`, and `'webp'` are also supported.

#### Default rating

```
BROBBOT_GIPHY_RATING=pg
```

Defaults to `'pg-13'`. Rating is always `'r'` for `giphy-unsafe` command.

### Commands

#### Search

```
brobbot giphy <search>
```

Search Giphy for `search` and return a random result.

#### Search (unsafe)

```
brobbot giphy-unsafe <search>
```

Search Giphy for `search` with any rating and return a random result.
