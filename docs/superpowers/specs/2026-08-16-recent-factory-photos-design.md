# Recent factory and equipment photos

## Approved placement

- Use the newest front roller/white material photo as the primary production-equipment image.
- Add the two wider workshop/processing images to the factory-strength page as a compact evidence gallery.
- Use the processing-line detail photo as a secondary equipment image only. Its visible machine-manufacturer contact text must not be presented as Tianrui contact information.

## Constraints

- Keep all existing company, product, telephone and WeChat copy unchanged.
- Keep the existing gray-blue visual system and responsive layout.
- Copy each supplied image into `public/images` and reference it through `withBase()` so GitHub Pages continues to serve it from `/WFB/`.
- Describe the photos factually as on-site equipment/processing views; do not infer model numbers, output, certifications or process capabilities.

## Verification

- Confirm all new images are emitted under `dist/images` and referenced with `/WFB/images/...`.
- Run `pnpm test`, `pnpm astro check`, and `pnpm build`.
