# madebydeb

Landing page for [madebydeb.art](https://madebydeb.art), hosted on GitHub Pages.

## Local preview

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## GitHub Pages

1. Push this repo to `main`
2. Repo **Settings → Pages**
3. Source: **Deploy from a branch**
4. Branch: `main` / `/ (root)` → Save

Until the custom domain is live, the site is also at
`https://daburkho.github.io/madebydeb/`.

## Point the domain

In DNS for `madebydeb.art`:

| Type  | Name | Value                | TTL |
| ----- | ---- | -------------------- | --- |
| A     | @    | `185.199.108.153`    | 600 |
| A     | @    | `185.199.109.153`    | 600 |
| A     | @    | `185.199.110.153`    | 600 |
| A     | @    | `185.199.111.153`    | 600 |
| CNAME | www  | `daburkho.github.io` | 600 |

In Pages settings, set the custom domain to `madebydeb.art` and wait for the DNS check and HTTPS certificate.
