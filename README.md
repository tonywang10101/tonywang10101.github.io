# Tony Wang Career Counseling Landing Page

這是一個可直接部署到 GitHub Pages 的靜態網站，作為職涯諮詢預約入口。

## Local Preview

```bash
python3 -m http.server 4173
```

Then open:

```text
http://localhost:4173
```

## GitHub Pages

1. Push this repository to GitHub.
2. Go to `Settings` -> `Pages`.
3. Choose `Deploy from a branch`.
4. Select the branch and root folder.

The site uses plain HTML, CSS, and JavaScript, so no build step is required.

## Google Analytics 4

Measurement ID: `G-1XEP3DDMVF`

Custom events:

- `booking_form_click`: fires when a visitor clicks one of the Google Form booking links.
- `engagement_milestone`: fires after 30, 60, 120, and 300 seconds of visible page time.

Recommended GA4 configuration:

1. Mark `booking_form_click` as a key event.
2. Create event-scoped custom dimensions for `link_location` and `milestone_label`.
3. Create an event-scoped custom metric for `engagement_seconds`, using seconds as the unit.

`link_location` values identify the CTA placement: `navigation`, `hero`, or `final_cta`.
